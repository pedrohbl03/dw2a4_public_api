import httpStatus from "http-status";
import { Types } from "mongoose";
import { IProvider, IProviderDocument, IProviderService } from "../interfaces";

import Provider from "../models/ProviderModel";
import ApiError from "../utils/ApiError";

export class ProviderService implements IProviderService {
  public async updateProviderById(id: Types.ObjectId, ProviderBody: Partial<IProviderDocument>): Promise<IProviderDocument> {
    const providerToUodate = await Provider.findById(id);

    if(!providerToUodate){
      throw new ApiError(httpStatus.NOT_FOUND, "Provider not found");
    }

    Object.assign(providerToUodate, ProviderBody);

    await providerToUodate.save();

    return providerToUodate;
  }
  public async deleteProviderById(id: Types.ObjectId): Promise<any> {
    const providerToDelete = await Provider.findById(id)

    if(!providerToDelete){
      throw new ApiError(httpStatus.NOT_FOUND, 'Provider not found')
    }

    providerToDelete.remove();

    return providerToDelete;
  }

  public async getProviderById(id: Types.ObjectId): Promise<any> {
    const providerDoc = await Provider.findById(id)

    if(!providerDoc){
      throw new ApiError(httpStatus.NOT_FOUND, 'Provider not found');
    }

    return providerDoc;
  }
  public async getAllProviders(): Promise<any> {
    const providers = Provider.find();

    return providers;
  }

  public async addNewProvider(ProviderBody: IProvider) {
    const provider = await Provider.create(ProviderBody);

    return provider;
  }
}
