/**
 * 格式化日期为YYYY-MM-DD格式
 * @param date 日期对象
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * 获取日期范围内的所有日期
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @returns 日期数组
 */
export function getDateRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  
  // 遍历日期范围，每天递增
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
}

/**
 * 获取日期的月份和日期
 * @param date 日期对象
 * @returns 包含月份和日期的对象
 */
export function getMonthDay(date: Date): { month: number; day: number } {
  return {
    month: date.getMonth() + 1, // 月份从0开始，需要加1
    day: date.getDate(),
  };
}

/**
 * 检查两个日期是否为同月同日
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @returns 是否为同月同日
 */
export function isSameMonthDay(date1: Date, date2: Date): boolean {
  return (
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * 获取指定年月的天数
 * @param year 年份
 * @param month 月份
 * @returns 该月的天数
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * 获取日期是一年中的第几周
 * @param date 日期对象
 * @returns 周数
 */
export function getWeekOfYear(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
} 