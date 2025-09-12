import CustomAPIError from './custom-api';

class BadRequestError extends CustomAPIError {
  public statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default BadRequestError;
