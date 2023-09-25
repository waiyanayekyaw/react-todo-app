import { useCallback, useEffect, useState } from "react";
import "./App.css";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining";
import ClearCompletedBtn from "./components/ClearCompletedBtn";
import TodoFilters from "./components/TodoFilters";
import TodoForm from "./components/TodoForm.js";
import TodoList from "./components/TodoList";

function App() {
    let [todos, setTodos] = useState([]);
    let [filterTodos, setfilterTodos] = useState(todos);

    useEffect(() => {
        fetch("http://localhost:3001/todos")
            .then((res) => res.json())
            .then((todos) => {
                setTodos(todos);
                setfilterTodos(todos);
            });
    }, []);

    let addTodo = (todo) => {
        // server side
        fetch("http://localhost:3001/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });

        // client side
        setTodos((prevState) => [...prevState, todo]);
    };

    let deleteTodo = (todoId) => {
        //server side
        fetch(`http://localhost:3001/todos/${todoId}`, {
            method: "DELETE",
        });
        //client side
        setTodos((prevState) => {
            return prevState.filter((todo) => {
                return todo.id !== todoId;
            });
        });
    };

    let updateTodo = (todo) => {
        //server side
        fetch(`http://localhost:3001/todos/${todo.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });
        //client side
        setTodos((prevState) => {
            return prevState.map((t) => {
                if (t.id == todo.id) {
                    return todo;
                }
                return t;
            });
        });
    };

    let checkAll = () => {
        //server side
        todos.forEach((t) => {
            t.completed = true;
            updateTodo(t);
        });
        //client side
        setTodos((prevState) => {
            return prevState.map((t) => {
                return { ...t, completed: true };
            });
        });
    };

    let remainingCount = todos.filter((t) => !t.completed).length;

    let filterBy = useCallback(
        (filter) => {
            if (filter == "All") {
                setfilterTodos(todos);
            }
            if (filter == "Active") {
                setfilterTodos(todos.filter((t) => !t.completed));
            }
            if (filter == "Completed") {
                setfilterTodos(todos.filter((t) => t.completed));
            }
        },
        [todos]
    );

    let clearCompleted = () => {
        //server side
        todos.forEach((t) => {
            if (t.completed) {
                deleteTodo(t.id);
            }
        });
        //client side
        setTodos((prevState) => {
            return prevState.filter((t) => !t.completed);
        });
    };

    return (
        <div className="todo-app-container">
            <div className="todo-app">
                <h2>Todo App</h2>
                <TodoForm addTodo={addTodo} />
                <TodoList todos={filterTodos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
                <CheckAllAndRemaining checkAll={checkAll} remainingCount={remainingCount} />
                <div className="other-buttons-container">
                    <TodoFilters filterBy={filterBy} />
                    <ClearCompletedBtn clearCompleted={clearCompleted} />
                </div>
            </div>
        </div>
    );
}

export default App;
