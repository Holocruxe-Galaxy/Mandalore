export const educationLevel = [
  'ELEMENTARY_SCHOOL',
  'MIDDLE_SCHOOL',
  'HIGH_SCHOOL',
  'COLLEGE',
] as const;

export type EducationLevelType = (typeof educationLevel)[number];
