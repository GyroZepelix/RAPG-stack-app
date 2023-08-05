use actix_web::{get, HttpResponse, Responder, Result};
use serde::Serialize;

#[derive(Serialize)]
pub struct Response {
    pub message: String,
}

#[get("/health")]
pub async fn healthcheck() -> impl Responder {
    let response = Response {
        message: "Everything is working fine".to_string(),
    };
    HttpResponse::Ok().json(response)
}

pub async fn not_found() -> Result<HttpResponse> {
    let response = Response {
        message: "Resource not found".to_string(),
    };
    Ok(HttpResponse::NotFound().json(response))
}