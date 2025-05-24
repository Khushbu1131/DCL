import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './DTO/create-booking.dto';
import { ProgramService } from 'src/program/program.service';
//import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private programsService: ProgramService,
    private usersService: UsersService,
  ) {}
async bookSeats(userId: number, dto: CreateBookingDto): Promise<Booking> {
    const { programId, seats } = dto;
    const program = await this.programsService.findOne(programId);
    if (program.date <= new Date()) {
      throw new ForbiddenException('Cannot book past or ongoing programs');
    }
if (seats < 1 || seats > 4) {
    throw new BadRequestException('You can only book between 1 and 4 seats.');
  }

  //const program = await this.programsService.findOne(programId);
  if (!program) {
    throw new NotFoundException('Program not found');
  }

  if (program.date <= new Date()) {
    throw new ForbiddenException('Cannot book past or ongoing programs');
  }
    // overbooking check
    const { sum } =
      (await this.bookingsRepository
        .createQueryBuilder('b')
        .select('SUM(b.seats)', 'sum')
        .where('b.programId = :programId', { programId })
        .getRawOne()) || { sum: 0 };
    if (+sum + seats > program.capacity) {
      throw new BadRequestException('Not enough seats available');
    }

    // fetch user entity
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const booking = this.bookingsRepository.create({ user, program, seats });
    return this.bookingsRepository.save(booking);
  }

  /*async getUserBookings(
    requesterId: number,
    targetUserId: number,
  ): Promise<Booking[]> {
    const requester = await this.usersService.findById(requesterId);

    // allow if self or admin
    if (requester.role !== 'admin' && requesterId !== targetUserId) {
      throw new ForbiddenException('You cannot view other users’ bookings');
    }

    return this.bookingsRepository.find({
      where: { user: { id: targetUserId } },
      relations: ['program'],
      order: { createdAt: 'DESC' },
    });
  }*/
 async getUserBookings(requesterId: number, targetUserId: number): Promise<Booking[]> {
  if (requesterId !== targetUserId) {
    // Optional: You can also check if requester is admin here (if needed)
    throw new ForbiddenException('Access denied');
  }

  return this.bookingsRepository.find({
    where: { user: { id: targetUserId } },
    relations: ['program'],
    order: { createdAt: 'DESC' },
  });
}
  /*async bookSeats(user: User, createBookingDto: CreateBookingDto): Promise<Booking> {
    const { programId, seats } = createBookingDto;

    const program = await this.programsService.findOne(programId);
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    if (program.date <= new Date()) {
      throw new ForbiddenException('Cannot book past or ongoing programs');
    }

    // Calculate total booked seats so far
    const totalBookedSeats = await this.bookingsRepository
      .createQueryBuilder('booking')
      .where('booking.programId = :programId', { programId })
      .select('SUM(booking.seats)', 'sum')
      .getRawOne();

    const seatsBooked = Number(totalBookedSeats.sum) || 0;

    if (seatsBooked + seats > program.capacity) {
      throw new BadRequestException('Not enough seats available');
    }


    const booking = this.bookingsRepository.create({
      user,
      program,
      seats,
    });

    return this.bookingsRepository.save(booking);
  }

  async getUserBookings(user: User): Promise<Booking[]> {
    return this.bookingsRepository.find({
      where: { user: { id: user.id } },
      relations: ['program'],
      order: { createdAt: 'DESC' },
    });
  }*/}
