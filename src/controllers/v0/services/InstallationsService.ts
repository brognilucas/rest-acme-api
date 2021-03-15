import { Model } from "mongoose";
import Installation, { IInstallation } from "../models/Installation";
import Client, { IClient } from "../models/Client";

export class InstallationService {
  private static installations: Model<any> = Installation;

  static isInstallationsValid(installation: any) {
    return ["code", "client"].every((key) => installation[key]);
  }

  public static async findInstallations(filter = {}) {
    const installations = await this.installations
      .find(filter, { _id: 0, __v: 0 })
      .lean();

    return installations || [];
  }

  public static async create(installation: IInstallation) {
    return this.installations.create(installation);
  }
}
