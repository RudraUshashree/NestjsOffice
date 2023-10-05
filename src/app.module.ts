import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { JobModule } from './jobs/job.module';
import { MongooseModelModule } from './schema/mongoose.models';
import { UsersController } from './users/users.controller';
import { JobController } from './jobs/job.controller';

@Module({
  imports: [
    UserModule,
    JobModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule, UserModule, JobModule, MongooseModelModule],
      useFactory: (configService: ConfigService) => {
        const dbname = configService.get("DATABASE_NAME");
        const port = configService.get("DATABASE_PORT");

        const uri = `mongodb://localhost:${port}/${dbname}`;

        return {
          uri
        };
      },
      inject: [ConfigService]
    }),
    // MongooseModule.forRoot("mongodb://localhost:27017/NestjsDB")
  ],
  controllers: [UsersController,JobController],
})
export class AppModule {}
