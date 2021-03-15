import mongoose, { Schema, Document } from "mongoose";

const AddressSchema: Schema = new Schema({
  street: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
});

export interface IAddress extends Document {
  street: string;
  state: string;
  city: string;
  country: string;
  postalCode: string;
}

export default mongoose.model<IAddress>("Address", AddressSchema);
