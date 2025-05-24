import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './DTO/create-user.dto';
@Injectable()
export class UsersService {constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(data: CreateUserDto): Promise<User> {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(data.password, salt);
  const user = this.repo.create({ ...data, password: hash });
  return this.repo.save(user);
}
  async findByEmail(email: string): Promise<User | undefined> {
  const user = await this.repo.findOne({ where: { email } });
  return user ?? undefined;
}

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
  async findById(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
