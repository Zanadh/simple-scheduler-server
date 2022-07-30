export interface ICreateWeek {
  date: string | Date;
}

export interface IUpdateWeek {
  startDate?: string;
  endDate?: string;
  id?: string;
  isPublished?: boolean;
}