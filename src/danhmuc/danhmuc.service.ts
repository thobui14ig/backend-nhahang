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





// async createDanhmuc(request){
//   const queryRunner = this.connection.createQueryRunner();
//   await queryRunner.connect();
//   await queryRunner.startTransaction();

//   try {
//     const data = await queryRunner.manager.create(DanhmucEntity, request)
//     await queryRunner.manager.save(DanhmucEntity, data)
//     await this.sanphamService.themsanpham(queryRunner);
//     await queryRunner.commitTransaction();
//   } catch (error) {
//     await queryRunner.rollbackTransaction();
//     throw new InternalServerErrorException();
//   } finally {
//     await queryRunner.release();
//   }
//   // @InjectConnection() readonly connection: Connection,
  
// }
