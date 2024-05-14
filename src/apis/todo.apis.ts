import apiClient from ".";

export const getTodos = (token: string) => {
  try {
    const response = apiClient.get("/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const createTodo = (token: string, title: string) => {
  try {
    const response = apiClient.post(
      "/todos",
      {
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateTodo = (token: string, id: string, title: string, completed: boolean) => {
  try {
    const response = apiClient.put(
      `/todos/${id}`,
      {
        title,
        completed,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteTodo = (token: string, id: string) => {
  try {
    const response = apiClient.delete(`/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
