/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EventsGateway } from './events.wetways';

@Module({
  imports: [],
  controllers: [],
  providers: [EventsGateway],
})
export class EventsModuleModule {}
