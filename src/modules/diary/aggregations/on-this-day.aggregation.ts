import { Types } from 'mongoose';

/**
 * 获取那年今日聚合管道
 * 查找指定月日的所有日记，排除当前年份
 * @param userId 用户ID
 * @param month 月份
 * @param day 日期
 * @param currentYear 当前年份
 * @returns 聚合管道数组
 */
export function getOnThisDayAggregation(
  userId: string,
  month: number,
  day: number,
  currentYear: number,
) {
  return [
    {
      $match: {
        userId: new Types.ObjectId(userId),
        $expr: {
          $and: [
            { $eq: [{ $month: '$date' }, month] },
            { $eq: [{ $dayOfMonth: '$date' }, day] },
            { $ne: [{ $year: '$date' }, currentYear] },
          ],
        },
      },
    },
    {
      $group: {
        _id: { $year: '$date' },
        diaries: {
          $push: {
            id: '$_id',
            content: '$content',
            date: '$date',
            tags: '$tags',
          },
        },
      },
    },
    { $sort: { _id: -1 } },
  ] as any[];
} 