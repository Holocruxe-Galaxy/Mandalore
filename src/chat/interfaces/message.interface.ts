export interface Message {
  message: string;
  id?: string;
  seen?: boolean;
  isBroadcasted?: boolean;
}
