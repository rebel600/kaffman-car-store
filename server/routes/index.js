import express from "express";
import {
  getAllCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
} from "#controllers/index.js";
import { validate } from "#middlewares/validate.js";
import { carSchema } from "#validators/car.schema.js";

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCarById);
router.post("/", validate(carSchema), addCar);
router.patch("/:id", validate(carSchema.partial()), updateCar);
router.delete("/:id", deleteCar);

export default router;
