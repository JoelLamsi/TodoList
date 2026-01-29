import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Row from './components/Row'

type Todo = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  isDone: boolean;
}

const AS_KEY: string = 'TodoListStorage'

export default function App() {
  const [newTodo, setNewTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    loadTodos()
  }, [])
  

  const loadTodos = async () => {
    try {
      const json = await AsyncStorage.getItem(AS_KEY)
      if (json !== null) {
        setTodos(JSON.parse(json))
      }
    } catch (e) {
      console.log('Error occured while fetching todos:', e)
    }
  }
  
  const storeTodos = async (items: Todo[]) => {
    try {
      await AsyncStorage.setItem(AS_KEY, JSON.stringify(items))
    } catch (e) {
      console.log('Error occured while fetching todos:', e)
    }
  }

  const addTodo = () => {
    if (!newTodo.trim()) return

    const item: Todo = {
      id: todos.length + 1,
      title: newTodo,
      description: '',
      dueDate: '',
      isDone: false
    }

    const updatedList = [...todos, item]
    setTodos(updatedList)
    storeTodos(updatedList)
    setNewTodo('')
  }

  const deleteTodo = (id: number) => {
    const updatedList = todos.filter(t => t.id !== id)
    setTodos(updatedList)
    storeTodos(updatedList)
  }

  const toggleIsDone = (id: number) => {
    const updatedList = todos.map(todo =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    )
    setTodos(updatedList)
    storeTodos(updatedList)
  }
  return (
    <View style={styles.container}>
      <TextInput placeholder='Add new task' 
        value={newTodo}
        onChangeText={setNewTodo}
        onSubmitEditing={addTodo}
        style={styles.input} />

      <FlatList data={todos} keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => 
          <Row item={item} onDelete={deleteTodo} onToggleDone={toggleIsDone}/>
        } />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    width: '70%'
  }
});
