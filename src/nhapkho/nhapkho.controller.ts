import { Body, Controller, Param, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { KhoEntity } from './nhapkho.entity';
import { KhoService } from './nhapkho.service';

import { ApiTags } from '@nestjs/swagger';
@Crud({
  model: {
    type: KhoEntity,
  },
})
@Controller('kho')
@ApiTags('kho')
export class KhoController implements CrudController<KhoEntity> {
  constructor(public service: KhoService) {}

  @Post('/nhapkho/:id')
  nhapkho(@Param('id') id: number,@Body() request: any){
    return this.service.nhapkho(id, request)
  }
}
