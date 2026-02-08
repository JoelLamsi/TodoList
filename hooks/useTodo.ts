import { useEffect, useReducer, useState } from 'react'
import { Todo, TodoAction } from '../types/Todo'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AS_KEY: string = 'TodoListStorage'

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
    switch (action.type) {
        case "LOAD":
            return action.props
        case "ADD":
            const title: string = action.props.title.trim()
            if (!title) return state
           
            const nextId: number = state.length > 0 
                ? Math.max(...state.map(t => t.id)) + 1 : 1

            const newTodo: Todo = {
                id: nextId,
                title,
                isDone: false
            }

            return [...state, newTodo]
        case "TOGGLE":
            return state.map(t =>
                t.id === action.props.id
                    ? { ...t, isDone: !t.isDone }
                    : t
            )
        case "DELETE":
            return state.filter(t => t.id !== action.props.id)
        default:
            return state
    }
}

export const useTodo = () => {
    const [todos, dispatch] = useReducer(todoReducer, [])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const json = await AsyncStorage.getItem(AS_KEY)
                if (json !== null) {
                    dispatch({ type: "LOAD", props: JSON.parse(json) })
                }
            } catch (e) {
                console.log('Error occured while fetching todos:', e)
            }
            finally {
                setLoading(false)
            }
        }
        
        loadTodos()
    }, [])

    useEffect(() => {
        const storeTodos = async () => {
            try {
                await AsyncStorage.setItem(AS_KEY, JSON.stringify(todos))
            } catch (e) {
                console.log('Error occured while saving todos:', e)
            }
        }
        if (!loading) storeTodos()
    }, [todos, loading])
    
    const addTodo = (title: string) => {
        dispatch({ type: "ADD", props: { title }})
    }

    const deleteTodo = (id: number) => {
        dispatch({ type: "DELETE", props: { id }})
    }

    const toggleIsDone = (id: number) => {
        dispatch({ type: "TOGGLE", props: { id }})
    }

    return {
        todos,
        loading,
        addTodo,
        deleteTodo,
        toggleIsDone
    }
}