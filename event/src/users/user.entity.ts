import { Booking } from "src/bookings/booking.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export type UserRole = 'user' | 'admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', default: 'user' })
  role: UserRole;

  @OneToMany(() => Booking, booking => booking.user)
bookings: Booking[];
}