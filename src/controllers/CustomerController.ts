import { Request, Response } from "express";
import { Types } from "mongoose";
import { ICustomer } from "../interfaces";

import {
  CustomerService,
} from "../services";

const _customerService = new CustomerService();

export class CustomerController {
  public static async getAllCustomers(req: Request, res: Response): Promise<Response> {
    const allCustomers = await _customerService.getAllCustomers();
    
    return res.status(200).json(allCustomers);
  }

  public static async addNewCustomer(req: Request<any, ICustomer>, res: Response): Promise<Response> {

    const addNewCustomer = await _customerService.addNewCustomer(req.body);

    return res.status(200).json(addNewCustomer);
  }

  public static async deleteCustomerById(req: Request<Types.ObjectId>, res: Response): Promise<Response>{
    const { _id } = req.params;
    const deleteCustomer = await _customerService.deleteCustomerById(_id);

    return res.status(200).json(deleteCustomer);
  }

  public static async updateCustomerById(req: Request<Types.ObjectId, ICustomer>, res: Response): Promise<Response> {
    const { _id } = req.params;
    const updatedCustomer = await _customerService.updateCustomerById(_id, req.body);

    return res.status(200).json(updatedCustomer);
  }

  public static async getCustomerById(req: Request<Types.ObjectId>, res: Response): Promise<Response> {
    const { _id } = req.params;
    const Customer = await _customerService.getCustomerById(_id);


    return res.status(200).json(Customer);
  }

}