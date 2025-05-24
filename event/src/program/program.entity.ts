import { Booking } from "src/bookings/booking.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  date: Date;

  @Column()
  capacity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

@Column()
  location: string;              

  @Column({ nullable: true })
  photo: string;  


  @OneToMany(() => Booking, booking => booking.program)
bookings: Booking[];
}
