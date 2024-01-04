import { TitledRoot } from '.';

export interface Step {
  name: string;
  done: boolean;
}

export interface Task extends TitledRoot {
  steps: Step[];
}
