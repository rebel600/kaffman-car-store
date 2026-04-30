import React from "react";

const Car = ({ id, make, model, year, price, imageUrl, onEditOpen, handleDelete }) => {
  
  return (
    <li className="car-card">
      <div className="car-image-container">
        <img src={imageUrl} alt={`${make} ${model}`} />
        <div className="price-badge">${Math.floor(price).toLocaleString()}</div>
      </div>

      <div className="car-content">
        <h3 className="car-title">
          {make} {model}
        </h3>
        <div className="car-specs">
          <div className="spec-item">
            <span className="spec-label">Year</span>
            <span className="spec-value">{year}</span>
          </div>
          {/* Add more specs here like Fuel, Mileage etc */}
          <div className="car-actions">
            <span onClick={() => onEditOpen({ isEditing: true, carId: id })}>✏️</span>
            <span onClick={() => handleDelete(id)}>❌</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Car;
