export const status = ['ACTIVE', 'INACTIVE', 'PENDING', 'BANNED'] as const;

export type StatusType = (typeof status)[number];
