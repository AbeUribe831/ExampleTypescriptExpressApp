import express from "express";
import { isValidBody, isValidNumericId } from "../middleware/isValid";
import {
  getAllComments,
  getSingleComment,
  postSingleComment,
} from "./controllers";
import { paramIdSchema, postBodySchema } from "./schema";

const router = express.Router();

router.get("/", getAllComments);
router.get("/:id", isValidNumericId(paramIdSchema), getSingleComment);

router.post("/", isValidBody(postBodySchema), postSingleComment);

export default router;
