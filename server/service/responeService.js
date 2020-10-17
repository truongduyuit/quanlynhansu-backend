export class ResponseService {
  send = (res, statusCode, response = {}) => {
    return res.status(statusCode).send({
      message: response.message,
      data: response.data ? response.data : null,
      errors: response.errors,
      timestamp: Date.now(),
    });
  }
}

export default new ResponseService()