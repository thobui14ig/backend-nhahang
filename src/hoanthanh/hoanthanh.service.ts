import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import dayjs from 'dayjs';
import { HoantatEntity } from './hoanthanh.entity';

@Injectable()
export class HoantatService extends TypeOrmCrudService<HoantatEntity>{
  constructor(@InjectRepository(HoantatEntity) repo) {
    super(repo);
  }


  async getDoanhthungay(){
    const curentDay = new Date();
    const dayFomart = curentDay.getFullYear() + "/" + (curentDay.getMonth() + 1) + "/" + curentDay.getDate();
    const data = await this.repo
    .createQueryBuilder('ht')
    .select('ht.tongtien')
    .where('ht.ngaytao between :a and :b', { a: `${dayFomart} 00:00:00`, b: `${dayFomart} 23:59:59` })
    .getMany();

    const total = this.getTotal(data)
    return total;
    
  }

  async getDoanhthuthang(n){
    const data = await this.repo
    .createQueryBuilder('ht')
    .select('ht.tongtien')
    .where(`ht.ngaytao between :a and :b`, { a: `2022/${n.n}/01 00:00:00`, b: `2022/${n.n}/31 23:59:59` })
    .getMany();

    const total = this.getTotal(data)
    return total;
  }

  async getDoanhthutuan(param){
    let { start, end } = param
    start = this.formatDay(start)
    end = this.formatDay(end)
    const data = await this.repo
    .createQueryBuilder('ht')
    .select('ht.tongtien')
    .where('ht.ngaytao between :a and :b', { a: `${start} 00:00:00`, b: `${end} 23:59:59` })
    .getMany();

    const total = this.getTotal(data)
    return total;
  }
  
  formatDay (day){
    const curentDay = new Date(day);
    return curentDay.getFullYear() + "/" + (curentDay.getMonth() + 1) + "/" + curentDay.getDate();
  }
  
  getTotal(data){
    return data.reduce((value = 0, item) => {
        return value + +item.tongtien 
    }, 0)
  }




  
}
