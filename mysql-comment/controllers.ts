import { Request, Response, NextFunction } from "express";
import { InsertComment } from "./interfaces";
import {
  getAllSQLComments,
  getSingleSQLComment,
  postSingleSQLComment,
} from "./services";

export const getAllComments = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryResult = await getAllSQLComments();
    console.log(queryResult);
    return res.status(200).json(queryResult[0]);
  } catch (e) {
    return next(e);
  }
};

export const getSingleComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryResult = await getSingleSQLComment(req.params.id);
    return res.status(200).json(queryResult[0]);
  } catch (e) {
    return next(e);
  }
};

export const postSingleComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdComment = await postSingleSQLComment(
      req.body as InsertComment
    );
    if (!createdComment) throw new Error("Error creating a comment");
    return res.status(200).json({
      ...req.body,
      id: createdComment[0],
    });
  } catch (e) {
    return next(e);
  }
};
