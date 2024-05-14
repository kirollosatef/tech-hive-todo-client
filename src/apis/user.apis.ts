import apiClient from ".";

// login function
export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/users/login", {
      email,
      password,
    });
    return response;
  } catch (error) {
    return error;
  }
};

// register function
export const register = async (email: string, password: string, name: string) => {
  try {
    const response = await apiClient.post("/users/register", {
      email,
      password,
      name,
    });
    return response;
  } catch (error) {
    return error;
  }
};
