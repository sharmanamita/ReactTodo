import React, { useState } from "react";
import "./toDo.css";

interface TodoFormProps {
  onTodoAdd: (todo: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onTodoAdd }) => {
  const [inputValue, setInputValue] = useState("");
  
  const handleInputChange = (value:string) => {
    setInputValue(value);
  }

  const handleButtonSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();// to prevent refreshing of page on submit
    if (!inputValue) return;

    if (inputValue.trim() === "") {
      return;
    }
    onTodoAdd(inputValue);
    setInputValue("");
  }
  
  
  return (
    <form className="input-container" onSubmit={(e) => handleButtonSubmit(e)}>
      <input
        type="text"
        value={inputValue}
        className="todo-input"
        autoComplete="off"
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <button type="submit" className="todo-button">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;