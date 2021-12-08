import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import PostsRouter from "./posts/routes";
import RedisCommentReouter from "./redis-comments/routes";
import SQLCommentRouter from "./mysql-comment/routes";
import CommentRouer from "./comments/routes";
// import PostsRouter from './routes/posts';

const app = express();

app.use(express.json());
app.use("/posts", PostsRouter);
app.use("/comments", CommentRouer);
app.use("/redis", RedisCommentReouter);
app.use("/sql-comments", SQLCommentRouter);
app.use(errorHandler);
app.use(notFound);

app.listen(3000, () => {
  console.log("listeing in on port 3000");
});
