import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { ProgramModule } from 'src/program/program.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]), 
    ProgramModule,UsersModule,
  ],
  providers: [BookingsService],
  controllers: [BookingsController]
})
export class BookingsModule {}
