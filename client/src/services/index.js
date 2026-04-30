import { request } from "../utils/request";

export const getCars = async () => {
  return request("GET", "/api/v1/cars");
};

export const getCar = async (carId) => {
  return request("GET", `/api/v1/cars/${carId}`);
};

export const addCar = async (carData) => {
  return request("POST", "/api/v1/cars", carData);
};

export const updateCar = async (carId, carData) => {
  return request("PATCH", `/api/v1/cars/${carId}`, carData);
};

export const deleteCar = async (carId) => {
  return request("DELETE", `/api/v1/cars/${carId}`);
};
