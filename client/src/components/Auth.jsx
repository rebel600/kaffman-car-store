import { useState } from "react";
import { login, register } from "../services";
import { useAuth } from "../hooks/useAuth";

const Auth = ({ onOpenAuth, onClose, setOnOpenAuth }) => {
  const { login: userLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});

  const validate = (data) => {
    let errors = {};

    if (onOpenAuth.modalType === "register") {
      if (!data.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
      }
    }

    if (!data.email) {
      errors.email = "Email is required";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    if (
      onOpenAuth.modalType === "register" &&
      data.password !== data.confirmPassword
    ) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    const errors = validate(updatedData);
    setError(errors);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (!formData.email || !formData.password) {
      return;
    }

    if (onOpenAuth.modalType === "register") {
      await register(formData.email, formData.password);
    }

    if (onOpenAuth.modalType === "login") {
      const response = await login(formData.email, formData.password);

      if (response) {
        userLogin(response.token);
      }
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {onOpenAuth.modalType === "login" && (
          <div>
            <header className="modal-header">
              <h4>Welcome Back!</h4>
              <p>Login to your account</p>
              <button className="close-btn" onClick={onClose}>
                &times;
              </button>
            </header>

            <form className="modal-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="john@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {error && <p className="error-message">{error?.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {error && <p className="error-message">{error?.password}</p>}
              </div>

              <div className="form-actions-row">
                <button
                  type="submit"
                  className="action-btn"
                  disabled={Object.keys(error).length > 0}
                >
                  Login
                </button>
                <p>Don't have an account?</p>
                <span
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setOnOpenAuth((prev) => ({
                      ...prev,
                      modalType: "register",
                    }))
                  }
                >
                  Register
                </span>
              </div>
            </form>
          </div>
        )}
        {onOpenAuth.modalType === "register" && (
          <div>
            <header className="modal-header">
              <h4>Signup!</h4>
              <p>Create your account</p>
              <button className="close-btn" onClick={onClose}>
                &times;
              </button>
            </header>

            <form className="modal-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="john@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {error && <p className="error-message">{error?.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {error && <p className="error-message">{error?.password}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  placeholder="confirm password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                {error && (
                  <p className="error-message">{error?.confirmPassword}</p>
                )}
              </div>

              <div className="form-actions-row">
                <button
                  type="submit"
                  className="action-btn"
                  disabled={Object.keys(error).length > 0}
                >
                  SignUp
                </button>
              </div>
              <div className="">
                <p>
                  Already have an account?
                  <span
                    className="cancel-btn"
                    onClick={() =>
                      setOnOpenAuth((prev) => ({
                        ...prev,
                        modalType: "login",
                      }))
                    }
                  >
                    Login
                  </span>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
