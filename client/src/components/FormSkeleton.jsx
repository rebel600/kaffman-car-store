import React from "react";

const FormSkeleton = () => {
  return (
    <div className="modal-form skeleton-form">
      <div className="skeleton-group">
        <div className="shimmer sk-label"></div>
        <div className="shimmer sk-input"></div>
      </div>
      <div className="skeleton-group">
        <div className="shimmer sk-label"></div>
        <div className="shimmer sk-input"></div>
      </div>
      <div className="form-row">
        <div className="shimmer sk-input"></div>
        <div className="shimmer sk-input"></div>
      </div>
      <div className="shimmer sk-button"></div>
    </div>
  );
};

export default FormSkeleton;
