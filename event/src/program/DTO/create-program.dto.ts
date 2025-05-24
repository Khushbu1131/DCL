import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
export class CreateProgramDto {
  @ApiProperty({ example: 'AI Conference', description: 'The name of the program' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A conference discussing the future of AI.', description: 'Program description' })
  @IsString()
  description: string;

  @ApiProperty({ example: '2025-06-15T10:00:00Z', description: 'The date and time of the program in ISO format' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 100, description: 'Maximum number of participants allowed' })
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty({ example: "Dhaka, Bangladesh", description: "Program location" })
  @IsString()
  @IsNotEmpty()
  location: string;

  // For file upload, we'll handle via multipart – no validator here
  @ApiProperty({
    type: "string",
    format: "binary",
    description: "Optional program photo upload",
    required: false,
  })
  @IsOptional()
  photo?: any;
}
