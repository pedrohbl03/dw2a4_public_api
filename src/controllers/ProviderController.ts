import { Request, Response } from "express";
import { Types } from "mongoose";
import { IProvider } from "../interfaces";

import {
  ProviderService,
} from "../services";

const _providerService = new ProviderService();

export class ProviderController {
  public static async getAllProviders(req: Request, res: Response): Promise<Response> {
    const allProviders = await _providerService.getAllProviders();
    
    return res.status(200).json(allProviders);
  }

  public static async addNewProvider(req: Request<any, IProvider>, res: Response): Promise<Response> {
    const addNewProvider = await _providerService.addNewProvider(req.body);

    return res.status(200).json(addNewProvider);
  }

  public static async deleteProviderById(req: Request<Types.ObjectId>, res: Response): Promise<Response>{
    const { _id } = req.params;
    const deleteProvider = await _providerService.deleteProviderById(_id);

    return res.status(200).json(deleteProvider);
  }

  public static async updateProviderById(req: Request<Types.ObjectId, IProvider>, res: Response): Promise<Response> {
    const { _id } = req.params;
    const updatedProvider = await _providerService.updateProviderById(_id, req.body);

    return res.status(200).json(updatedProvider);
  }

  public static async getProviderById(req: Request<Types.ObjectId>, res: Response): Promise<Response> {
    const { _id } = req.params;
    const Provider = await _providerService.getProviderById(_id);

    return res.status(200).json(Provider);
  }

}