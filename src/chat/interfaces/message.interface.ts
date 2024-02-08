export interface Message {
  message: string;
  date: Date;
  id?: string;
  seen?: boolean;
  isAudio?: boolean;
  isBroadcasted?: boolean;
}
