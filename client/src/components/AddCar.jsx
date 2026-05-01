import { useState } from "react";
import { addCar } from "../services";

const AddCar = ({ onClose, onCarAdded }) => {
  const initialFormData = {
    make: "",
    model: "",
    year: "",
    price: "",
    imageUrl: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Real-time restriction for Price
    if (name === "price" && value !== "" && Number(value) < 1) {
      return; // Don't update state if price is less than 1
    }

    // Real-time restriction for Year (Allow typing, but block if they exceed 4 digits)
    if (name === "year" && value.length > 4) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    const currentYear = new Date().getFullYear();

    // 1. Basic String Validations
    if (!formData.make.trim()) newErrors.make = "Company name is required.";
    if (!formData.model.trim()) newErrors.model = "Model name is required.";
    if (!formData.imageUrl.trim())
      newErrors.imageUrl = "Image URL is required.";
    // 2. Year Validation (History: First car was 1885)
    const yearNum = Number(formData.year);
    if (!formData.year) {
      newErrors.year = "Year is required.";
    } else if (yearNum < 1885 || yearNum > currentYear) {
      newErrors.year = `Year must be between 1885 and ${currentYear}.`;
    }

    // 3. Price Validation (Prevent Negative)
    const priceNum = Number(formData.price);
    if (!formData.price) {
      newErrors.price = "Price is required.";
    } else if (priceNum < 0) {
      newErrors.price = "Price cannot be negative.";
    }

    // 4. Check if any errors
    if (Object.keys(newErrors).length === 0) {
      return true; // No errors, form is valid
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await addCar(formData);
      setFormData(initialFormData);
      onCarAdded();
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h4>Add New Car</h4>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </header>

        <form className="modal-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              placeholder="e.g. Tesla"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
            />
            {error && <p className="error-message">{error?.make}</p>}
          </div>
          <div className="form-group">
            <label>Model Name</label>
            <input
              type="text"
              placeholder="e.g. Model S"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
            />
            {error && <p className="error-message">{error?.model}</p>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Year</label>
              <input
                type="number"
                placeholder="2024"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
              />
              {error && <p className="error-message">{error?.year}</p>}
            </div>
            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                placeholder="50000"
                name="price"
                min="1"
                value={formData.price}
                onChange={handleInputChange}
              />
              {error && <p className="error-message">{error?.price}</p>}
            </div>
          </div>
          <div className="form-group">
            <label>Car Image URL</label>
            <input
              type="text"
              placeholder="Paste Unsplash URL here"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />
            {error && <p className="error-message">{error?.imageUrl}</p>}
          </div>
          <button type="submit" className="action-btn">
            Save Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
