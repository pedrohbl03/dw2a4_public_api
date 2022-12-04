/* eslint-disable func-names */
import { Schema, model, SchemaTypes } from "mongoose";
import validator from "validator";
import httpStatus from "http-status";

import { IProviderDocument } from "../interfaces";
import { toJSON, paginate } from "./plugins";
import ApiError from "../utils/ApiError";

const providerSchema = new Schema<IProviderDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    legalDocument: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new ApiError(httpStatus.BAD_REQUEST, "Invalid email");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
providerSchema.plugin(toJSON);
providerSchema.plugin(paginate);


providerSchema.pre("save", async function (next) {
  const provider = this;
  next();
});

/**
 * @typedef Provider
 */
const Provider = model<IProviderDocument>("Provider", providerSchema);

export default Provider;
