import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { DanhmucService } from './danhmuc.service';
import { DanhmucEntity } from './danhmuc.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
@Crud({
  model: {
    type: DanhmucEntity,
  },
})
@Controller('danhmuc')
@ApiTags('danhmuc')
export class DanhmucController implements CrudController<DanhmucEntity> {
  constructor(public service: DanhmucService) {}


}
