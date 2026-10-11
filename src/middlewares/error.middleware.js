function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  console.log(statusCode);

  const message =
    statusCode >= 500
      ? `Internal server error`
      : err.message || "Request failed";

  return res.status(statusCode).json({
    message: message,
  });
}

export default errorHandler;
