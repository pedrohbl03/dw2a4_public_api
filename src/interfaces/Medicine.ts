import { Document, Types } from "mongoose";

export interface IMedicine {
  name: string;
  purchasePrice: number;
  sellPrice: number;
  medicineProvider: string;
  inventory: number;
  recipe: boolean;
  stripe: string;
  generic: boolean;
}

export interface IMedicineDocument extends Document {
  name: string;
  purchasePrice: number;
  sellPrice: number;
  provider: Types.ObjectId;
  inventory: number;
  recipe: boolean;
  stripe: string;
  generic: boolean;
}

export interface IMedicineService {
  updateMedicineById(id: Types.ObjectId, userBody: Partial<IMedicineDocument>): Promise<IMedicineDocument>;
  deleteMedicineById(id: Types.ObjectId): Promise<any>;
  getMedicineById(id: Types.ObjectId): Promise<any>;
  getAllMedicines(): Promise<any>;
}
