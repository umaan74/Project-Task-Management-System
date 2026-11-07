# Team Task Management System

## Requirements

- Node.js and npm
- MongoDB connection string accessible to the backend

## Environment

Create `backend/.env` with:

```env
MONGODB_URI=<your MongoDB connection string>
JWT_SECRET_KEY=<a strong random secret>
SERVER_PORT=3000
CLIENT_URL=http://localhost:5173
```

`NODE_ENV=production` should be set for production deployments. In development,
the backend also accepts the Vite origins `http://localhost:5173` and
`http://127.0.0.1:5173`.

The frontend defaults to `http://localhost:3000/api`. To use another API URL,
create `frontend/.env` and set:

```env
VITE_API_URL=http://localhost:3000/api
```

## Start the application

Run each command in a separate terminal from the project root:

```powershell
npm --prefix backend install
npm --prefix backend run dev
```

```powershell
npm --prefix frontend install
npm --prefix frontend run dev
```

Open the frontend URL printed by Vite.

## Existing database index migration

Before using a database created by an earlier version, run:

```powershell
npm --prefix backend run migrate:project-members
```

The migration checks for duplicate `(projectId, userId)` records before
changing indexes. It removes the obsolete globally unique `userId` index and
ensures the compound unique index. It does not delete records; duplicate data
stops the migration for manual review, and orphan records are reported.
