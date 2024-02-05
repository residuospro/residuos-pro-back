import { DateRange } from "./interfaces";

export class DateRangeFactory {
  static getCurrentMonthDateRange(): DateRange {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return { startDate, endDate };
  }

  static getCurrentYearDateRange(): DateRange {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1); // Janeiro 1 do ano atual
    const endDate = new Date(currentYear + 1, 0, 1); // Janeiro 1 do próximo ano
    return { startDate, endDate };
  }
}
