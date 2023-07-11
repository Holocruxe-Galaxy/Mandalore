export const role = ['USER', 'ADMIN', 'MOD'] as const;

export type RoleType = (typeof status)[number];
