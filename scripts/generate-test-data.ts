import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UserService } from '../src/modules/user/user.service';
import { DiaryService } from '../src/modules/diary/diary.service';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

/**
 * 测试数据生成脚本
 * 生成50个用户、1000篇日记、20个标签的测试数据
 */
async function generateTestData() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const userService = app.get(UserService);
    const diaryService = app.get(DiaryService);
    const connection = app.get<Connection>(getConnectionToken());

    console.log('开始生成测试数据...');

    // 生成50个用户
    const users: any[] = [];
    const userCount = 50;
    
    for (let i = 1; i <= userCount; i++) {
      const email = `user${i}@example.com`;
      const password = 'password123';
      
      try {
        const user = await userService.createUser(email, password);
        users.push(user);
        console.log(`创建用户: ${email}`);
      } catch (error) {
        console.log(`用户 ${email} 已存在，跳过创建`);
      }
    }

    console.log(`成功创建 ${users.length} 个用户`);

    // 生成20个标签
    const allTags = [
      '生活', '工作', '学习', '旅行', '美食', '运动', '音乐', '电影',
      '读书', '思考', '情感', '家庭', '朋友', '健康', '梦想', '目标',
      '回忆', '计划', '感悟', '心情'
    ];

    // 为每个用户生成日记
    const totalDiaryCount = 1000;
    const diaryPerUser = Math.floor(totalDiaryCount / users.length);
    
    for (const user of users) {
      const diaryCount = diaryPerUser + Math.floor(Math.random() * 10);
      console.log(`为用户 ${user.email} 生成 ${diaryCount} 篇日记...`);
      
      for (let i = 0; i < diaryCount; i++) {
        // 随机生成日期（过去一年内）
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 365));
        
        // 随机选择2-5个标签
        const tagCount = Math.floor(Math.random() * 4) + 2;
        const tags: string[] = [];
        const availableTags = [...allTags];
        
        for (let j = 0; j < tagCount; j++) {
          const randomIndex = Math.floor(Math.random() * availableTags.length);
          const tag = availableTags[randomIndex];
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
          availableTags.splice(randomIndex, 1);
        }

        // 生成日记内容
        const contents = [
          `今天是一个美好的一天，我${['学习了新知识', '完成了工作任务', '和朋友聚会', '去健身房锻炼', '看了电影', '听了音乐'][Math.floor(Math.random() * 6)]}。`,
          `今天的心情${['很好', '一般', '有点低落', '非常兴奋', '平静'][Math.floor(Math.random() * 5)]}，${['天气不错', '下雨了', '阳光明媚', '阴天'][Math.floor(Math.random() * 4)]}。`,
          `今天${['工作很忙', '学习很充实', '休息得很好', '运动很累', '思考很多'][Math.floor(Math.random() * 5)]}，感觉${['收获满满', '需要休息', '要继续努力', '很满足'][Math.floor(Math.random() * 4)]}。`,
          `今天遇到了${['有趣的人', '挑战', '机会', '困难', '惊喜'][Math.floor(Math.random() * 5)]}，让我${['学到了很多', '成长了', '思考了很多', '很开心'][Math.floor(Math.random() * 4)]}。`,
          `今天${['计划', '目标', '梦想', '想法'][Math.floor(Math.random() * 4)]}有了新的${['进展', '突破', '想法', '方向'][Math.floor(Math.random() * 4)]}，感觉${['充满希望', '很有动力', '需要调整', '很满意'][Math.floor(Math.random() * 4)]}。`
        ];
        
        const content = contents[Math.floor(Math.random() * contents.length)] + 
                       ` #${tags.join(' #')}`;

        try {
          await diaryService.create(user._id.toString(), {
            content,
            date: date.toISOString().split('T')[0],
            tags,
          });
        } catch (error) {
          console.error(`创建日记失败: ${error.message}`);
        }
      }
    }

    // 统计生成的数据
    const finalUserCount = await connection.db?.collection('users').countDocuments();
    const finalDiaryCount = await connection.db?.collection('diaries').countDocuments();
    
    console.log('\n测试数据生成完成！');
    console.log(`用户数量: ${finalUserCount}`);
    console.log(`日记数量: ${finalDiaryCount}`);
    console.log(`标签数量: ${allTags.length}`);

  } catch (error) {
    console.error('生成测试数据时出错:', error);
  } finally {
    await app.close();
  }
}

// 运行脚本
generateTestData().catch(console.error); 