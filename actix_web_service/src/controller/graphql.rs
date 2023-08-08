use actix_web::{get, HttpResponse, Responder, route, web};
use actix_web::web::Data;
use actix_web_lab::respond::Html;
use juniper::{EmptySubscription, FieldError, FieldResult, graphql_value, RootNode};
use juniper::http::graphiql::graphiql_source;
use juniper::http::GraphQLRequest;
use crate::models::todo::Todo;
use crate::models::user::User;
use crate::repository::database::Database;

pub type Schema = RootNode<'static, QueryRoot, MutationRoot, EmptySubscription<Context>>;
#[get("/graphiql")]
async fn graphql_playground() -> impl Responder {
    Html(graphiql_source("/graphql", None))
}
#[route("/graphql", method = "GET", method = "POST")]
async fn graphql(schema: Data<Schema>, data: web::Json<GraphQLRequest>, database: Data<Database>) -> impl Responder {
    let context = Context { database: database };
    let user = data.execute(&schema, &context).await;
    HttpResponse::Ok().json(user)
}

pub struct Context {
    pub database: Data<Database>
} 

impl juniper::Context for Context {}

pub struct QueryRoot {}
pub struct MutationRoot {}

impl QueryRoot {
    fn new() -> Self {
        Self { }
    }
}
impl MutationRoot {
    fn new() -> Self {
        Self { }
    }
}

#[juniper::graphql_object(context = Context)]
impl QueryRoot {

    async fn todos(context: &Context) -> FieldResult<Vec<Todo>> {
        context.database.get_todos()
            .map_err(|error| {
                let error_message = error.to_string();
                FieldError::new(
                    "Failed getting data from database",
                    graphql_value!({"internal_error": error_message})
                )
            })
    }
    async fn todo(context: &Context, id: String) -> FieldResult<Todo> {
        context.database.get_todo_by_id(&id)
            .map_err(|error| {
                let error_message = error.to_string();
                FieldError::new(
                    "Failed getting data from database",
                    graphql_value!({"internal_error": error_message})
                )
            })
    }

    async fn users(context: &Context) -> FieldResult<Vec<User>> {
        context.database.get_users()
            .map_err(|error| {
                let error_message = error.to_string();
                FieldError::new(
                    "Failed getting data from database",
                    graphql_value!({"internal_error": error_message})
                )
            })
    }

    async fn user(context: &Context, id: String) -> FieldResult<User> {
        context.database.get_user_by_id(&id)
            .map_err(|error| {
                let error_message = error.to_string();
                FieldError::new(
                    "Failed getting data from database",
                    graphql_value!({"internal_error": error_message})
                )
            })
    }
}
#[juniper::graphql_object(context = Context)]
impl MutationRoot {
    fn create_todo(context: &Context, user_id: String, title: String, description: Option<String>) -> FieldResult<Todo> {
        context.database
            .create_todo(Todo::new(user_id, title, description))
            .map_err(|error| {
                let error_message = error.to_string();
                FieldError::new(
                    "Failed getting data from database",
                    graphql_value!({"internal_error": error_message}),
                )
            })
    }

    fn delete_todo(context: &Context, id: String) -> FieldResult<i32> {
        context.database
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

    fn create_user(context: &Context, name: String, email: String) -> FieldResult<User> {
        context.database
            .create_user(User::new(name, email))
            .map_err(|error| {
                let error_message = error.to_string();
                FieldError::new(
                    "Failed getting data from database",
                    graphql_value!({"internal_error": error_message}),
                )
            })
    }

    fn delete_user(context: &Context, id: String) -> FieldResult<i32> {
        context.database
            .delete_user_by_id(&id)
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
pub fn create_schema() -> Schema {
    Schema::new(QueryRoot::new(), MutationRoot::new(), EmptySubscription::new())
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("")
            .service(graphql)
            .service(graphql_playground)
    );
}