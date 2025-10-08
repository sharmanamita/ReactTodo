import { useEffect, useState } from "react";
import "./toDo.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { getDatabase, ref, onValue } from "firebase/database";
import cong from "../configuration";

export type TodoData = {
  id: string;
  value: string;
  checked: boolean;
}

const getLocalStorageData = () => {
  const todoData = localStorage.getItem("todo-tasks");
  if(!todoData) return [];
  return JSON.parse(todoData);
}

const ToDo = () => {
  
  const [tasks, setTasks] = useState<Array<TodoData>>(() => getLocalStorageData());
  const [dateTime, setDateTime] = useState("");

  // This code might create multiple intervals on each render, leading to performance issues/memory leaks.
  // setInterval(() => {
  //   const now = new Date();
  //   setDateTime(`${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`);
  // }, 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(`${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    // Initialize the Firebase database with the provided configuration
    const database = getDatabase(cong);
    
    // Reference to the specific collection in the database
    const collectionRef = ref(database, "todoreactapp-acd12");

    // Function to fetch data from the database
    const fetchData = () => {
      // Listen for changes in the collection
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        // Check if dataItem exists
        if (dataItem) {
          // Convert the object values into an array
          const displayItem = Object.values(dataItem);
          console.log("displayItem: ", displayItem);
          setTasks(displayItem as Array<TodoData>);
        }
      });
    };
    fetchData();
  }, []);

  

  const handleButtonSubmit = (value: string) => {
    if (tasks?.findIndex((item) => item.value === value) !== -1) {
      return;
    }
    setTasks((prev) => [...prev, {id: value, value: value, checked: false}]);
  };

  const handleDoneAction = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
    console.log(newTasks);
  }

  const handleDeleteAction = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  localStorage.setItem("todo-tasks", JSON.stringify(tasks));

  return (
    <div className="container">
      <h1>Todo List</h1>
      <h3>{dateTime}</h3>
      <TodoForm onTodoAdd={handleButtonSubmit} />
      <TodoList tasks={tasks} onDone={handleDoneAction} onDelete={handleDeleteAction}/>
      <button className="clear-all-btn" onClick={() => setTasks([])}>Clear All</button>
    </div>
  );
};

export default ToDo;
