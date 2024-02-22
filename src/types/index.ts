interface BoardInterface {
  name: string;
  id: string;
  columns: columnType[];
  createdBy: {
    ownerId: string;
    email: string;
    name: string;
    photoURL: string;
  };
  ownerId: string;
  collaborators: string[];
  collaboratorsData: {
    ownerId: string;
    email: string;
    name: string;
    photoURL: string;
  }[];
}
type columnType = {
  name: string;
  tasks: taskType[];
  dotColor: string;
};
type taskType = {
  title: string;
  status: number;
  description: string;
  subtasks: subtaskType[];
  completedCount: number;
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
  selectedTask?: taskType;
  currentBoard: BoardInterface;
}
interface TaskModalInterface {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  subtasks: subtaskType[];
  status: number;
  onEditClick: () => void;
  onDeleteClick: () => void;
  currentBoard: BoardInterface;
  selectedTask: taskType;
}

export type {
  BoardInterface,
  columnType,
  taskType,
  NewTaskModalInterface,
  TaskModalInterface,
  subtaskType,
};
