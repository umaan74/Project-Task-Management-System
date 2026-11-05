
import express from "express";

import { AuthMiddleware } from "../middleware/auth.middleware.js";

import {
  CreateOrganization,
  GetOrganizations,
  GetOrganization,
  UpdateOrganization,
  DeleteOrganization,
} from "../controllers/organization.controller.js";

const OrganRouter = express.Router();

// Create Organization
OrganRouter.post(
  "/",
  AuthMiddleware,
  CreateOrganization
);

// Get all user's Organizations
OrganRouter.get(
  "/",
  AuthMiddleware,
  GetOrganizations
);

// Get single Organization
OrganRouter.get(
  "/:organizationId",
  AuthMiddleware,
  GetOrganization
);

// Update Organization
OrganRouter.patch(
  "/:organizationId",
  AuthMiddleware,
  UpdateOrganization
);

// Delete Organization
OrganRouter.delete(
  "/:organizationId",
  AuthMiddleware,
  DeleteOrganization
);

export default OrganRouter;
