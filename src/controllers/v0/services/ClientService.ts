import { Model } from "mongoose";
import Address from "../models/Address";
import Client, { IClient } from "../models/Client";

export class ClientService {
  private static client: Model<any> = Client;
  private static address: Model<any> = Address;

  static isClientValid(client: any) {
    return ["cpf", "name", "birthDate", "address"].every((key) => client[key]);
  }

  public static async findInstallationsByClient(cpf: string) {
    const client = await this.client
      .findOne({ cpf }, { _id: 0, __v: 0 })
      .populate("installations")
      .lean();

    return client;
  }

  public static async findClient(cpf: string) {
    const client = await this.client
      .findOne({ cpf }, { _id: 0, __v: 0 })
      .populate("address")
      .lean();

    return client;
  }

  public static async findClients() {
    const clients = await this.client
      .find({}, { _id: 0, __v: 0 })
      .populate("address")
      .lean();

    return clients;
  }

  public static async createClient(client: IClient): Promise<object> {
    const result = await this.client.create(client);

    return result;
  }
}
