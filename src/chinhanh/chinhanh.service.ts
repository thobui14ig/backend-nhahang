import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ChinhanhEntity } from './chinhanh.entity';

@Injectable()
export class ChinhanhService extends TypeOrmCrudService<ChinhanhEntity>{
  constructor(
    @InjectRepository(ChinhanhEntity) repo,
    ) {
    super(repo);
  }
}
