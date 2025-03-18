import axios from 'axios';

// API URL
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Fetch tasks from the API
export const fetchTarefasFromApi = async (limit: number = 5) => {
  try {
    const response = await axios.get(`${API_URL}?_limit=${limit}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error fetching tasks from API:', error);
    return []; // Return an empty array on error
  }
};

// Fetch tasks from localStorage
export const fetchTarefasFromLocalStorage = (): any[] => {
  const storedTasks = localStorage.getItem('tarefas');
  return storedTasks ? JSON.parse(storedTasks) : []; // Return tasks from localStorage, or empty array if not found
};

// Combine tasks from API and localStorage and normalize the data
export const getCombinedTarefas = async (limit: number = 5): Promise<any[]> => {
  try {
    const tarefasFromApi = await fetchTarefasFromApi(limit);
    const tarefasFromLocalStorage = fetchTarefasFromLocalStorage();

    // Normalize both sources to have 'title' and 'completed' fields
    const normalizedApiTasks = tarefasFromApi.map((task: any) => ({
      nome: task.title,
      concluida: task.completed,
      id: task.id,
    }));

    const normalizedLocalStorageTasks = tarefasFromLocalStorage.map(
      (task: any) => ({
        nome: task.nome, // Normalize 'nome' to 'title'
        concluida: task.concluida, // Normalize 'concluida' to 'completed'
        id: task.id,
      })
    );

    // Combine and return both normalized sources
    return [...normalizedApiTasks, ...normalizedLocalStorageTasks];
  } catch (error) {
    console.error('Error combining tasks:', error);
    return []; // Return an empty array on error
  }
};
