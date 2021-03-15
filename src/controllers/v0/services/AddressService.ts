import { Model } from "mongoose";
import Address, { IAddress } from "../models/Address";

export class AddressService {
  private static address: Model<any> = Address;

  static isAddressValid(address: any) {
    return ["state", "city", "street", "country", "postalCode"].every(
      (key) => address[key]
    );
  }

  protected static async createAddress(address: IAddress): Promise<object> {
    try {
      const result = await this.address.create(address);

      return result;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }
}
