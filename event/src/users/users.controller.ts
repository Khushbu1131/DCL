import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController { 
   @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('admin')
  @Get('admin')
  @ApiOperation({ summary: 'Admin test endpoint' })
  @ApiResponse({ status: 200, description: 'Hello Admin!' })
  getAdminData() {
    return { message: 'Hello Admin!' };
  }

  // User profile endpoint
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Hello User!' })
  getProfile() {
    return { message: 'Hello User!' };
  }
 }
