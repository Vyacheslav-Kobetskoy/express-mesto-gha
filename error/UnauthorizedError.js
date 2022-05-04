class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
