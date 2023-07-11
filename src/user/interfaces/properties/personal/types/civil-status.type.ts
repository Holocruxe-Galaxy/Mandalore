export const civilStatus = [
  'SINGLE',
  'MARRIED',
  'WIDOWED',
  'DIVORCED',
  'PREFER-NOT-TO-SAY',
] as const;

export type CivilStatusType = (typeof civilStatus)[number];
