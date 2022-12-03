/* eslint-disable func-names */
import httpStatus from "http-status";
import { Schema, model, Types } from "mongoose";
import validator from "validator";

import { ICustomerDocument, ICustomerModel } from "../interfaces";
import ApiError from "../utils/ApiError";
import { toJSON, paginate } from "./plugins";

const customerSchema = new Schema<ICustomerDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new ApiError(httpStatus.BAD_REQUEST, `Invalid e-mail: ${value}`);
        }
      },
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if(!validator.isPostalCode(value, 'BR')){
          throw new ApiError(httpStatus.BAD_REQUEST, `Invalid Postal Code: ${value}`);
        }
      }
    },
    adress: {
      type: String,
      required: true,
      trim: true,
    },
    legalDocument: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value: string){
        if(!validator.isMobilePhone(value, 'pt-BR')){
          throw new ApiError(httpStatus.BAD_REQUEST, `Invalid Phone Number: ${value}`)
        }
      }
    },
    isActiveClient: {
      type: Boolean,
      required: true,
      trim: true,
      validate(value: string){
        if(!validator.isBoolean){
          throw new ApiError(httpStatus.BAD_REQUEST, `Invalid client status: ${value}`)
        }
      }

    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
customerSchema.plugin(toJSON);
customerSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
customerSchema.statics.isEmailTaken = async function (
  email: string,
  excludeUserId: Types.ObjectId
): Promise<boolean> {
  const customer = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!customer;
};

customerSchema.statics.isLegalDocumentTaken = async function (
  legalDocument: string,
  excludeUserId: Types.ObjectId
): Promise<boolean> {
  const customer = await this.findOne({ legalDocument, _id: { $ne: excludeUserId } });
  return !!customer;
};

/**
 * @typedef Customer
 */
const Customer = model<ICustomerDocument, ICustomerModel>("Customer", customerSchema);

export default Customer;
