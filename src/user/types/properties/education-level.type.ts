export const gender = [
  'ELEMENTARY_SCHOOL',
  'MIDDLE_SCHOOL',
  'HIGH_SCHOOL',
  'COLLEGE',
] as const;

export type GenderType = (typeof gender)[number];
