import { NextFunction, Request, Response } from "express";
import jsonschema, { Schema } from "jsonschema";

/*export const isValidQuery = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
const middleware =  => {


		next()
	}
}*/

const validate = jsonschema.validate;
export const isValidQuery = (schema: Schema) => {
  const middleware = (req: Request, _res: Response, next: NextFunction) => {
    try {
      validate(req.query, schema, { throwError: true });
      next();
    } catch (e) {
      next(e);
    }
  };
  return middleware;
};
export const isValidBody = (schema: Schema) => {
  const middleware = (req: Request, _res: Response, next: NextFunction) => {
    try {
      validate(req.body, schema, { throwError: true });
      next();
    } catch (e) {
      next(e);
    }
  };
  return middleware;
};
export const isValidNumericId = (schema: Schema) => {
  const middleware = (req: Request, _res: Response, next: NextFunction) => {
    try {
      validate(parseInt(req.params.id), schema, { throwError: true });
      next();
    } catch (e) {
      next(e);
    }
  };
  return middleware;
};
