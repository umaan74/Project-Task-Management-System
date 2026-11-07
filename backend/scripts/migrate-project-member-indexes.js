import dns from "node:dns";
import dotenv from "dotenv";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

async function migrateProjectMemberIndexes() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in environment variables");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  try {
    const collection = mongoose.connection.collection("projectmembers");
    const duplicates = await collection.aggregate([
      {
        $group: {
          _id: { projectId: "$projectId", userId: "$userId" },
          count: { $sum: 1 },
          ids: { $push: "$_id" },
        },
      },
      { $match: { count: { $gt: 1 } } },
      { $limit: 20 },
    ]).toArray();

    if (duplicates.length) {
      throw new Error(
        `Duplicate project memberships found; no records were changed: ${JSON.stringify(duplicates)}`
      );
    }

    const [integrity] = await collection.aggregate([
      {
        $lookup: {
          from: "projects",
          localField: "projectId",
          foreignField: "_id",
          as: "project",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $match: {
          $or: [{ project: { $size: 0 } }, { user: { $size: 0 } }],
        },
      },
      {
        $facet: {
          samples: [
            { $project: { _id: 1, projectId: 1, userId: 1 } },
            { $limit: 20 },
          ],
          totals: [{ $count: "count" }],
        },
      },
    ]).toArray();
    const orphanedRecords = integrity?.samples || [];
    const orphanedRecordCount = integrity?.totals[0]?.count || 0;

    if (orphanedRecordCount) {
      console.warn(
        `Orphan project-member records found (${orphanedRecordCount}); they were not deleted. Samples: ${JSON.stringify(orphanedRecords)}`
      );
    }

    let indexes = await collection.indexes();
    const globalUserUniqueIndex = indexes.find(
      (index) =>
        index.unique &&
        Object.keys(index.key).length === 1 &&
        index.key.userId === 1
    );

    if (globalUserUniqueIndex) {
      await collection.dropIndex(globalUserUniqueIndex.name);
    }

    indexes = await collection.indexes();
    const compoundUniqueIndex = indexes.some(
      (index) =>
        index.unique &&
        Object.keys(index.key).length === 2 &&
        index.key.projectId === 1 &&
        index.key.userId === 1
    );

    if (!compoundUniqueIndex) {
      await collection.createIndex(
        { projectId: 1, userId: 1 },
        { unique: true }
      );
    }

    console.log("Project-member indexes verified.", {
      recordCount: await collection.countDocuments(),
      orphanedRecordCount,
      indexes: await collection.indexes(),
    });
  } finally {
    await mongoose.disconnect();
  }
}

migrateProjectMemberIndexes().catch((error) => {
  console.error("Project-member index migration failed:", error.message);
  process.exitCode = 1;
});
