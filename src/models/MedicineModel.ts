/* eslint-disable func-names */
import { Schema, model, SchemaTypes } from "mongoose";

import { IMedicineDocument } from "../interfaces";
import { toJSON, paginate } from "./plugins";

const medicineSchema = new Schema<IMedicineDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
      trim: true,
    },
    sellPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    recipe: {
      type: Boolean,
      required: true,
      trim: true,
    },
    stripe: {
      type: String,
      required: true,
      trim: true,
    },
    generic: {
      type: Boolean,
      required: true,
      trim: true,
    },
    inventory: {
      type: Number,
      required: true,
      trim: true,
    },
    provider: {
      type: SchemaTypes.ObjectId,
      ref: "Provider",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
medicineSchema.plugin(toJSON);
medicineSchema.plugin(paginate);

/**
 * @typedef Medicine
 */
const Medicine = model<IMedicineDocument>("Medicine", medicineSchema);

export default Medicine;
