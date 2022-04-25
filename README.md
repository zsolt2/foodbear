# Foodbear

# Installation

## Docker compose

Run `docker-compose up` to start the *angular* frontend server, *express* backend server, *mysql* database, and *phpmyadmin* admin interface. 

Or you would like to run the services separatelly without docker-compose.
 - Start frontend server: `npm run start`
 - Start backend server: `npm run backend`
 - Make sure to import the [database dump](./dbdump/dbdump.sql)

You can access the development server at [http://localhost:4200](http://localhost:4200). The backend API is listening on port [3000](http://localhost:300).
If you using docker compose you can access phpMyAdmin at [http://localhost:8080](http://localhost:8080).(Credentials: root:root)

# Featues

## Authentication 

There are two authentication leves, both on the frontend and the backend. It is achieved  by using [JWT tokens](https://jwt.io/).

Reular users can make read operations throug the API, and make orders. 

Admin user can delete and create other users.
Furthermore they can create, delete, modify foods, partners and couriers.

Regural user can not access ceartain frontend pages, and can not access ceartan API features.

## Test credencials
  admin@foodbear.com:password
  nonAdminUser@foodbear.com:password
  user@foodbear.com:password

## Used technologies

- [Angular](https://angular.io/)
- [Typeorm](https://typeorm.io/)
- [Express](https://expressjs.com/)
- [MySQL](https://mariadb.com/)
- [PHPMyAdmin](https://www.phpmyadmin.net/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/overview/)
- [Node.js](https://nodejs.org/)
- [Npm](https://www.npmjs.com/)
- [JWT](https://jwt.io/)
- [Bootstrap](https://getbootstrap.com/)
- [Postman](https://www.getpostman.com/)
- Pictures and dummy data privided by: [themealdb](https://www.themealdb.com/api.php?ref=apilist.fun)
 
