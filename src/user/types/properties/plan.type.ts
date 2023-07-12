export const plan = ['FREE', 'ADMIN', 'PREMIUM'] as const;

export type PlanType = (typeof status)[number];
