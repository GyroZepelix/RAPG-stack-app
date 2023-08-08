use chrono::NaiveDateTime;
use diesel::{AsChangeset, Insertable, Queryable};
use juniper::GraphQLObject;
use serde::{Deserialize, Serialize};
use crate::models::todo::Todo;


#[derive(Serialize, Deserialize, Debug, Clone, Queryable, Insertable, AsChangeset, GraphQLObject)]
#[graphql(description = "A todo card", impl = Todo)]
#[diesel(table_name = crate::repository::diesel_schema::users)]
pub struct User {
    #[serde(default)]
    pub id: String,
    pub username: String,
    pub email: String,
    pub created_at: Option<NaiveDateTime>,
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
