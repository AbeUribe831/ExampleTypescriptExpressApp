import express from "express";
import { isValidBody } from "../middleware/isValid";
import { getValueFromKey, setValueWithKey } from "./controllers";
import { postBodySchema } from "./schema";

const router = express.Router();
router.get("/:key", getValueFromKey);

router.post("/:key", isValidBody(postBodySchema), setValueWithKey);

export default router;
