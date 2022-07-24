import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SanphamEntity } from './sanpham.entity';

@Injectable()
export class SanphamService extends TypeOrmCrudService<SanphamEntity>{
  constructor(
    @InjectRepository(SanphamEntity) repo,
    ) {
    super(repo);
  }

  
  async nhapkho(queryRunner = null, id, sl){
    const sanpham = await this.repo.findOne({
      where: {
        id: id
      }
    })
    return this.repo.createQueryBuilder('sp')
    .update(SanphamEntity, queryRunner)
    .set({ soluong: sanpham.soluong + sl })
    .where('id = :id', { id: id })
    .execute()

  }
}
