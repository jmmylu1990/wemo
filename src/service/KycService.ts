import { Injectable } from '@nestjs/common';

@Injectable()
export class KycService {
  async verifyDriversLicense(number: string): Promise<boolean> {
    console.log('number有駕照:', number);
    return true;
  }
}
