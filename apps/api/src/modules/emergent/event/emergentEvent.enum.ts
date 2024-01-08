export const EmergentReceiveEvent =  {
  userSendRequest : "SEND_REQUEST_EMERGENT",
  garageApproveRequest : "GARAGE_APPROVE_REQUEST",
  garageInitSupport : "GARAGE_INIT_SUPPORT",
  garageUpdateLocation: "GARAGE_UPDATE_LOCATION",
  userUpdateLocation: "USER_UPDATE_LOCATION"
}

export const EmergentEmitEvent = {
  newRequestToGarage: "GARAGE_NEW_REQUEST",
  userRequestHandled : "USER_REQUEST_HANDLED",
  garageInRoomUpdateLocation : "GARAGE_INROOM_UPDATE_LOCATION",
  userInRoomUpdateLocation : "USER_INROOM_UPDATE_LOCATION",
  garageInRoomStartSupport: "GARAGE_START_SUPPORT",
  garageApproveRequest : "GARAGE_APPROVE_REQUEST"
}
