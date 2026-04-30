import express from "express";
import {
  getAllCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
} from "#controllers/index.js";
import { validate, auth } from "#middlewares/index.js";
import { carSchema } from "#validators/index.js";
import { cardIdSchema } from "#validators/auth.schema.js";

const carsRouter = express.Router();

carsRouter.get("/", getAllCars);
carsRouter.get("/:id", auth, validate(cardIdSchema, "params"), getCarById);
carsRouter.post("/", auth, validate(carSchema), addCar);
  carsRouter.patch("/:id", auth, validate(cardIdSchema, "params"), validate(carSchema.partial(), "body"), updateCar);
carsRouter.delete("/:id", auth, validate(cardIdSchema, "params"), deleteCar);

export default carsRouter;
