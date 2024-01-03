export const status = ['COMPLETE', 'INACTIVE', 'PENDING', 'BANNED'/* , 'SUSPENDED' */] as const;

export type StatusType = (typeof status)[number];
