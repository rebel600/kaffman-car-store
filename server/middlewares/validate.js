export const validate = (schema, source = "body") => (req, res, next) => {
  try {
    const data = req[source];
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        error: `${source} is missing or empty`,
      });
    }

    const parsed = schema.parse(data);
    req.validatedData = parsed;
    
    next();
  } catch (err) {
    return res.status(400).json({
      error: err.errors || err.message,
    });
  }
};