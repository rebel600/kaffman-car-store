import React from "react";
import { deleteCar } from "../services";
const DeleteCar = ({ carId, onClose, onCarDeleted }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await deleteCar(id);
      onCarDeleted();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h4>Delete Car</h4>

          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </header>
        <form className="modal-form" onSubmit={(e) => handleDelete(e, carId)}>
          <p>Are you sure you want to delete this car?</p>
          <div className="form-actions-row">
            <button type="submit" className="action-btn">
              Delete
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteCar;
