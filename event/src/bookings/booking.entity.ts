import { Program } from "src/program/program.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.bookings)
  user: User;

  @ManyToOne(() => Program, program => program.bookings)
  program: Program;

  @Column()
  seats: number; // 1 to 4

  @CreateDateColumn()
  createdAt: Date;
}