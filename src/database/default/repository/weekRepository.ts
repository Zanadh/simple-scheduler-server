import {
  getRepository,
  FindManyOptions,
  FindOneOptions,
  FindConditions,
  DeleteResult,
} from "typeorm";
import moduleLogger from "../../../shared/functions/logger";
import Week from "../entity/week";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { HttpError } from "../../../shared/classes/HttpError";

const logger = moduleLogger("shiftRepository");

export const find = async (opts?: FindManyOptions<Week>): Promise<Week[]> => {
  logger.info("Find");
  const repository = getRepository(Week);
  const data = await repository.find(opts);
  return data;
};

export const findOne = async (opts?: FindManyOptions<Week>): Promise<Week> => {
  logger.info("Find");
  const repository = getRepository(Week);
  const data = await repository.findOne(opts);
  return data;
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<Week>
): Promise<Week> => {
  logger.info("Find week by id");
  const repository = getRepository(Week);
  const data = await repository.findOne(id, opts);
  if (!data) throw new HttpError(404, 'No data found.')
  return data;
};

export const create = async (payload: Week): Promise<Week> => {
  logger.info("Create week");
  const repository = getRepository(Week);
  const newdata = await repository.save(payload);
  return newdata;
};

export const updateById = async (
  id: string,
  payload: QueryDeepPartialEntity<Week>
): Promise<Week> => {
  logger.info("Update week by id");
  const repository = getRepository(Week);
  const week = await findById(id);
  Object.keys(payload).forEach((key) => {
    week[key] = payload[key]
  })

  await repository.save(week);
  return findById(id);
};

export const deleteById = async (
  id: string
): Promise<Week> => {
  logger.info("Delete by id");
  const repository = getRepository(Week);
  const week = await findById(id, { relations: ['week'] });

  return await repository.remove(week);
};
