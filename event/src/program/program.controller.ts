import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProgramService } from './program.service';
import { Program } from './program.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { CreateProgramDto } from './DTO/create-program.dto';
import { UpdateProgramDto } from './DTO/update-program.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@ApiTags('Programs')
@Controller('program')
export class ProgramController {
  constructor(private readonly service: ProgramService) {}
 @Get('upcoming')
  @ApiOperation({ summary: 'List upcoming programs' })
  @ApiResponse({ status: 200, description: 'Array of upcoming programs', type: [Program] })
  getUpcoming(): Promise<Program[]> {
    return this.service.findUpcoming();
  }

  // Public: past programs
  @Get('past')
  @ApiOperation({ summary: 'List past programs' })
  @ApiResponse({ status: 200, description: 'Array of past programs', type: [Program] })
  getPast(): Promise<Program[]> {
    return this.service.findPast();
  }

  // Public: get by name
  @Get(':name')
  @ApiParam({ name: 'name', description: 'Program name' })
  @ApiOperation({ summary: 'Get program details by name' })
  @ApiResponse({ status: 200, description: 'Program details', type: Program })
  getByName(@Param('name') name: string): Promise<Program> {
    return this.service.findByName(name);
  }

  // Public: get by ID
  @Get('id/:id')
  @ApiParam({ name: 'id', type: 'integer', description: 'Program ID' })
  @ApiOperation({ summary: 'Get program details by ID' })
  @ApiResponse({ status: 200, description: 'Program details', type: Program })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Program> {
    return this.service.findOne(id);
  }

  
  // Admin: get all
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('admin')
  @Get()
  @ApiOperation({ summary: 'List all programs (admin)' })
  @ApiResponse({ status: 200, description: 'Array of all programs', type: [Program] })
  findAll(): Promise<Program[]> {
    return this.service.findAll();
  }

  



  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor("photo", {
      storage: diskStorage({
        destination: "./uploads/programs",
        filename: (_, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
    })
  )
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Create a new program with photo[Admin]" })
  @ApiResponse({ status: 201, description: "Program created", type: Program })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string", example: "AI Conference" },
        description: {
          type: "string",
          example: "A conference discussing the future of AI.",
        },
        date: {
          type: "string",
          format: "date-time",
          example: "2025-06-15T10:00:00Z",
        },
        capacity: { type: "integer", example: 100 },
        location: { type: "string", example: "Dhaka, Bangladesh" },
        photo: { type: "string", format: "binary" }, // makes file picker appear
      },
      required: ["name", "description", "date", "capacity", "location"],
    },
  })
  create(
    @Body() dto: CreateProgramDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Program> {
    const photoUrl = file ? `/uploads/programs/${file.filename}` : undefined;
    return this.service.create({ ...dto, photo: photoUrl });
  }

  // Admin: update with file upload
  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor("photo", {
      storage: diskStorage({
        destination: "./uploads/programs",
        filename: (_, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
    })
  )
  @ApiParam({ name: "id", type: "integer", description: "Program ID" })
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Update a program [Admin]" })
  @ApiResponse({ status: 200, description: "Program updated", type: Program })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string", example: "AI Summit 2025" },
        description: {
          type: "string",
          example: "Updated description here",
        },
        date: {
          type: "string",
          format: "date-time",
          example: "2025-07-01T09:00:00Z",
        },
        capacity: { type: "integer", example: 150 },
        location: { type: "string", example: "New York, USA" },
        photo: { type: "string", format: "binary" }, // file picker
      },
      // partial update - no required array
    },
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateProgramDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Program> {
    const photoUrl = file ? `/uploads/programs/${file.filename}` : (dto as any).photo;
    return this.service.update(id, { ...dto, photo: photoUrl });
  }


   

  // Admin: delete
  @UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles('admin')
@Delete(':id')
@ApiParam({ name: 'id', type: 'integer', description: 'Program ID' })
@ApiOperation({ summary: 'Delete a program[Admin]' })
@ApiResponse({ status: 200, description: 'Program deleted' })
remove(@Param('id', ParseIntPipe) id: number): Promise<Program> {
  return this.service.remove(id);









  
}
}

  