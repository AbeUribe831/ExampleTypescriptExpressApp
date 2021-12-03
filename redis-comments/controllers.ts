import { NextFunction, Request, Response } from "express";
import { getRedisComment, setRedisComment } from "./services";

export const getValueFromKey = async (
  req: Request<{ key: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await getRedisComment(req.params.key);
    if (value !== null) {
      return res.status(200).json(value);
    }
    return res.status(400).send("redis_comment doesn't exist or has expired");
  } catch (e) {
    return next(e);
  }
};

export const setValueWithKey = async (
  req: Request<{ key: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const value: string = JSON.stringify(req.body);
    const isGoodRequest = await setRedisComment(req.params.key, value);
    if (isGoodRequest == "OK") return res.status(200).send(isGoodRequest);
    throw new Error("request could not be completed");
  } catch (e) {
    return next(e);
  }
};
