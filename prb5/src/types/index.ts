export interface Resource {
  id: number;
  name: string;
  type: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResourceFilters {
  type?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
