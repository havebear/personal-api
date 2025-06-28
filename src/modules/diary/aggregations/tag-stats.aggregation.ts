import { Types } from 'mongoose';

/**
 * 获取标签统计聚合管道
 * 统计每个标签的使用次数和最后使用时间
 * @param userId 用户ID
 * @returns 聚合管道数组
 */
export function getTagStatsAggregation(userId: string) {
  return [
    { $match: { userId: new Types.ObjectId(userId) } },
    { $unwind: '$tags' },
    { 
      $group: { 
        _id: '$tags', 
        count: { $sum: 1 }, 
        lastUsed: { $max: '$date' } 
      } 
    },
    { $sort: { count: -1 } },
    { 
      $project: { 
        tag: '$_id', 
        count: 1, 
        lastUsed: 1, 
        _id: 0 
      } 
    },
  ] as any[];
} 