import { Request, ResponseToolkit } from "@hapi/hapi";
import * as shiftUsecase from "../../../usecases/shiftUsecase";
import * as weekUsecase from "../../../usecases/weekUsecase";
import { errorHandler } from "../../../shared/functions/error";
import {
  ICreateShift,
  ISuccessResponse,
  IUpdateShift,
} from "../../../shared/interfaces";
import moduleLogger from "../../../shared/functions/logger";
import { FindManyOptions } from "typeorm";
import Shift from "../../../database/default/entity/shift";
import { queryWhereBuilder } from "../../../shared/utils";

const logger = moduleLogger("shiftController");


export const find = async (req: Request, h: ResponseToolkit) => {
  logger.info("Find shifts");
  try {
    let { firstDateOfWeek, ...filter } = req.query;
    let queryOpt: FindManyOptions<Shift> = { ...filter }
    
    if (firstDateOfWeek) {
      queryOpt.where = { date: queryWhereBuilder.between(firstDateOfWeek) }
    }
    const data = await shiftUsecase.find(queryOpt);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Get shift successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};

export const findById = async (req: Request, h: ResponseToolkit) => {
  logger.info("Find shift by id");
  try {
    const id = req.params.id;
    const data = await shiftUsecase.findById(id, { relations: ['week'] });

    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Get shift successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};

export const create = async (req: Request, h: ResponseToolkit) => {
  logger.info("Create shift");
  try {
    const body = req.payload as ICreateShift;

    const week = await weekUsecase.findOneOrCreate({ date: body.date })
    const data = await shiftUsecase.create({ ...body, week });
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Create shift successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};

export const updateById = async (req: Request, h: ResponseToolkit) => {
  logger.info("Update shift by id");
  try {
    const id = req.params.id;
    const body = req.payload as IUpdateShift;
 
    const data = await shiftUsecase.updateById(id, body);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Update shift successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};

export const deleteById = async (req: Request, h: ResponseToolkit) => {
  logger.info("Delete shift by id");
  try {
    const id = req.params.id;
    const data = await shiftUsecase.deleteById(id);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Delete shift successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};
