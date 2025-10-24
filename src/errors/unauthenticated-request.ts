import CustomAPIError from './custom-api';

class UnauthenticatedError extends CustomAPIError {
  public statusCode: number;

  constructor(message: string, statusCode: number = 401) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default UnauthenticatedError;
