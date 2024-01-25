
export interface GatewayResponse<T> {
  success: boolean,
  data?:T,
  message?:string
}
