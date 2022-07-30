import * as weekRepository from "../database/default/repository/weekRepository";
import * as shiftRepository from "../database/default/repository/shiftRepository";
import { FindManyOptions, FindOneOptions } from "typeorm";
import Week from "../database/default/entity/week";
import { ICreateWeek, IUpdateWeek } from "../shared/interfaces";
import { endOfWeek, format, isSameDay, startOfWeek } from "date-fns";
import { dateToString, queryWhereBuilder } from "../shared/utils";

export const find = async (opts: FindManyOptions<Week>): Promise<Week[]> => {
  return weekRepository.find(opts);
};

export const findOne = async (opts: FindOneOptions<Week>): Promise<Week> => {
  return weekRepository.findOne(opts);
};

export const findOneOrCreate = async ({ date }: ICreateWeek): Promise<Week> => {
  let week = await findOne({ where: { startDate: queryWhereBuilder.between(date) } })
  if (!week) {
    week = await create({ date })
  }
  return week
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<Week>
): Promise<Week> => {
  return weekRepository.findById(id, opts);
};

export const create = async (payload: ICreateWeek): Promise<Week> => {
  const week = new Week();
  week.startDate = dateToString(startOfWeek(new Date(payload.date), { weekStartsOn: 1 }))
  week.endDate = dateToString(endOfWeek(new Date(payload.date), { weekStartsOn: 1 }))
  return weekRepository.create(week);
};

export const updateById = async (
  id: string,
  payload: IUpdateWeek
): Promise<Week> => {
  return weekRepository.updateById(id, {
    ...payload,
  });
};