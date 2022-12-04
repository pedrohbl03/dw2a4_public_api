import httpStatus from "http-status";
import { Types } from "mongoose";
import { ICustomer, ICustomerDocument, ICustomerService } from "../interfaces";

import Customer from "../models/CustomerModel";
import ApiError from "../utils/ApiError";

export class CustomerService implements ICustomerService {
  public async updateCustomerById(id: Types.ObjectId, userBody: Partial<ICustomerDocument>): Promise<ICustomerDocument> {
    const customerToUodate = await Customer.findById(id);

    if(!customerToUodate){
      throw new ApiError(httpStatus.NOT_FOUND, "Customer not found");
    }

    if (userBody.email && (await Customer.isEmailTaken(userBody.email))) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email is already taken");
    }

    if (userBody.legalDocument && (await Customer.isEmailTaken(userBody.legalDocument))) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Legal document is already taken");
    }

    Object.assign(customerToUodate, userBody);

    await customerToUodate.save();

    return customerToUodate;
  }
  public async deleteCustomerById(id: Types.ObjectId): Promise<any> {
    const customerToDelete = await Customer.findById(id)

    if(!customerToDelete){
      throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found')
    }

    customerToDelete.remove();

    return customerToDelete;
  }

  public async getCustomerById(id: Types.ObjectId): Promise<any> {
    const customer = await Customer.findById(id)

    if(!customer){
      throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
    }

    return customer;
  }
  
  public async getAllCustomers(): Promise<any> {
    const customers = Customer.find();

    return customers;
  }
  public async addNewCustomer(customerBody: ICustomer) {
    if (await Customer.isEmailTaken(customerBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email is already taken");
    }

    if (await Customer.isLegalDocumentTaken(customerBody.legalDocument)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Legal document is already taken");
    }

    const customer = await Customer.create(customerBody);

    return customer;
  }
}
