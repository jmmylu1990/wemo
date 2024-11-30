export class ResponseDTO<T> {
  success: boolean;
  message: string;
  data?: T; // 泛型數據，可選

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data || null;
  }

  static success<T>(message: string, data?: T): ResponseDTO<T> {
    return new ResponseDTO<T>(true, message, data);
  }

  static error<T>(message: string, data?: T): ResponseDTO<T> {
    return new ResponseDTO<T>(false, message, data);
  }
}
