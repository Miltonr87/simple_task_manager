import axios from 'axios';
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasksFromApi = async (limit: number = 5) => {
  try {
    const response = await axios.get(`${API_URL}?_limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks from API:', error);
    return [];
  }
};

export const fetchTasksFromLocalStorage = (): any[] => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

export const getCombinedTasks = async (limit: number = 5): Promise<any[]> => {
  try {
    const tasksFromApi = await fetchTasksFromApi(limit);
    const tasksFromLocalStorage = fetchTasksFromLocalStorage();

    const normalizedApiTasks = tasksFromApi.map((task: any) => ({
      name: task.title,
      closed: task.completed,
      id: task.id,
    }));

    const normalizedLocalStorageTasks = tasksFromLocalStorage.map(
      (task: any) => ({
        name: task.name,
        closed: task.closed,
        id: task.id,
      })
    );

    return [...normalizedApiTasks, ...normalizedLocalStorageTasks];
  } catch (error) {
    console.error('Error combining tasks:', error);
    return [];
  }
};
