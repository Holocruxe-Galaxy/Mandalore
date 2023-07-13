export const gender = [
  'MALE',
  'FEMALE',
  'NON-BINARY',
  'OTHER',
  'PREFER-NOT-TO-SAY',
] as const;

export type GenderType = (typeof gender)[number];
