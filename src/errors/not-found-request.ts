import CustomAPIError from './custom-api';

class NotFoundRequestError extends CustomAPIError {
  public statusCode: number;

  constructor(message: string, statusCode: number = 404) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default NotFoundRequestError;
