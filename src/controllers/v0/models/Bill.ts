import mongoose, { Schema, Document } from "mongoose";
import { IClient } from "./Client";

const BillSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true, primaryKey: true },
  installation: { type: String, required: true },
  client: { type: String, required: true },
  dueDate: { type: Date, required: true },
  readAt: { type: Date, required: true },
  readAmount: { type: Number, required: true },
  billAmount: { type: Number, required: true },
});

export interface IBill extends Document {
  code: string;
  installation: string;
  client: IClient["cpf"];
  dueDate: Date;
  readAt: Date;
  readAmount: Number;
  billAmount: Number;
}

export default mongoose.model<IBill>("Bill", BillSchema);
