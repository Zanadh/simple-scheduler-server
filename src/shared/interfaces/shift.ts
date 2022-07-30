import Week from "../../database/default/entity/week";

export interface ICreateShift {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  week: Week;
}

export interface IUpdateShift {
  name?: string;
  date: string;
  startTime: string;
  endTime: string;
  weekId?: string;
  week?: Week;
}