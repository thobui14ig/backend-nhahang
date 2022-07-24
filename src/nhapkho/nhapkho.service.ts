import { SanphamService } from './../sanpham/sanpham.service';
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DataSource } from 'typeorm';
import { KhoEntity } from './nhapkho.entity';

@Injectable()
export class KhoService extends TypeOrmCrudService<KhoEntity>{
  constructor(
    @InjectRepository(KhoEntity) repo,
    @InjectDataSource() readonly connection: DataSource,
    public sanphamService: SanphamService
    ) {
    super(repo);
  }

  async nhapkho(id: number, request: any){
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
        // execute some operations on this transaction:
        const kho = queryRunner.manager.create(KhoEntity, {
          sanphamId: id,
          soluong: +request.soluong
        })
        await queryRunner.manager.save(KhoEntity, kho)
        //tăng số lượng ở bảng sản phẩm
        await this.sanphamService.nhapkho(queryRunner, id, +request.soluong)
    
        // commit transaction now:
        await queryRunner.commitTransaction()
    } catch (err) {
        // since we have errors let's rollback changes we made
        await queryRunner.rollbackTransaction()
    } finally {
        // you need to release query runner which is manually created:
        await queryRunner.release()
    }




  }


}
