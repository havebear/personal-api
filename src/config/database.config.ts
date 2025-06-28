import { registerAs } from '@nestjs/config';

/**
 * 数据库配置
 * 定义MongoDB数据库的连接配置参数
 */
export default registerAs('database', () => ({
  // MongoDB连接URI，从环境变量获取，默认为本地数据库
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-api',
  // 使用新的URL解析器
  useNewUrlParser: true,
  // 使用统一的拓扑结构
  useUnifiedTopology: true,
})); 