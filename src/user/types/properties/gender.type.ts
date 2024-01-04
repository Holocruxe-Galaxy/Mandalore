export const gender = ['MALE', 'FEMALE', 'OTHER', 'PREFER-NOT-TO-SAY'] as const;

export type GenderType = (typeof gender)[number];
