import React from "react";

export default function ClearCompletedBtn({ clearCompleted }) {
    return (
        <div>
            <button onClick={clearCompleted} className="button">
                Clear completed
            </button>
        </div>
    );
}
