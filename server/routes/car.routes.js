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

const carsRouter = express.Router();

carsRouter.get("/", getAllCars);
carsRouter.get("/:id", auth, validate(carSchema), getCarById);
carsRouter.post("/", auth, validate(carSchema), addCar);
carsRouter.patch("/:id", auth, validate(carSchema.partial()), updateCar);
carsRouter.delete("/:id", auth, deleteCar);

export default carsRouter;
