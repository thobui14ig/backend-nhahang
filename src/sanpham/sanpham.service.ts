import { SanphamEntity } from './sanpham.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class SanphamService extends TypeOrmCrudService<SanphamEntity>{
  constructor(@InjectRepository(SanphamEntity) repo) {
    super(repo);
  }
}
