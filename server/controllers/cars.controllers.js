import { eq } from "drizzle-orm";
import { db } from "#db/index.js";
import { cars } from "#schemas/index.js";

const getAllCars = async (req, res) => {
  try {
    const getAllCars = await db.select().from(cars);

    if (getAllCars.length === 0) {
      return res.status(404).json({ message: "No cars found." });
    }

    res.status(200).json(getAllCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database query failed" + error.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    const getCar = await db
      .select()
      .from(cars)
      .where(eq(cars.id, Number(carId)));

    if (getCar.length === 0) {
      return res.status(400).json({ message: "Car not found." });
    }

    res.status(200).json(getCar[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database query failed: " + error.message });
  }
};

const addCar = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is missing." });
    }

    const { make, model, year, price, imageUrl } = req.body;

    if (!make || !model || !year || !price || !imageUrl) {
      return res.status(400).json({
        message: "Please provide make, model, year, price, and image URL.",
      });
    }

    const [newCar] = await db
      .insert(cars)
      .values({ make, model, year, price, imageUrl })
      .returning();

    res.status(201).json({
      message: "Car added successfully!",
      car: newCar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database query failed: " + error.message,
    });
  }
};

const updateCar = async (req, res) => {
  try {
    const carId = req.params.id;

    const { make, model, year, price, imageUrl } = req.body;
    const updateData = {};

    if (make !== undefined) updateData.make = make;
    if (model !== undefined) updateData.model = model;
    if (year !== undefined) updateData.year = year;
    if (price !== undefined) updateData.price = price;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const updatedCar = await db
      .update(cars)
      .set(updateData)
      .where(eq(cars.id, Number(carId)))
      .returning();

    if (updatedCar.length === 0) {
      return res.status(404).json({ message: "Car not found." });
    }

    res.status(200).json({
      message: "Car updated successfully!",
      car: updatedCar[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database query failed: " + error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const deletedCar = await db
      .delete(cars)
      .where(eq(cars.id, Number(carId)))
      .returning();
    if (deletedCar.length === 0) {
      return res.status(404).json({ message: "Car not found." });
    }
    res
      .status(200)
      .json({ message: "Car deleted successfully!", car: deletedCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database query failed: " + error.message });
  }
};

export { getAllCars, getCarById, addCar, updateCar, deleteCar };
