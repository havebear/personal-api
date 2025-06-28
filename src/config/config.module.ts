import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import databaseConfig from './database.config';
import jwtConfig from './jwt.config';

/**
 * 应用配置模块
 * 整合所有配置文件，提供全局配置管理
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      // 设置为全局模块，其他模块可以直接注入ConfigService
      isGlobal: true,
      // 加载所有配置文件
      load: [appConfig, databaseConfig, jwtConfig],
      // 指定环境变量文件路径
      envFilePath: '.env',
    }),
  ],
})
export class AppConfigModule {} 