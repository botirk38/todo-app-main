import { useTheme } from '../ThemeContext';
import useTodo, {TodoProps}  from '../hooks/useTodo';
import { useState } from 'react';
import crossIcon from '../assets/images/icon-cross.svg'

const Todo = () => {

    const {theme} = useTheme();

    const {todos, filter, addTodo, deleteTodo, toggleTodo, setFilter, clearCompleted} = useTodo();
    const[entryBoxChecked, setEntryBoxChecked] = useState(false);

    const getFilterClass = (currentFilter: string) => {
        return filter === currentFilter ? 'active' : '';
    }

    
    return(
        <section>
            <div className={theme==="light" ? "todo-entry background-light" : "todo-entry component-dark"}>
                <input className="checkbox" type="checkbox" checked={entryBoxChecked} onChange={(e) => setEntryBoxChecked(e.target.checked)}  />
                <input className='todo-entry-box' type="text" placeholder="Create a new todo..." 

                onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                        addTodo(e.currentTarget.value);
                        e.currentTarget.value = ""; // reset the input
                        setEntryBoxChecked(false);
                    }
                }}
                
                onChange={(e) => {
                    if(e.currentTarget.value) {
                        setEntryBoxChecked(true);
                    } else {
                        setEntryBoxChecked(false);
                    }
                }}
                 />
            </div>

            <div className={theme=="light" ? "todo-list background-light" :"todo-list component-dark"}>
            <ul>
                {todos.map((todo: TodoProps) => (
                    <li key={todo.id}>
                        <input 
                            type="checkbox" 
                            className='checkbox'
                            checked={todo.completed} 
                            onChange={() => toggleTodo(todo.id)} 
                        />
                        {todo.title}
                        <button className="delete-btn" onClick={() => deleteTodo(todo.id)}><img src={crossIcon} alt="Delete Button"/></button>

                    </li>

                ))}
            </ul>

                <div className='todo-list-controls text-dark'>
                    <a className='items-left'>{todos.filter(todo => !todo.completed).length} items left</a>

                <div className={theme === "light" ? "filter-tab" : "filter-tab component-dark text-dark-2"}>
                    <a className={getFilterClass('all')} onClick={() => setFilter('all')}>All</a>
                    <a className={getFilterClass('active')} onClick={() => setFilter('active')}>Active</a>
                    <a className={getFilterClass('completed')} onClick={() => setFilter('completed')}>Completed</a>
                </div>


                    <a className='clear-completed' onClick={() => clearCompleted()}>Clear Completed</a>
                </div>

            </div>

            
            

            
        </section>
    )

}

export default Todo;