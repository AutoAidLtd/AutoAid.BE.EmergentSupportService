export interface ChatChannelDto {
  channel_id: number;
  channel_name: string;
  created_date?: Date;
  updated_date?: Date;
  // message: Message[];
  participant: Participant[]
}
export   interface Participant {
    participant_id: number;
    channel_id: number;w
    user_id: number;
    joined_date?: Date;
    updated_date?: Date;
  }


