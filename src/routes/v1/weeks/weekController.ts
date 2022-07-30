import { Request, ResponseToolkit } from "@hapi/hapi";
import * as weekUsecase from "../../../usecases/weekUsecase";
import { errorHandler } from "../../../shared/functions/error";
import {
  ICreateWeek,
  ISuccessResponse,
  IUpdateWeek,
} from "../../../shared/interfaces";
import moduleLogger from "../../../shared/functions/logger";
import { FindManyOptions } from "typeorm";
import Week from "../../../database/default/entity/week";
import { queryWhereBuilder } from "../../../shared/utils";

const logger = moduleLogger("weekController");

export const find = async (req: Request, h: ResponseToolkit) => {
  logger.info("Find shifts");
  try {
    let { firstDateOfWeek, ...filter } = req.query;
    let queryOpt: FindManyOptions<Week> = { ...filter }

    if (firstDateOfWeek) {
      queryOpt.where = { startDate: queryWhereBuilder.between(firstDateOfWeek) }
    }
    const data = await weekUsecase.find(queryOpt);
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
  logger.info("Find week by id");
  try {
    const id = req.params.id;
    const data = await weekUsecase.findById(id);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Get week successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};

export const create = async (req: Request, h: ResponseToolkit) => {
  logger.info("Create week");
  try {
    const body = req.payload as ICreateWeek;
    const data = await weekUsecase.create(body);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Create week successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};

export const updateById = async (req: Request, h: ResponseToolkit) => {
  logger.info("Update week by id");
  try {
    const id = req.params.id;
    const body = req.payload as IUpdateWeek;

    const data = await weekUsecase.updateById(id, body);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Update week successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};

export const publish = async (req: Request, h: ResponseToolkit) => {
  logger.info("Publish week by Id");
  try {
    const id = req.params.id;

    const data = await weekUsecase.updateById(id, { isPublished: true });
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Publish week by Id successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};