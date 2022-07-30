import * as shiftRepository from "../database/default/repository/shiftRepository";
import * as weekRepository from "../database/default/repository/weekRepository";
import { FindManyOptions, FindOneOptions } from "typeorm";
import Shift from "../database/default/entity/shift";
import { ICreateShift, IUpdateShift } from "../shared/interfaces";
import { isOverlapping } from "../shared/utils";
import { HttpError } from "../shared/classes/HttpError";

export const find = async (opts: FindManyOptions<Shift>): Promise<Shift[]> => {
  return shiftRepository.find(opts);
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<Shift>
): Promise<Shift> => {
  return shiftRepository.findById(id, opts);
};

export const create = async (payload: ICreateShift): Promise<Shift> => {
  const shift = new Shift();
  Object.keys(payload).forEach((key) => {
    shift[key] = payload[key]
  })

  await validateNewShift(shift)

  return shiftRepository.create(shift);
};

export const validateNewShift = async (props:
  {
    startTime: string, endTime: string; id: string | null, date: string
  }) => {
  const { date, ...newShift } = props
  const shiftsInSameDay = await find({ where: { date } })

  const existingTimeSlots = []
  shiftsInSameDay?.forEach((shift) => {
    if (shift.id !== newShift.id) {
      existingTimeSlots.push(shift)
    }
  })

  const isOverLapping = isOverlapping([...existingTimeSlots, { ...newShift }])
  if (isOverLapping) throw new HttpError(400, 'New shift time cannot be be overlapped with existing shift')
  else return true
}

export const updateById = async (
  id: string,
  payload: IUpdateShift
): Promise<Shift> => {
  const oldShift = await findById(id, { relations: ['week'] })

  await validateNewShift({ id, ...payload })

  Object.keys(payload).forEach((key) => {
    oldShift[key] = payload[key]
  })
  return shiftRepository.updateById(oldShift);
};

export const deleteById = async (id: string) => {
  
  return shiftRepository.deleteById(id);
};
