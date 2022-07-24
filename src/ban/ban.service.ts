import { BanEntity } from './ban.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class BanService extends TypeOrmCrudService<BanEntity>{
  constructor(@InjectRepository(BanEntity) repo) {
    super(repo);
  }

}
