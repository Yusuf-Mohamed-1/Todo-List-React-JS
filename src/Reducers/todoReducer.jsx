import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodo, action) {
  const type = action.type;

  switch (type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        details: action.payload.newDetails,
        isCompleted: false,
      };
      const duplicateTodos = [...currentTodo, newTodo];

      localStorage.setItem("todos", JSON.stringify(duplicateTodos));

      return duplicateTodos;
    }
    case "delete": {
      const filteringTodos = currentTodo.filter((todo) => {
        return todo.id != action.payload.dialogTodo.id;
      });

      localStorage.setItem("todos", JSON.stringify(filteringTodos));

      return filteringTodos;
    }
    case "update": {
      const updateTodo = currentTodo.map((todo) => {
        if (todo.id == action.payload.dialogTodo.id) {
          return {
            ...todo,
            title: action.payload.dialogTodo.title,
            details: action.payload.dialogTodo.details,
          };
        } else {
          return todo;
        }
      });

      localStorage.setItem("todos", JSON.stringify(updateTodo));

      return updateTodo;
    }
    case "toggleCompleted": {
      const updateCompleted = currentTodo.map((t) => {
        if (t.id == action.payload.id) {
          const updatedTodo = {
            ...t,
            isCompleted: !t.isCompleted,
          };
          return updatedTodo;
        }
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(updateCompleted));

      return updateCompleted;
    }
    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];

      return storageTodos;
    }
    default: {
      throw Error("Unknown Action " + type);
    }
  }
}
