/**
 * 分页选项接口
 * 定义分页查询的基本参数
 */
export interface PaginationOptions {
  page: number;   // 当前页码
  limit: number;  // 每页数量
  skip: number;   // 跳过的记录数
}

/**
 * 分页结果接口
 * 定义分页查询的返回结果格式
 */
export interface PaginationResult<T> {
  data: T[];        // 数据列表
  total: number;    // 总记录数
  page: number;     // 当前页码
  limit: number;    // 每页数量
  totalPages: number; // 总页数
  hasNext: boolean;   // 是否有下一页
  hasPrev: boolean;   // 是否有上一页
}

/**
 * 创建分页选项
 * 根据页码和每页数量生成分页查询参数
 * @param page 页码，默认为1
 * @param limit 每页数量，默认为10
 * @returns 分页选项对象
 */
export function createPaginationOptions(
  page: number = 1,
  limit: number = 10,
): PaginationOptions {
  // 确保页码最小为1
  const validPage = Math.max(1, page);
  // 限制每页数量在1-100之间
  const validLimit = Math.min(100, Math.max(1, limit));
  
  return {
    page: validPage,
    limit: validLimit,
    skip: (validPage - 1) * validLimit,
  };
}

/**
 * 创建分页结果
 * 根据数据和分页选项生成标准的分页结果格式
 * @param data 数据列表
 * @param total 总记录数
 * @param options 分页选项
 * @returns 分页结果对象
 */
export function createPaginationResult<T>(
  data: T[],
  total: number,
  options: PaginationOptions,
): PaginationResult<T> {
  // 计算总页数
  const totalPages = Math.ceil(total / options.limit);
  
  return {
    data,
    total,
    page: options.page,
    limit: options.limit,
    totalPages,
    hasNext: options.page < totalPages,
    hasPrev: options.page > 1,
  };
} 