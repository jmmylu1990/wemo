export class ResponseDTO {
  success: boolean;
  message: string;
  scooterId: number;

  constructor(success: boolean, message: string, scooterId: number) {
    this.success = success;
    this.message = message;
    this.scooterId = scooterId;
  }
}
