import mongoose, { Schema, model, SchemaTypes } from "mongoose";

import tokenTypes from "../constants/tokenTypes";
import { ITokenDocument } from "../interfaces";
import { toJSON } from "./plugins";

const tokenSchema = new Schema<ITokenDocument>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        tokenTypes.ACCESS,
        tokenTypes.REFRESH,
        tokenTypes.RESET_PASSWORD,
        tokenTypes.VERIFY_EMAIL,
      ],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blocklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Token = model<ITokenDocument>("Token", tokenSchema);

export default Token;
