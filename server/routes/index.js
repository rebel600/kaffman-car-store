import { eq } from "drizzle-orm";
import express from "express";
import { getAllCars, getCarById, addCar, updateCar, deleteCar } from "#controllers/index.js";

const router = express.Router();

router.get("/checkServer", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

router.get("/getAllCars", getAllCars);
router.get("/getCarById/:id", getCarById);

router.post("/addCar", addCar);

router.patch("/updateCarById/:id", updateCar);

router.delete("/deleteCarById/:id", deleteCar);

export default router;