import { Inject } from '@nestjs/common';
import { } from '@nestjs/core';
import { ConnectedSocket, SubscribeMessage } from '@nestjs/websockets';
import { SocketGateway } from '@secretlab/socket';
import { EmergentRequestDto } from '../dto/EmergentRequestDto';
import { Coordinate } from 'modules/garage/dto/coordinate.dto';
import { EmergentReceiveEvent } from '../event/emergentEvent.enum';
import { EmergentService } from '../service/emergent.service';

export class EmergentGateway extends SocketGateway {

  constructor(private readonly emergentRequestService: EmergentService) {
    super()
  }

  @SubscribeMessage(EmergentReceiveEvent.userSendRequest)
  async handleRequestSend(client: any, payload: [EmergentRequestDto,...any]): Promise<void> {
    console.log("hi");
    console.log("payload ", payload);
    // 1.Validate & Persist request
    //TODO: validate request
    const request = await this.emergentRequestService.saveData(payload[0])
    // 2.Find all garages nearby the request location

    // 3. Send request information to those garages
    // 4. Send request owner result to notify

    client.emit("SEND_REQUEST_HANDLED", "Hihi from SEND_REQUEST")
    client.emit("SEND_REQUEST_HANDLED",)

  }
  @SubscribeMessage(EmergentReceiveEvent.garageApproveRequest)
  async handleGarageApproveRequest(client: any, payload : [any, ...any]):Promise<void>{
    // 1. get persisted request, check if any garage has approved yet
    // 2. If yes -> return  ,if no -> update and persist that request
    // 3. join room
    // 4. send information of each other to room
  }
  @SubscribeMessage(EmergentReceiveEvent.garageInitSupport)
  async garageInitEmergentRequest(client: any, payload : [any, ...any]):Promise<void>{
    // Implement later
  }

  @SubscribeMessage(EmergentReceiveEvent.garageUpdateLocation)
  async garageUpdateLocation(@ConnectedSocket() client, payload : [Coordinate, ...any]):Promise<void>{
    // 1. get room of garage
    // 2. emit location info to room
  }

  @SubscribeMessage(EmergentReceiveEvent.userSendRequest)
  async userUpdateLocation(@ConnectedSocket() client, payload : [Coordinate, ...any]):Promise<void>{
    // 1. get room of user
    // 2. emit location info to room
  }
}
