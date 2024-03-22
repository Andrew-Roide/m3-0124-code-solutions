import { useEffect, useState } from 'react';

export type UnsavedTodo = {
  task: string;
  isCompleted: boolean;
};
export type Todo = UnsavedTodo & {
  todoId: number;
};

export type UseTodosValues = {
  isLoading: boolean;
  error?: unknown;
  todos?: Todo[];
  addTodo: (todo: UnsavedTodo) => Promise<void>;
  toggleCompleted: (todoId: number) => Promise<void>;
};
/**
 * Manages the Todos by reading from and writing to the backend API,
 * using the API functions below.
 */
export function useTodos(): UseTodosValues {
  const [todos, setTodos] = useState<Todo[]>();
  // const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function fetchAllTodos() {
      try {
        if (!todos) {
          const todosFromAPI = await readTodos();
          setTodos(todosFromAPI);
          // setIsLoading(false);
        }
      } catch (err) {
        setError(err);
      }
    }
    fetchAllTodos();
  }, [todos]);

  async function addTodo(newTodo: UnsavedTodo): Promise<void> {
    try {
      const newTodoItem = await createTodo(newTodo);
      setTodos([...todos, newTodoItem]);
    } catch (err) {
      setError(err);
    }
  }

  async function toggleCompleted(todoId: number): Promise<void> {
    try {
      if (!todos) {
        throw new Error(`Todo item with ID ${todoId} not found.`);
      }
      // Find the todo item being updated
      const todoToUpdate = todos.find((todo) => todo.todoId === todoId);

      if (!todoToUpdate) {
        throw new Error(`Todo item with ID ${todoId} not found.`);
      }

      todoToUpdate.isCompleted = !todoToUpdate.isCompleted;

      const newTodo = await updateTodo(todoToUpdate);
      const todoList = todos.map((oldTodo) =>
        oldTodo.todoId === newTodo.todoId ? newTodo : oldTodo
      );
      setTodos(todoList);
    } catch (err) {
      setError(err);
    }
  }
  return {
    isLoading: todos === undefined && error === undefined,
    error,
    todos,
    addTodo,
    toggleCompleted,
  };
}

/**
 * Reads all To Do items from the API.
 * @returns Promise that resolves with the read items.
 */
async function readTodos(): Promise<Todo[]> {
  const res = await fetch('/api/todos');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Creates a new To Do item using the API.
 * @param todo The To Do to create.
 * @returns Promise that resolves with the new item returned from the API.
 */
async function createTodo(todo: UnsavedTodo): Promise<Todo> {
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  };
  const res = await fetch('/api/todos', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Updates a To Do item using the API by setting its `isCompleted` state.
 * @param todo The To Do to update.
 * @returns Promise that resolves with the updated To Do item.
 */
async function updateTodo(todo: Todo): Promise<Todo> {
  const req = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isCompleted: todo.isCompleted }),
  };
  const res = await fetch(`/api/todos/${todo.todoId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
