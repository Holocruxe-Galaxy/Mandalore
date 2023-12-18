export interface Message {
  message: string;
  id?: string;
  seen?: boolean;
  isAudio?: boolean;
  isBroadcasted?: boolean;
}
