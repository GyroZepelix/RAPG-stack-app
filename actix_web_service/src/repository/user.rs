use chrono::Utc;
use diesel::{QueryDsl, QueryResult, RunQueryDsl};
use crate::models::user::User;
use crate::repository::database::Database;
use crate::repository::diesel_schema::users::dsl::users;
use crate::utils::usize_wrapper::UsizeWrapper;

impl Database {
    pub fn get_users(&self) -> QueryResult<Vec<User>> {
        users
            .get_results(&mut self.pool.get().expect("get database"))
    }

    pub fn create_user(&self, user: User) -> QueryResult<User> {
        let user = User {
            id: uuid::Uuid::new_v4().to_string(),
            created_at: Some(Utc::now().naive_utc()),
            ..user
        };
        diesel::insert_into(users)
            .values(&user)
            .execute(&mut self.pool.get().expect("get database"))?;
        Ok(user)
    }

    pub fn get_user_by_id(&self, user_id: &str) -> QueryResult<User> {
        users.find(user_id)
            .get_result(&mut self.pool.get().expect("get database"))
    }

    pub fn delete_user_by_id(&self, user_id: &str) -> QueryResult<UsizeWrapper> {
        diesel::delete(users.find(user_id))
            .execute(&mut self.pool.get().unwrap())
            .map(|count| count.into())
    }

    pub fn update_user_by_id(&self, user_id: &str, user: User) -> Option<User> {
        let user = diesel::update(users.find(user_id))
            .set(&user)
            .get_result::<User>(&mut self.pool.get().unwrap())
            .expect("Error updating user by id");
        Some(user)
    }
}