import React,{useState} from "react";
import './Todo.css';

function Todo(){
    const [todos, setTodos] = useState([]);
    const [inputText, setInputText] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    const AddTodo = () =>{
        if(inputText.trim()){
            const newTodo = {
                id:Date.now(),
                text:inputText,
                completed:false
                
            };
            setTodos([...todos,newTodo])
            setInputText('');
        }
    }

    const editTodo =(id,text)=>{
        setEditId(id);
        setEditText(text);
    }

    const SaveEdit=(id) =>{
        const updateTodo =todos.map( (todo) => todo.id === id ? {... todo,text:editText} : todo)
        setTodos(updateTodo);
        setEditId(null);
        setEditText('');
           
    }

    const deleteTodo=(id) =>{
        const updateTodo =todos.filter((todo) => todo.id !== id);
        setTodos(updateTodo);
    
    }

    return(
        <div className="container">
            <h1>Todo List</h1>
            <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your Todo:"
            />
            <button onClick={AddTodo}>Add</button>

            <ul>
                {todos.map((todo) =>(
                    <li key = {todo.id}>
                        {
                            editId === todo.id ? (
                                <>
                                <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText (e.target.value)}/>
                                <button onClick={() => SaveEdit(todo.id)}>Save</button>
                                 </>   
                                ):(
                                    <>
                                    <input
                                     type="checkbox" 
                                     checked= {todo.completed}
                                     onChange={()=> setTodos(todos.map((t) =>t.id===todo.id?{
                                        ...t,completed:!t.completed}:t))
                                     }
                                     />
                                     <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
                                     <button onClick={()=>editTodo(todo.id, todo.text)}>Edit</button>
                                     <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
                                     </>
   
                                )
    
                        }
                        
                    </li>
                ))}

            </ul>
        
        </div>

    );

}
export default Todo