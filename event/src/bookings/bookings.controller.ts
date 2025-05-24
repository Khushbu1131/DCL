import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './DTO/create-booking.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Bookings')
@Controller('bookings')
@UseGuards(JwtAuthGuard,RolesGuard)
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly usersService: UsersService,
  ) {}@Post('book')
  @ApiBearerAuth()
  @Roles('user')
  @ApiOperation({ summary: 'Book seats for a program' })
  @ApiBody({ type: CreateBookingDto })
  @ApiResponse({ status: 201, description: 'Booking created' })
  @ApiResponse({ status: 400, description: 'Invalid request or overbooking' })
  async bookSeats(@Req() req: any, @Body() dto: CreateBookingDto) {
    const userId = req.user.userId;
    return this.bookingsService.bookSeats(userId, dto);
  }

  @Get('my-bookings')
  @ApiBearerAuth()
   @Roles('user')
  @ApiOperation({ summary: 'Get bookings for the logged-in user' })
  @ApiResponse({ status: 200, description: 'Array of user bookings' })
  async getMyBookings(@Req() req: any) {
    const userId = req.user.userId;
    return this.bookingsService.getUserBookings(userId, userId);
  }

}