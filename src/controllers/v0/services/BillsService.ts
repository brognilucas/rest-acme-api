import { Model } from "mongoose";
import Bills, { IBill } from "../models/Bill";

export class BillsService {
  private static bills: Model<any> = Bills;

  static isBillsValid(bill: any) {
    return [
      "installation",
      "client",
      "billAmount",
      "readAmount",
      "readAt",
      "readDate",
      "dueDate",
      "code",
    ].every((key) => bill[key]);
  }

  static async getBillByCode(code: string) {
    return this.bills.findOne({ code }).lean();
  }

  static async getBills(filter = {}) {
    return this.bills.find(filter).lean();
  }

  static async createBills(bill: IBill): Promise<object> {
    try {
      const result = await this.bills.create(bill);

      return result;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }
}
