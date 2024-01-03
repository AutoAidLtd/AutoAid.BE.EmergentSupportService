import { Inject, Injectable } from '@nestjs/common';
import {  } from '@nestjs/core';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets/decorators';
import { PrismaService } from '@secretlab/prisma';
import { SocketGateway } from '@secretlab/socket';
import { AccomodationService } from 'accomodation/accomodation.service';

export class RealtimeGateway extends SocketGateway {

  constructor(@Inject(AccomodationService) private accoService:AccomodationService ) {
    super()
  }

  @SubscribeMessage('message2')
  async handleMessage(client: any, payload: any): Promise<void> {
    client.emit("message2", "Hihi from message2");
    client.emit("message2",await this.accoService.getAll());
  }
}
