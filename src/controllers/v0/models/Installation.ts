import mongoose, { Schema, Document } from "mongoose";
import { IAddress } from "./Address";
import Client, { IClient } from "./Client";

const InstallationSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true, primaryKey: true },
  client: {
    type: String,
    require: true,
    ref: Client,
    foreignField: "cpf",
  },
});

export interface IInstallation extends Document {
  code: string;
  client: IClient["cpf"];
}

export default mongoose.model<IInstallation>(
  "Installation",
  InstallationSchema
);
