export class AddRentDTO {
  userId: number;
  scooterId: number;
  isActive: boolean;
  totalPrice: number;
  constructor(
    userId: number,
    scooterId: number,
    isActive: boolean,
    totalPrice: number,
  ) {
    this.userId = userId;
    this.scooterId = scooterId;
    this.isActive = isActive;
    this.totalPrice = totalPrice;
  }
}
