const step = ['contactInfo', 'personal'] as const;

export type StepType = (typeof step)[number];
