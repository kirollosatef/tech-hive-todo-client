import React, { memo, useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { Navigation } from "../types";
import { clearStorage, getKey } from "../utils/secureStorage";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../apis/todo.apis";

type Props = {
  navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const tokenData: any = await getKey("token");
      const userData: any = await getKey("userName");
      setToken(tokenData);
      setUser(userData);
    };
    getToken();
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      if (token) {
        const response: any = await getTodos(token);
        setTodos(response.data);
      }
    };
    fetchTodos();
  }, [token]);

  const handleAddTodo = async () => {
    if (newTodoTitle.trim()) {
      const response: any = await createTodo(token, newTodoTitle);
      setTodos([...todos, response.data]);
      setNewTodoTitle("");
    }
  };

  const handleUpdateTodo = async (id: string, title: string, completed: boolean) => {
    const response: any = await updateTodo(token, id, title, completed);
    setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(token, id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Background>
      <Logo />
      <Header>Hello {user}</Header>
      <Paragraph>Let's get some tasks done ;)</Paragraph>

      <TextInput placeholder="New Todo" value={newTodoTitle} onChangeText={setNewTodoTitle} />

      <Button mode="contained" onPress={handleAddTodo}>
        Add Todo
      </Button>

      <FlatList
        data={todos}
        keyExtractor={(item: { id: string; title: string; completed: boolean }) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem} key={item.id}>
            <Text
              style={!item.completed ? styles.todoText : styles.todoTextCompleted}
              onPress={() => handleUpdateTodo(item.id, item.title, !item.completed)}
            >
              {item.title}
            </Text>
            <Button mode="text" onPress={() => handleDeleteTodo(item.id)}>
              Delete
            </Button>
          </View>
        )}
      />

      <Button
        mode="outlined"
        onPress={async () => {
          await clearStorage();
          navigation.navigate("HomeScreen");
        }}
      >
        Logout
      </Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "black",
  },
  todoText: {
    fontSize: 16,
    color: "white",
  },
  todoTextCompleted: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#ccc",
  },
});

export default memo(Dashboard);
