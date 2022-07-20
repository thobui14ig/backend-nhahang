import { SanphamEntity } from './sanpham.entity';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class SanphamService extends TypeOrmCrudService<SanphamEntity>{
  constructor(
    @InjectRepository(SanphamEntity) repo,
    @InjectConnection() readonly connection: Connection,
    ) {
    super(repo);
  }

  
  async themsanpham(queryRunner){


    const data = await this.repo
    .createQueryBuilder('order_record', queryRunner)
    .insert()
    .values(
      {
        name: 'ádasd',
        gia:'20000',
        danhmucId: 1
      })
    .execute();
    throw new Error();

  }
}
