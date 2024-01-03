import { Inject } from '@nestjs/common';
import { } from '@nestjs/core';
import { ConnectedSocket, SubscribeMessage } from '@nestjs/websockets';
import { SocketGateway } from '@secretlab/socket';
import { AccomodationService } from 'accomodation/accomodation.service';
import { EmergentRequestDto } from '../dto/EmergentRequestDto';
import { Coordinate } from 'modules/garage/dto/coordinate.dto';

export class EmergentGateway extends SocketGateway {

  constructor() {
    super()
  }

  @SubscribeMessage('SEND_REQUEST_EMERGENT')
  async handleRequestSend(client: any, payload: [EmergentRequestDto,...any]): Promise<void> {
    console.log("hi");
    console.log("payload ", payload);
    // 1.Validate & Persist request
    // 2.Find all garages nearby the request location

    // 3. Send request information to those garages
    // 4. Send request owner result to notify

    client.emit("SEND_REQUEST_HANDLED", "Hihi from SEND_REQUEST")
    client.emit("SEND_REQUEST_HANDLED",)

  }
  @SubscribeMessage('GARAGE_APPROVE_REQUEST')
  async handleGarageApproveRequest(client: any, payload : [any, ...any]):Promise<void>{
    // 1. get persisted request, check if any garage approved yet
    // 2. If yes -> return  ,if no -> update and persist that request
    // 3. join room
    // 4. send information of each other for all in room
  }
  @SubscribeMessage('GARAGE_APPROVE_REQUEST')
  async garageInitEmergentRequest(client: any, payload : [any, ...any]):Promise<void>{
    // 1. get persisted request, check if any garage approved yet
    // 2. If yes -> return  ,if no -> update and persist that request
    // 3. join room
    // 4. send information of each other for all in room
  }

  @SubscribeMessage('GARAGE_UPDATE_LOCATION')
  async garageUpdateLocation(@ConnectedSocket() client, payload : [Coordinate, ...any]):Promise<void>{
    // 1. get room of garage
    // 2. emit location info to room
  }

  @SubscribeMessage('USER_UPDATE_LOCATION')
  async userUpdateLocation(@ConnectedSocket() client, payload : [Coordinate, ...any]):Promise<void>{
    // 1. get room of user
    // 2. emit location info to room
  }
}
