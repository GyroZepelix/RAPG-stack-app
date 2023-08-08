use actix_web::web::Data;
use chrono::NaiveDateTime;
use diesel::{AsChangeset, Insertable, Queryable};
use juniper::GraphQLObject;
use serde::{Deserialize, Serialize};
use crate::controller::graphql::Context;
use crate::models::todo::Todo;
use crate::repository::database::Database;


#[derive(Serialize, Deserialize, Debug, Clone, Queryable, Insertable, AsChangeset)]
#[diesel(table_name = crate::repository::diesel_schema::users)]
pub struct User {
    #[serde(default)]
    pub id: String,
    pub username: String,
    pub email: String,
    pub created_at: Option<NaiveDateTime>
}

impl User{
    pub fn new(username: String, email: String) -> Self {
        Self {
            id: uuid::Uuid::new_v4().to_string(),
            username,
            email,
            created_at: None,
        }
    }
}

#[juniper::graphql_object(context = Context)]
impl User{

    pub fn id(&self) -> &str {
        &self.id
    }

    pub fn username(&self) -> &str {
        &self.username
    }

    pub fn email(&self) -> &str {
        &self.email
    }

    pub fn created_at(&self) -> Option<NaiveDateTime> {
        self.created_at
    }

    pub async fn todos(&self, context: &Context) -> Vec<Todo> {
        context.database.get_todos_by_user_id(&self.id).unwrap_or(vec![])
    }
}

