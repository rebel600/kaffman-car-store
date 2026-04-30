import express from "express";
import { cors } from "#middlewares/index.js";
import { authRouter, carsRouter } from "#routes/index.js";

const app = express();

app.use(cors);

app.use(express.json());

app.use("/api/v1/cars", carsRouter);
app.use("/api/v1/auth", authRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
