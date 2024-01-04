export const generalInterests = [
  'SPORTS',
  'MUSIC',
  'ART',
  'GAMES',
  'SALTY',
  'SWEET',
  'TRAVEL',
  'PHOTOGRAPHY',
  'FITNESS',
  'TRENDING & BEAUTY',
  'MOVIES & SERIES',
  'SCIENCE',
  'MINDFULNESS & MEDITATION',
  'ASTRONOMY',
  'ECOLOGY',
  'UPBRINGING',
  'PSYCHOLOGY',
] as const;

export type GeneralInterestsType = (typeof generalInterests)[number];
