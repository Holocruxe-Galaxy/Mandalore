export interface Root {
  createdAt: Date;
  deletedAt?: Date;
}

export interface TitledRoot extends Root {
  title: string;
}
