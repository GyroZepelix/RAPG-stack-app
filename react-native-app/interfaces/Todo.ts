export default interface Todo {
    id: number;
    title: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    userId: string;
}