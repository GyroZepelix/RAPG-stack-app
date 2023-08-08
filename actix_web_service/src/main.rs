mod controller;
mod models;
mod repository;
mod utils;

use std::io;
use actix_cors::Cors;
use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer};
use dotenv::dotenv;
use web::Data;
use controller::todo_controller;
use repository::database::Database;
use crate::controller::default_endpoints::{healthcheck, not_found};
use crate::controller::graphql;
use crate::controller::graphql::{create_schema};

#[actix_web::main]
async fn main() -> io::Result<()>{
    let db = Database::new();
    let database_data = Data::new(db);
    let graphql_schema = create_schema();
    let schema_data = Data::new(graphql_schema);

    dotenv().ok();
    env_logger::init();

    HttpServer::new(move || {
        let logger = Logger::default();
        App::new()
            .app_data(schema_data.clone())
            .app_data(database_data.clone())
            .wrap(logger)
            .wrap(Cors::permissive())
            .configure(todo_controller::config)
            .configure(graphql::config)
            .service(healthcheck)
            .default_service(web::route().to(not_found))
    })
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
    
}
