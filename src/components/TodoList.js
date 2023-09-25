import React from "react";
import Todo from "./Todo";

export default function TodoList({ todos, deleteTodo, updateTodo }) {
    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <Todo todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} key={todo.id} />
            ))}
        </ul>
    );
}
