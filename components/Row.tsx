import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Todo } from "../types/Todo";

interface RowProps  {
    item: Todo
    onDelete: (id: number) => void
    onToggleDone: (id: number) => void
}

export default function Row({item, onDelete, onToggleDone}: RowProps) {
    return (
        <TouchableOpacity style={styles.row}
            onPress={() => onToggleDone(item.id)}>
            <Text style={[styles.title, item.isDone && styles.done]}>{item.title}</Text>
            <TouchableOpacity style={styles.button} onPress={() => onDelete(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        width: 250,
        margin: 8,
        padding: 4,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center'
    },
    done: {
        textDecorationLine: 'line-through',
        color: '#888'
    },
    button: {
      backgroundColor: '#ffc1c1',
      padding: 4,
      borderRadius: 20
    },
    deleteText: {
      padding: 4,
      borderRadius: 2
    }
})