import { Types } from 'mongoose';

/**
 * 获取写作频率聚合管道
 * 统计指定时间范围内的写作频率
 * @param userId 用户ID
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @param frequency 频率类型：daily, weekly, monthly
 * @returns 聚合管道数组
 */
export function getWritingFrequencyAggregation(
  userId: string,
  startDate: Date,
  endDate: Date,
  frequency: 'daily' | 'weekly' | 'monthly' = 'daily',
) {
  let dateFormat: string;
  let groupId: any;

  switch (frequency) {
    case 'daily':
      dateFormat = '%Y-%m-%d';
      groupId = { $dateToString: { format: dateFormat, date: '$date' } };
      break;
    case 'weekly':
      dateFormat = '%Y-%U';
      groupId = { $dateToString: { format: dateFormat, date: '$date' } };
      break;
    case 'monthly':
      dateFormat = '%Y-%m';
      groupId = { $dateToString: { format: dateFormat, date: '$date' } };
      break;
    default:
      dateFormat = '%Y-%m-%d';
      groupId = { $dateToString: { format: dateFormat, date: '$date' } };
  }

  return [
    {
      $match: {
        userId: new Types.ObjectId(userId),
        date: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: groupId,
        count: { $sum: 1 },
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
    { $sort: { _id: 1 } },
  ] as any[];
} 