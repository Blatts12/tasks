//TASK

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export enum TaskSort {
  DONE_DESC = "DONE_DESC",
  DONE_ASC = "DONE_ASC",
  ID_DESC = "ID_DESC",
  ID_ASC = "ID_ASC",
}
