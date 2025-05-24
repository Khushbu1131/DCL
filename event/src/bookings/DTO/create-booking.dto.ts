import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Max, Min } from "class-validator";
export class CreateBookingDto {
  @ApiProperty({ example: 1, description: 'The ID of the program to book' })
  @IsInt()
  programId: number;

  @ApiProperty({ example: 2, description: 'Number of seats to book (1 to 4)' })
  @IsInt()
  @Min(1)
  @Max(4)
  seats: number;
}
