mod controller;
mod models;
mod repository;

use std::io;
use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer};
use dotenv::dotenv;
use web::Data;
use controller::todo_controller;
use repository::database::Database;
use crate::controller::default_endpoints::{healthcheck, not_found};

#[actix_web::main]
async fn main() -> io::Result<()>{
    let todo_db = Database::new();
    let app_data = Data::new(todo_db);

    dotenv().ok();
    env_logger::init();

    HttpServer::new(move || {
        let logger = Logger::default();
        App::new()
            .app_data(app_data.clone())
            .wrap(logger)
            .configure(todo_controller::config)
            .service(healthcheck)
            .default_service(web::route().to(not_found))
    })
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
    
}
