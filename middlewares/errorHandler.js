module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = 'Ошибка по умолчанию.' } = err;

  res.status(statusCode).send({ message });
  next();
};
