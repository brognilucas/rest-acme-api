import mongoose, { Schema, Document } from "mongoose";
import { IAddress } from "./Address";

const ClientSchema: Schema = new Schema({
  cpf: { type: String, unique: true, index: true, required: true },
  name: { type: String, required: true },
  birthDate: { type: Date, required: true },
  address: { type: Schema.Types.ObjectId, ref: "Address", required: true },
});

export interface IClient extends Document {
  cpf: string;
  name: string;
  birthDate: Date;
  address: IAddress["_id"];
}

export default mongoose.model<IClient>("Client", ClientSchema);
