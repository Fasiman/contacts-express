export function errorHandler(err, req, res, next) {
  console.error(err.message);

  const status = err.status || 500;
  const message = err.message || "server eror";

  res.status(status).json({
    error: message,
    status: status,
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({
    error: "route not found",
    status: 404,
  });
}


