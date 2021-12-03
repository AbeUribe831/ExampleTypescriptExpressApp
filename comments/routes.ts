import express from "express";
import { getAllComments, getSingleComment } from "./controllers";

const router = express.Router();

router.get("/", getAllComments);
router.get("/:id", getSingleComment);

export default router;
