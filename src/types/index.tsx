class Task {
  id: number;
  name: string;
  closed: boolean;

  constructor(id: number, name: string, closed: boolean) {
    this.id = id;
    this.name = name;
    this.closed = closed;
  }
}

export default Task;
