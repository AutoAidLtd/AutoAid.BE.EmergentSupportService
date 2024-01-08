import { Inject, Injectable } from '@nestjs/common';
import {  } from '@nestjs/core';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets/decorators';
import { PrismaService } from '@secretlab/prisma';
import { SocketGateway } from '@secretlab/socket';


export class RealtimeGateway extends SocketGateway {

  constructor() {
    super()
  }

  @SubscribeMessage('message2')
  async handleMessage(client: any, payload: any): Promise<void> {
    client.emit("message2", "Hihi from message2");
  }
}
