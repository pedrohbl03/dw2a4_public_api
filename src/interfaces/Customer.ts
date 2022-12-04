import { Document, Model, Types } from "mongoose";

export interface ICustomer {
  name: string;
  email: string
  postalCode: string
  address: string
  legalDocument: string
  phone: string
}

export interface ICustomerDocument extends Document {
  name: string;
  email: string
  postalCode: string
  address: string
  legalDocument: string
  phone: string
  isActiveClient: boolean
}

export interface ICustomerModel extends Model<ICustomerDocument> {
  isEmailTaken(email: string, excludeUserId?: Types.ObjectId): Promise<boolean>;
  isLegalDocumentTaken(email: string, excludeUserId?: Types.ObjectId): Promise<Boolean>;
}

export interface ICustomerService {
  updateCustomerById(id: Types.ObjectId, userBody: Partial<ICustomerDocument>): Promise<ICustomerDocument>;
  deleteCustomerById(id: Types.ObjectId): Promise<any>;
  getCustomerById(id: Types.ObjectId): Promise<any>;
  getAllCustomers(): Promise<any>;
}
