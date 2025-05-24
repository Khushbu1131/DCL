import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

import { ProgramModule } from './program/program.module';
import { Program } from './program/program.entity';
import { BookingsModule } from './bookings/bookings.module';
import { Booking } from './bookings/booking.entity';

@Module({
  imports: [AuthModule, UsersModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'programs',
    entities: [User,Program,Booking],
    synchronize: true,
  }),ProgramModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
