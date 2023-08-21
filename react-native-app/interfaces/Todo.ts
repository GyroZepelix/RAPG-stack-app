export default interface Todo {
    id: number;
    title: string;
    description?: string;
    createdAt?: number;
    updatedAt?: number;
    userId: string;
}