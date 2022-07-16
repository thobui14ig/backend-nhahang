import { BanEntity } from './ban.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class BanService extends TypeOrmCrudService<BanEntity>{
  constructor(@InjectRepository(BanEntity) repo) {
    super(repo);
  }

  async add(){
    for(let i = 1; i <= 50; i++){
      const obj = new BanEntity();
      obj.name = `Bàn ${i}`;
      const data = await this.repo.create(obj)
      await this.repo.save(data)
    }

    return 1;
  }
}
