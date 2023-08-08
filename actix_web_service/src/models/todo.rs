use chrono::NaiveDateTime;
use diesel::{AsChangeset, Insertable, Queryable};
use juniper::GraphQLObject;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, Queryable, Insertable, AsChangeset, GraphQLObject)]
#[graphql(description = "A todo card")]
#[diesel(table_name = crate::repository::diesel_schema::todos)]
pub struct Todo {
    #[serde(default)]
    pub id: String,
    pub title: String,
    pub description: Option<String>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
    pub user_id: String,
}

impl Todo{
    pub fn new(user_id: String, title: String, description: Option<String>) -> Self {
        Self {
            id: "".to_string(),
            title,
            description,
            created_at: None,
            updated_at: None,
            user_id
        }
    }
}




