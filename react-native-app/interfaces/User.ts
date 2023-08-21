import Todo from "./Todo";

export interface User {
    id: string;
    username: string;
    email: string;
    created_at?: string;
}

export interface UserWithPartialTodo<Attributes extends keyof Todo> extends User {
    todos: [Pick<Todo, Attributes>]
}