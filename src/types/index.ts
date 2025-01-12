export enum FilterType {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface RootState {
  tasks: {
    tasks: Task[];
    filter: FilterType;
  }
}