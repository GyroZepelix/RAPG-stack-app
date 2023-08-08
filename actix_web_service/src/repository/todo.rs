use chrono::Utc;
use diesel::{ExpressionMethods, QueryDsl, QueryResult, RunQueryDsl};
use crate::models::todo::Todo;
use crate::repository::database::Database;
use crate::repository::diesel_schema::todos::dsl::todos;
use crate::repository::diesel_schema::todos::user_id;
use crate::utils::usize_wrapper::UsizeWrapper;

impl Database {
    pub fn get_todos(&self) -> QueryResult<Vec<Todo>> {
        todos
            .get_results(&mut self.pool.get().expect("get database"))
    }

    pub fn create_todo(&self, todo: Todo) -> QueryResult<Todo> {
        let todo = Todo {
            id: uuid::Uuid::new_v4().to_string(),
            created_at: Some(Utc::now().naive_utc()),
            updated_at: Some(Utc::now().naive_utc()),
            ..todo
        };
        diesel::insert_into(todos)
            .values(&todo)
            .execute(&mut self.pool.get().expect("get database"))?;
        Ok(todo)
    }

    pub fn get_todo_by_id(&self, todo_id: &str) -> QueryResult<Todo> {
        todos.find(todo_id)
            .get_result(&mut self.pool.get().expect("get database"))
    }

    pub fn get_todos_by_user_id(&self, id: &str) -> QueryResult<Vec<Todo>> {
        todos.filter(user_id.eq(id))
            .get_results(&mut self.pool.get().expect("get database"))
    }


    pub fn delete_todo_by_id(&self, todo_id: &str) -> QueryResult<UsizeWrapper> {
        diesel::delete(todos.find(todo_id))
            .execute(&mut self.pool.get().unwrap())
            .map(|count| count.into())
    }

    pub fn update_todo_by_id(&self, todo_id: &str, mut todo: Todo) -> Option<Todo> {
        todo.updated_at = Some(Utc::now().naive_utc());
        let todo = diesel::update(todos.find(todo_id))
            .set(&todo)
            .get_result::<Todo>(&mut self.pool.get().unwrap())
            .expect("Error updating todo by id");
        Some(todo)
    }
}