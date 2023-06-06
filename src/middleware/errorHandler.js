export const errorHandler = (err, req, res, next) => {
  if (err.name === "AppError") {
    return res.status(err.status).json({
      error: err.message,
      stack: err.stack,
    });
  }

  if (err.code === "P2002")
    return res.status(400).json({
      error: err.meta.target[0],
      message: "Duplicate user",
    });

  return res.status(500).json({
    error: err.message,
  });
};
