import httpStatus from "http-status";
import { Types } from "mongoose";
import { IMedicine, IMedicineDocument, IMedicineService } from "../interfaces";

import Medicine from "../models/MedicineModel";
import ApiError from "../utils/ApiError";

export class MedicineService implements IMedicineService {
  public async updateMedicineById(id: Types.ObjectId, medicineBody: Partial<IMedicineDocument>): Promise<IMedicineDocument> {
    const medicineToUodate = await Medicine.findById(id);

    if (!medicineToUodate) {
      throw new ApiError(httpStatus.NOT_FOUND, "Medicine not found");
    }

    Object.assign(medicineToUodate, medicineBody);

    await medicineToUodate.save();

    return medicineToUodate;
  }
  public async deleteMedicineById(id: Types.ObjectId): Promise<any> {
    const medicineToDelete = await Medicine.findById(id)

    if (!medicineToDelete) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Medicine not found')
    }

    medicineToDelete.remove();

    return medicineToDelete;
  }

  public async getMedicineById(id: Types.ObjectId): Promise<any> {
    const medicineDoc = await Medicine.findById(id)

    if (!medicineDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Medicine not found');
    }

    return medicineDoc;
  }
  public async getAllMedicines(): Promise<any> {
    const medicines = Medicine
      .find()
      .populate({ path: 'provider', select: 'name' });

    return medicines;
  }

  public async addNewMedicine(MedicineBody: IMedicine) {
    const medicine = await Medicine.create(MedicineBody);

    return medicine;
  }
}
