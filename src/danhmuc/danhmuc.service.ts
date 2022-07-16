import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DanhmucEntity } from './danhmuc.entity';

@Injectable()
export class DanhmucService extends TypeOrmCrudService<DanhmucEntity>{
  constructor(@InjectRepository(DanhmucEntity) repo) {
    super(repo);
  }
}
