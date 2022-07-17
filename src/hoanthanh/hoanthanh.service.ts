import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { HoantatEntity } from './hoanthanh.entity';

@Injectable()
export class HoantatService extends TypeOrmCrudService<HoantatEntity>{
  constructor(@InjectRepository(HoantatEntity) repo) {
    super(repo);
  }

}
