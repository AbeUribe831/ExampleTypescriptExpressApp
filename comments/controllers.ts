import { NextFunction, Request, Response } from "express";
import { getAllData, getSingleData } from "./services";

interface pathParams {
  id: string;
}

export const getAllComments = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await getAllData();
    return res.status(200).json({ comments });
  } catch (e) {
    return next(e);
  }
};

export const getSingleComment = async (
  req: Request<pathParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundComment = await getSingleData(req.params.id);

    if (!foundComment)
      //return next()
      throw new Error("No comment found");
    res.status(200).json({ comment: foundComment });
  } catch (e) {
    return next(e);
  }
};
