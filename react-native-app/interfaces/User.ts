import Todo from "./Todo";

export interface User {
    id: string;
    44
    created_at?: string;
}

export interface UserWithPartialTodo<Attributes extends keyof Todo> extends User {
    todos: [Pick<Todo, Attributes>]
}