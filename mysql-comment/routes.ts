import express from "express";
import { isValidBody } from "../middleware/isValid";
import {
  getAllComments,
  getSingleComment,
  postSingleComment,
} from "./controllers";
import { postBodySchema } from "./schema";

const router = express.Router();

router.get("/", getAllComments);
router.get("/:id", getSingleComment);

router.post("/", isValidBody(postBodySchema), postSingleComment);

export default router;
