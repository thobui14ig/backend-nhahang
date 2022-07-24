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

  //nhập kho
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

  //giảm số lượng khi mua một sản phẩm
  async subProduct(id: number, sl: number, queryRunner){
    const sanpham = await this.repo.findOne({
      where:{
        id: id
      }
    })
    if(sanpham){
      if(sanpham.soluong <= 0){
        throw new Error('Hết hàng!')
      }else{
        sanpham.soluong = sanpham.soluong - sl
        return queryRunner.manager.save(SanphamEntity, sanpham)        
      }

    }else{
      throw new Error('Không tìm thấy sản phẩm!')
    }
  }
}
