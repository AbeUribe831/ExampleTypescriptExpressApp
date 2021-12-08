import express from "express";
import { isValidQuery } from "../middleware/isValid";
import { getAllPosts, getSinglePost } from "./controllers";
import { postQuerySchema } from "./schema";

//import { getAllPosts, getSinglePost } from "../controllers/posts";

const router = express.Router();
router.get("/", getAllPosts);

router.get("/:id", isValidQuery(postQuerySchema), getSinglePost);

export default router;
