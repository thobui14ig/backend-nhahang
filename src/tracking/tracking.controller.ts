import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  create(@Body() createTrackingDto) {
    return this.trackingService.create(createTrackingDto);
  }
}
