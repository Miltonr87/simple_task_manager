# Simple Task Manager

### About

This project is a simple task manager built with **TypeScript**, **ReactJS**, **Bootstrap**, and **Axios**. It uses the **Context API** for managing the data flow across components. It provides basic CRUD functionality for managing tasks (Create, Read, Update, Delete), allows you to mark tasks as completed, and includes a search bar to filter tasks.

[X] Desktop version - Live: https://simple-task-manager-eta.vercel.app/

### Codebase

```
src/
│
├── actions/
│ ├── CloseTask.js # Action to close a task
│ ├── DeleteTask.js # Action to delete a task
│ ├── OrderTasks.js # Action to order tasks
│ ├── PaginateTasks.js # Action to paginate tasks
│
├── pages/
│ ├── TaskCreation.js # Page for creating tasks
│ ├── TaskList.js # Page for displaying tasks in a list
│ ├── TaskUpdate.js # Page for updating tasks
│
├── services/
│ ├── TaskService.js # Service to fetch the API, save, and manage tasks on LocalStorage
│
├── types/
│ ├── Task.js # Type definition

```

### CRUD Operations and Additional Features

This application supports basic CRUD operations on tasks:

1. **Create Task**:

- Users can create a new task through the `TaskCreation` page. This adds a task to the task list and saves it to LocalStorage.

2. **Read Tasks**:

- Tasks are fetched from `https://jsonplaceholder.typicode.com/todos` and displayed in the `TaskList` page. Tasks are also retrieved from LocalStorage and displayed after the user creates them.

3. **Update Task**:

- Tasks can be edited via the `TaskUpdate` page. This allows the user to modify a task's properties, such as its title or completion status.

4. **Delete Task**:

- Tasks can be deleted from the list using the `DeleteTask` action, which removes the task from both the UI and LocalStorage.

5. **Search Bar**:

- The `TaskList` page includes a search bar that allows users to filter tasks by their title. This provides a quick way to find tasks in a long list.

6. **Mark Task**:

- Each task in the list has a button to mark it as completed. Clicking the button will toggle the task's `completed` status and update the UI accordingly.

7. **Pagination**:

- Pagination added along with a simple sorting system that sorts from the first task to the last and vice versa.

### Getting Started

- Clone the repo (HTTP Protocol): `git clone https://github.com/Miltonr87/simple_task_manager.git`
- Use NPM or Yarn to install the React app and run the project on your computer.

### Required

As you see, **Simple Task Manager** runs on [Node.js](https://nodejs.org/), so before you can continue, please ensure that you have it installed with NPM or Yarn. Once you have Node installed, you will need the React (18) library. So, to start the project in your machine, open your terminal inside the Simple Task Manager folder and type "NPM Install" or "Yarn Install".

### Clone the repository

```bash
git clone https://github.com/your-repo/simple-task-manager.git
cd simple-task-manager
```
