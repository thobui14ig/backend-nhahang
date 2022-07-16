import { SanphamService } from './sanpham.service';
import { SanphamEntity } from './sanpham.entity';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
@Crud({
  model: {
    type: SanphamEntity,
  },
})
@Controller('sanpham')
@ApiTags('sanpham')
export class SanphamController implements CrudController<SanphamEntity> {
  constructor(public service: SanphamService) {}


}
