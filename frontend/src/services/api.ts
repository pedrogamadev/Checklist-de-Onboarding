export type Task = {
  id: number;
  title: string;
  done: boolean;
};

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Erro ao comunicar com a API.");
  }
  return (await response.json()) as T;
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${apiUrl}/tasks`);
  return handleResponse<Task[]>(response);
};

export const createTask = async (title: string): Promise<Task> => {
  const response = await fetch(`${apiUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  return handleResponse<Task>(response);
};

export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${apiUrl}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Erro ao excluir a task.");
  }
};
