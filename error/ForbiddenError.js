class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
