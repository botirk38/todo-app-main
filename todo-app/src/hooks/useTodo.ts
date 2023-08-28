import { useEffect, useReducer } from 'react';

type Filter = 'all' | 'active' | 'completed';

export type TodoProps = {
    id: number;
    title: string;
    completed: boolean;

}

type State = {
    todos: TodoProps[];
    filter: Filter;
}

type Action =
  | { type: 'ADD_TODO', text: string }
  | { type: 'DELETE_TODO', id: number }
  | { type: 'TOGGLE_TODO', id: number }
  | { type: 'SET_FILTER', filter: Filter }
  | {type:'CLEAR_COMPLETED'};


  const todoReducer = (state: State, action: Action): State => {
    switch(action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: state.todos.length + 1, 
                        title: action.text,
                        completed: false
                    }
                ]
            };

        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            };

        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => 
                    todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
                )
            };

        case 'SET_FILTER':
            return {
                ...state,
                filter: action.filter
            };

        case 'CLEAR_COMPLETED':
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.completed)
            };

        default:
            return state;
    }
};

const LOCAL_STORAGE_KEY = 'todos_data';

const useTodo = () => {

    const initialState: State = {
        todos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'),
        filter: 'all'
    };

    const [state, dispatch] = useReducer(todoReducer, initialState);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.todos));

    }, [state.todos]);

    const addTodo = (text: string) => {
        dispatch({ type: 'ADD_TODO', text });
    }

    const deleteTodo = (id: number) =>{
        dispatch({ type: 'DELETE_TODO', id });
    }

    const toggleTodo = (id: number) => {
        dispatch({ type: 'TOGGLE_TODO', id });
    }

    const setFilter = (filter: Filter) => {
        dispatch({ type: 'SET_FILTER', filter });
    }

    const clearCompleted = () => {
        dispatch({ type: 'CLEAR_COMPLETED' });
    }

    const filteredTodos = () =>{
        switch(state.filter){
            case "all":
                return state.todos;
            case "active":
                return state.todos.filter(todo => !todo.completed);
            case "completed":
                return state.todos.filter(todo => todo.completed);
            default:
                return state.todos;
        }
    }

    return{
        todos: filteredTodos(),
        filter: state.filter,
        addTodo,
        deleteTodo,
        toggleTodo,
        setFilter,
        clearCompleted

    }
}

export default useTodo;
