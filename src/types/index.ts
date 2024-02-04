interface BoardInterface {
  name: string;
  id: string;
  columns: columnType[];
}
type columnType = {
  name: string;
  tasks: taskType[];
};
type taskType = {
  title: string;
  status: string;
  description: string;
  subtasks: subtaskType[];
};
type subtaskType = {
  isCompleted: boolean;
  description: string;
};

interface NewTaskModalInterface {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonLabel: string;
  taskTitle?: string;
  description?: string;
  subtasks?: { title: string; isCompleted: boolean }[];
  status?: string;
  columns: any;
  board_id: string;
}

interface TaskModalInterface {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  subtasks: { title: string; isCompleted: boolean }[];
  status: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export type {
  BoardInterface,
  columnType,
  taskType,
  NewTaskModalInterface,
  TaskModalInterface,
};
