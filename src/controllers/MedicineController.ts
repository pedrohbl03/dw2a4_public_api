import { Request, Response } from "express";
import { Types } from "mongoose";
import { IMedicine } from "../interfaces";

import {
  MedicineService,
} from "../services";

const _medicineService = new MedicineService();

export class MedicineController {
  public static async getAllMedicines(req: Request, res: Response): Promise<Response> {
    const allMedicines = await _medicineService.getAllMedicines();
    
    return res.status(200).json(allMedicines);
  }

  public static async addNewMedicine(req: Request<any, IMedicine>, res: Response): Promise<Response> {

    const addNewMedicine = await _medicineService.addNewMedicine(req.body);

    return res.status(200).json(addNewMedicine);
  }

  public static async deleteMedicineById(req: Request<Types.ObjectId>, res: Response): Promise<Response>{
    const { _id } = req.params;
    const deleteMedicine = await _medicineService.deleteMedicineById(_id);

    return res.status(200).json(deleteMedicine);
  }

  public static async updateMedicineById(req: Request<Types.ObjectId, IMedicine>, res: Response): Promise<Response> {
    const { _id } = req.params;
    const updatedMedicine = await _medicineService.updateMedicineById(_id, req.body);

    return res.status(200).json(updatedMedicine);
  }

  public static async getMedicineById(req: Request<Types.ObjectId>, res: Response): Promise<Response> {
    const { _id } = req.params;
    const Medicine = await _medicineService.getMedicineById(_id);


    return res.status(200).json(Medicine);
  }

}