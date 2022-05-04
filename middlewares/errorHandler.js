module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = 'Ошибка по умолчанию.' } = err;
  if (message === 'Validation failed') {
    return res.status(400).send({
      message: 'Ошибка валидации',
    });
  }
  if (statusCode) {
    return res.status(statusCode).send({ message });
  }
  return next();
};
