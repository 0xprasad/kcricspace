export class AppError extends Error {
  constructor(message, statusCode = 500, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const assertFound = (value, message = 'Resource not found') => {
  if (!value) throw new AppError(message, 404);
  return value;
};
