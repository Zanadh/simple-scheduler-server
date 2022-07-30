import { endOfWeek, format, startOfWeek } from "date-fns";
import { Between } from "typeorm";

export const queryWhereBuilder = {
  between: (date: string | Date) => Between(startOfWeek(new Date(date), { weekStartsOn: 1 }), endOfWeek(new Date(date), { weekStartsOn: 1 }))
}


export const dateToString = (date: Date) => format(date, 'yyyy-MM-dd')

interface ITimeSlot {
  startTime: string,
  endTime: string
}

const overlapping = (a: ITimeSlot, b: ITimeSlot) => {
  const getMinutes = (s: string) => {
    const p = s.split(':').map(Number);
    return p[0] * 60 + p[1];
  };
  return getMinutes(a.endTime) > getMinutes(b.startTime) && getMinutes(b.endTime) > getMinutes(a.startTime);
};
export const isOverlapping = (arr: ITimeSlot[]) => {
  let i: number, j: number;
  for (i = 0; i < arr.length - 1; i++) {
    for (j = i + 1; j < arr.length; j++) {
      if (overlapping(arr[i], arr[j])) {
        return true;
      }
    };
  };
  return false;
};