class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
