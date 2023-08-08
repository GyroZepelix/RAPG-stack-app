use actix_web::{get, HttpResponse, Responder, route, web};
use actix_web::web::Data;
use actix_web_lab::respond::Html;
use juniper::{EmptySubscription, FieldError, FieldResult, graphql_value, RootNode};
use juniper::http::graphiql::graphiql_source;
use juniper::http::GraphQLRequest;
use crate::models::todo::Todo;
use crate::repository::database::Database;

pub type Schema = RootNode<'static, QueryRoot, MutationRoot, EmptySubscription>;
#[get("/graphiql")]
async fn graphql_playground() -> impl Responder {
    Html(graphiql_source("/graphql", None))
}
#[route("/graphql", method = "GET", method = "POST")]
async fn graphql(st: Data<Schema>, data: web::Json<GraphQLRequest>) -> impl Responder {
    let user = data.execute(&st, &()).await;
    HttpResponse::Ok().json(user)
}

pub struct QueryRoot {
    database: Data<Database>
}

pub struct MutationRoot {
    database: Data<Database>
}

impl QueryRoot {
    fn new(database: Data<Database>) -> Self {
        Self { database }
    }
}

impl MutationRoot {
    fn new(database: Data<Database>) -> Self {
        Self { database }
    }
}

#[juniper::graphql_object]
impl QueryRoot {

    fn todos(&self) -> FieldResult<Vec<Todo>> {
        self.database.get_todos()
            .map_err(|error| {
                let error_message = error.to_string();
                FieldError::new(
                    "Failed getting data from database",
                    graphql_value!({"internal_error": error_message})
                )
            })
    }
    fn todo(&self, id: String) -> FieldResult<Todo> {
        self.database.get_todo_by_id(&id)
            .map_err(|error| {
                let error_message = error.to_string();
                FieldError::new(
                    "Failed getting data from database",
                    graphql_value!({"internal_error": error_message})
                )
            })
    }
}


#[juniper::graphql_object]
impl MutationRoot {
    fn create_todo(&self, todo_title: String, description: Option<String>) -> FieldResult<Todo> {
        self.database
            .create_todo(Todo::new(todo_title, description))
            .map_err(|error| {
                let error_message = error.to_string();
                FieldError::new(
                    "Failed getting data from database",
                    graphql_value!({"internal_error": error_message}),
                )
            })
    }

    fn delete_todo(&self, id: String) -> FieldResult<i32> {
        self.database
            .delete_todo_by_id(&id)
            .map(|deleted| deleted.into())
            .map_err(|error| {
                let error_message = error.to_string();
                FieldError::new(
                    "Failed getting data from database",
                    graphql_value!({"internal_error": error_message}),
                )
            })
    }
}



pub fn create_schema(database: Data<Database>) -> Schema {
    Schema::new(QueryRoot::new(database.clone()), MutationRoot::new(database), EmptySubscription::new())
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("")
            .service(graphql)
            .service(graphql_playground)
    );
}