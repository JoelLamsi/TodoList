export type Todo = {
    id: number,
    title: string,
    isDone: boolean
}

export type TodoAction = 
 | { type: "LOAD"; props: Todo[] } 
 | { type: "ADD"; props: { title: string } }
 | { type: "DELETE"; props: { id: number } }
 | { type: "TOGGLE"; props: { id: number } }