import { request } from "../utils/request";

export const getAllCars = async () => {
  return request("GET", "/api/v1/getAllCars");
};

export const getCarById = async (carId) => {
  return request("GET", `/api/v1/getCarById/${carId}`);
};

export const addCar = async (carData) => {
  return request("POST", "/api/v1/addCar", carData);
};

export const updateCarById = async (carData, carId) => {
  return request("PATCH", `/api/v1/updateCarById/${carId}`, carData);
};

export const deleteCarById = async (carId) => {
  return request("DELETE", `/api/v1/deleteCarById/${carId}`);
};
