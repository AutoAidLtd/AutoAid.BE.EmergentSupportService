import { Inject, Injectable } from '@nestjs/common';
import {  } from '@nestjs/core';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets/decorators';
import { PrismaService } from '@secretlab/prisma';
import { SocketGateway } from '@secretlab/socket';
import { GarageService } from 'modules/garage/service/garage.service';

@WebSocketGateway()
export class RealtimeGateway {

  constructor(@Inject(GarageService) private garageService:GarageService) {
    // super()
  }

  @SubscribeMessage('message2')
  async handleMessage(client: any, payload: any): Promise<void> {
    // console.log({gs: });
    client.emit("message2", await this.garageService.getNearbyGarages({lat: 10.2, lng:26}));

  }
}
