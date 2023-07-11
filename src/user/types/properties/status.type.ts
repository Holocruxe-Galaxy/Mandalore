export const status = ['COMPLETE', 'INACTIVE', 'PENDING', 'BANNED'] as const;

export type StatusType = (typeof status)[number];
