/**
 * 生成文本摘要
 * 将长文本截断为指定长度的摘要，在合适的位置添加省略号
 * @param text 原始文本
 * @param maxLength 最大长度，默认为150
 * @returns 摘要文本
 */
export function generateExcerpt(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  // 截取到最大长度
  const truncated = text.substring(0, maxLength);
  // 找到最后一个空格的位置
  const lastSpace = truncated.lastIndexOf(' ');
  
  // 如果有空格，在空格处截断并添加省略号
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  // 如果没有空格，直接截断并添加省略号
  return truncated + '...';
}

/**
 * 生成URL友好的slug
 * 将文本转换为适合URL的格式
 * @param text 原始文本
 * @returns slug字符串
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/[\s_-]+/g, '-') // 将空格和下划线替换为连字符
    .replace(/^-+|-+$/g, ''); // 移除首尾的连字符
}

/**
 * 从文本中提取标签
 * 提取文本中以#开头的标签
 * @param text 原始文本
 * @returns 标签数组
 */
export function extractTags(text: string): string[] {
  const tagRegex = /#(\w+)/g;
  const matches = text.match(tagRegex);
  
  if (!matches) {
    return [];
  }
  
  // 移除#符号并去重
  return [...new Set(matches.map(tag => tag.substring(1)))];
}

/**
 * 移除文本中的标签
 * 移除文本中所有以#开头的标签
 * @param text 原始文本
 * @returns 移除标签后的文本
 */
export function removeTags(text: string): string {
  return text.replace(/#\w+/g, '').trim();
}

/**
 * 首字母大写
 * 将文本的第一个字母转换为大写
 * @param text 原始文本
 * @returns 首字母大写的文本
 */
export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * 生成随机字符串
 * 生成指定长度的随机字符串，包含字母和数字
 * @param length 字符串长度，默认为8
 * @returns 随机字符串
 */
export function generateRandomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
} 