<h1 style="text-align: center">RAPG Stack</h1>
<p align="center">
<img height="250" src="./.assets/RAPGStack.jpg">
</p>

## About
I created this app to test out and learn the following *Fullstack* technologies:
- Actix Web [ Rust ]
- GraphQL
- React Native

<hr/>

## Prerequisites
- [Rust](https://www.rust-lang.org/tools/install)
- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Expo Go on Android or IOS](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US)
- [PostgresQL Libs (libpg)](https://www.postgresql.org/download/)
## Installation
- Clone the repository
### Database
1. Set up the PostgresQL database using docker-compose by running the following command in the root directory:
    ```
    docker-compose up -d
    ```
### Backend
*libpg required to continue!*
1. Change directory to `actix_web_service`
    ```
    cd actix_web_service
    ```
2. Install Diesel CLI
    ```
    cargo install diesel_cli --no-default-features --features postgres
    ```
3. Run the following command to install the dependencies:
    ```
    cargo build
    ```
4. Run the following command to run the migrations:
    ```
    Diesel migration run
    ```
5. Run the following command to start the server:
    ```
    cargo run
    ```
### Frontend
1. Change directory to `react_native_app`
    ```
    cd react_native_app
    ```
2. Install the dependencies:
    ```
    npm install
    ```
3. Inside the `.env` file, change the `EXPO_PUBLIC_BASE_URL` to the IP address of your machine.
    ```
    EXPO_PUBLIC_BASE_URL=http://<YOUR_IP_ADDRESS>:8080
    ```
4. Run the following command to start the app:
    ```
   npx expo start
    ```
5. Scan the QR code using the Expo Go app on your phone or run the app on a simulator.


