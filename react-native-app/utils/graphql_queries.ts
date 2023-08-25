import {gql} from "@apollo/client";

const ADD_USER = gql`
    mutation AddUser($name: String!, $email: String!) {
        createUser (name: $name, email: $email) {
            id
            username
            email
            createdAt
        }
    }
`

const GET_USERS = gql`
    query GetUsers {
        users {
            id
            username
        }
    }
`

const ADD_TODO = gql`
    mutation AddTodo($title: String!, $description: String, $userId: String!) {
        createTodo( title: $title, description: $description, userId: $userId ) {
            title
            description
            updatedAt
        }
    }
`

const GET_USER_BY_ID = gql`
    query GetUserById($id: String!) {
        user(id: $id) {
            username
            todos {
                id
                title
                description
                updatedAt
            }
        }
    }
`

export {ADD_USER, GET_USERS, ADD_TODO, GET_USER_BY_ID};