import express from "express";
import { register, login } from "#controllers/index.js";
import { validate } from "#middlewares/index.js";
import { authSchema } from "#validators/index.js";

const authRouter = express.Router();

authRouter.post("/register", validate(authSchema), register);
authRouter.post("/login", validate(authSchema), login);

export default authRouter;