import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Tracking } from './entities/tracking.entity';

@Injectable()
export class TrackingService {
  constructor(@InjectDataSource() readonly dataSource: DataSource) {

  }
  create(createTrackingDto) {
    const data = this.dataSource.getRepository(Tracking).create(createTrackingDto);
    return this.dataSource.getRepository(Tracking).save(data);
  }
}
