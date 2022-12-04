import { Document, Types } from "mongoose";

export interface IProvider {
  name: string;
  legalDocument: string;
  postalCode: string;
  city: string;
  state: string;
  phone: string;
  email: string;
}

export interface IProviderDocument extends Document {
  name: string;
  legalDocument: string;
  postalCode: string;
  city: string;
  state: string;
  phone: string;
  email: string;
}

export interface IProviderService {
  updateProviderById(id: Types.ObjectId, userBody: Partial<IProviderDocument>): Promise<IProviderDocument>;
  deleteProviderById(id: Types.ObjectId): Promise<any>;
  getProviderById(id: Types.ObjectId): Promise<any>;
  getAllProviders(): Promise<any>;
}
