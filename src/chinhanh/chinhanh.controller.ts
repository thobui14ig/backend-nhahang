import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ChinhanhEntity } from './chinhanh.entity';
import { ChinhanhService } from './chinhanh.service';

import { ApiTags } from '@nestjs/swagger';
@Crud({
  model: {
    type: ChinhanhEntity,
  },
})
@Controller('chinhanh')
@ApiTags('chinhanh')
export class ChinhanhController implements CrudController<ChinhanhEntity> {
  constructor(public service: ChinhanhService) {}


}
