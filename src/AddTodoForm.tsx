import React from "react";

interface Props {
    addTodo: AddTodo;
}

export const AddTodoForm: React.FC <Props>= ({addTodo}) => {
    const [text, setText] = React.useState("");


    return (
        <form>
            <input type="text" 
                   value={text} 
                   placeholder="Add Task"
                   onChange={(e) => setText(e.target.value)}/>
            <button 
                type="submit"
                onClick={(e) => {e.preventDefault(); addTodo(text); setText("")}}>
                Add Task
            </button>
        </form>
    );
};

