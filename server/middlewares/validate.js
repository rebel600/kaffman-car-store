export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.body = parsed; // Data sanatized
    next();
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Validation failed", error: error.message });
  }
};
