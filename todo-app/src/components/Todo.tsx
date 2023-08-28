import { useTheme } from '../ThemeContext';
import useTodo from '../hooks/useTodo';
import { useState, useEffect } from 'react';
import crossIcon from '../assets/images/icon-cross.svg'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';


const Todo = () => {

    const {theme} = useTheme();

    const {todos, filter, addTodo, deleteTodo, toggleTodo, setFilter, clearCompleted, reorderTodo} = useTodo();
    const[entryBoxChecked, setEntryBoxChecked] = useState(false);



    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        console.log("Before drag end:", todos);
    
        const items = [...todos];// Get a copy of your todos list
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        reorderTodo(items); // Dispatch the reordered list
    }

    useEffect(() => {
        console.log("After drag end:", todos);
    }, [todos]);

 


    
    return (
        <section>
            <div className={theme === "light" ? "todo-entry background-light" : "todo-entry component-dark"}>
                <input className="checkbox" type="checkbox" checked={entryBoxChecked} onChange={(e) => setEntryBoxChecked(e.target.checked)} />
                <input className='todo-entry-box' type="text" placeholder="Create a new todo..." 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                            addTodo(e.currentTarget.value);
                            e.currentTarget.value = "";
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
    
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <div 
                            className={theme === "light" ? "todo-list background-light" : "todo-list component-dark"} 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <ul>
                                {todos.map((todo, index) => (
                                    <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                                        
                                        {(provided) => (
                                            
                                            
                                            <li 
                                                ref={provided.innerRef} 
                                                {...provided.draggableProps} 
                                                {...provided.dragHandleProps}
                                            >
                                                <input 
                                                    type="checkbox" 
                                                    className='checkbox'
                                                    checked={todo.completed} 
                                                    onChange={() => toggleTodo(todo.id)} 
                                                />
                                                {todo.title}
                                                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                                                    <img src={crossIcon} alt="Delete Button"/>
                                                </button>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
    
                            <div className='todo-list-controls text-dark'>
                                <span className='items-left'>{todos.filter(todo => !todo.completed).length} items left</span>
                                <div className={theme === "light" ? "filter-tab" : "filter-tab component-dark text-dark-2"}>
                                    <a className={filter ==="all" ? "active" : ""}  onClick={() => setFilter('all')}>All</a>
                                    <a className={filter ==="active" ? "active" : ""}  onClick={() => setFilter('active')}>Active</a>
                                    <a className = {filter ==="completed" ? "active" : ""} onClick={() => setFilter('completed')}>Completed</a>
                                </div>
                                <a className='clear-completed' onClick={() => clearCompleted()}>Clear Completed</a>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    );
    
}

export default Todo;