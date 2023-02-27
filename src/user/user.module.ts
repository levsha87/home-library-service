import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/db.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [DbModule],
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
