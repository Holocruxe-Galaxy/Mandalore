export const status = ['ACTIVE', 'INACTIVE', 'BANNED'] as const;

export type StatusType = (typeof status)[number];
