import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from './program.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { CreateProgramDto } from './DTO/create-program.dto';
import { UpdateProgramDto } from './DTO/update-program.dto';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly repo: Repository<Program>,
  ) {}

  async findUpcoming(): Promise<Program[]> {
    return this.repo.find({
      where: { date: MoreThan(new Date()) },
      order: { date: 'ASC' },
    });
  }

  async findPast(): Promise<Program[]> {
    return this.repo.find({
      where: { date: LessThan(new Date()) },
      order: { date: 'DESC' },
    });
  }

  async findByName(name: string): Promise<Program> {
    const p = await this.repo.findOne({ where: { name } });
    if (!p) throw new NotFoundException(`Program "${name}" not found`);
    return p;
  }

async create(createDto: CreateProgramDto) {
    const program = this.repo.create(createDto);
    return this.repo.save(program);
  }

  async findAll() {
    return this.repo.find();
  }
  async findOne(id: number) {
    const program = await this.repo.findOneBy({ id });
    if (!program) throw new NotFoundException('Program not found');
    return program;
  }
  async update(id: number, updateDto: UpdateProgramDto) {
    await this.repo.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const program = await this.findOne(id);
    return this.repo.remove(program);
  }

}
