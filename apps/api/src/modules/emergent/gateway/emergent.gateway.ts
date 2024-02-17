import { Inject, Injectable, Logger } from "@nestjs/common";
import {} from "@nestjs/core";
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { SocketGateway, Socket } from "@secretlab/socket";
import { EmergentRequestDto } from "../dto/EmergentRequestDto";
import { Coordinate } from "modules/garage/dto/coordinate.dto";
import {
  EmergentEmitEvent,
  EmergentReceiveEvent,
} from "../event/emergentEvent.enum";
import { EmergentService } from "../service/emergent.service";
import { GarageService } from "modules/garage/service/garage.service";
import { calculateDistance } from "modules/garage/utils";
import { Pageable } from "@secretlab/core";

@WebSocketGateway({cors: {
  origin: ["http://localhost:5173"],
  allowedHeaders: "*",
  methods: "*"
}})
export class EmergentGateway  {
  private readonly logger = new Logger(EmergentGateway.name);

  constructor(@Inject(GarageService) private garageService:GarageService,@Inject(EmergentService) private readonly emergentRequestService: EmergentService ) {


    // super()
  }


  @SubscribeMessage(EmergentReceiveEvent.userSendRequest)
  async handleRequestSend(
    client: Socket,
    payload: EmergentRequestDto
  ): Promise<void> {
    // 1.Validate & Persist request
    //TODO: validate request
    payload.customer_id = client.user?.account_id

    const request = await this.emergentRequestService.saveRequest(payload);

    client.join(request.room_uid);
    // 2.Find all garages nearby the request location
    const nearbyGarages = await this.garageService.getNearbyGarages(payload.location);
    console.log({nearbyGarages});

    // 3. Send request information to those garages
    nearbyGarages.forEach(async (garage) => {
      //emit to all garage
      request.distance = calculateDistance(garage.place, request.location)
      await client.join(garage.owner_id.toString())
      client
        .to(garage.owner_id.toString())
        .emit(EmergentEmitEvent.newRequestToGarage, request);
      client.leave(garage.owner_id.toString())
    });

    // 4. Send request owner result to notify
    client.emit(EmergentEmitEvent.userRequestHandled, "request has been sent");
  }
  @SubscribeMessage(EmergentReceiveEvent.garageApproveRequest)
  async handleGarageApproveRequest(
    client: Socket,
    { garage_id, request_uid }: { garage_id: number; request_uid: string }
  ): Promise<void> {
    // 1. get persisted request, check if any garage has approved yet
    const persistedRequest = await this.emergentRequestService.getRequestByUid(
      request_uid
    );
    // 2. If yes -> return  ,if no -> update and persist that request
    if (persistedRequest && !persistedRequest.garage_id) {
      this.emergentRequestService.updateGarageHandleRequest(
        persistedRequest.no,
        garage_id
      );
    }
    // 3. join room
    client.join(persistedRequest.room_uid);
    // 4. send information of each other to room
    client.emit(EmergentEmitEvent.garageApproveRequest, persistedRequest);
    client
      .in(persistedRequest.room_uid)
      .emit(EmergentEmitEvent.garageApproveRequest, persistedRequest);
  }
  @SubscribeMessage(EmergentReceiveEvent.garageInitSupport)
  async garageInitEmergentRequest(
    client: any,
    payload: [any, ...any]
  ): Promise<void> {
    // Implement later
  }

  @SubscribeMessage(EmergentReceiveEvent.garageUpdateLocation)
  async garageUpdateLocation(
    client: Socket,
    { coor, requestUid }: { requestUid: string; coor: Coordinate }
  ): Promise<void> {
    // 1. get room of garage
    const request = await this.emergentRequestService.getRequestByUid(
      requestUid
    );
    // 2. emit location info to room
    if (request) {
      client
        .in(request.room_uid)
        .emit(EmergentEmitEvent.garageInRoomUpdateLocation, coor);
    }
  }

  @SubscribeMessage(EmergentReceiveEvent.userUpdateLocation)
  async userUpdateLocation(
    client: Socket,
    { coor, requestUid }: { requestUid: string; coor: Coordinate }
  ): Promise<void> {
    // 1. get room of user
    const request = await this.emergentRequestService.getRequestByUid(
      requestUid
    );
    // 2. emit location info to room
    if (request) {
      client
        .in(request.room_uid)
        .emit(EmergentEmitEvent.garageInRoomUpdateLocation, coor);
    }
  }
  @SubscribeMessage("GARAGE_ADMIN_LIST")
  public async getList(client: Socket, paging: Pageable) {
    client.emit("GARAGE_ADMIN_LIST",await this.garageService.getList(paging))
  }
}
