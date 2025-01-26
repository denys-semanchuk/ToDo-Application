export enum FilterType {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  IMPORTANT = 'IMPORTANT'
}

export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC'
}
export interface Task {
  id: number;
  text: string;
  completed: boolean;
  timestamp: number;
  important: boolean;
}

export interface RootState {
  tasks: {
    tasks: Task[];
    filter: FilterType;
    sort: SortType;
  }
}