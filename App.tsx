import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';
import Row from './components/Row'
import { useTodo } from './hooks/useTodo'

export default function App() {
  const [newTodo, setNewTodo] = useState<string>('')
  const { todos, addTodo, deleteTodo, toggleIsDone } = useTodo()  
  
  return (
    <View style={styles.container}>
      <TextInput placeholder='Add new task' 
        value={newTodo}
        onChangeText={setNewTodo}
        onSubmitEditing={() => {
          addTodo(newTodo)
          setNewTodo("")
        }}
        style={styles.input} />

      <FlatList data={todos} 
        keyExtractor={(item) => item.id.toString()}
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
