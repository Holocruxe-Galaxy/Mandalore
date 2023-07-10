const step = ['contactInfo', 'location', 'personal'] as const;

export type StepType = (typeof step)[number];
