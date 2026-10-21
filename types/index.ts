export interface TestCaseData {
  id: number;
  name: string;
  description: string;
  project: string;
  column: string;
  taskTitle: string;
  tags: string[];
}

export interface AuthData {
  username: string;
  password: string;
}
