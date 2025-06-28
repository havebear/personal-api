import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';

/**
 * 用户模块
 * 整合用户相关的所有功能，包括Schema、服务、仓库等
 */
@Module({
  imports: [
    // 注册用户Schema到Mongoose
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository], // 导出服务供其他模块使用
})
export class UserModule {} 