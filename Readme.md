# Restaurants Restful API
Auther: *Hello World*
## Install
> cd resfull_sql_api

> npm install 

# REST API

The REST API to the example app is described below.

### Request

`GET /restaurants`

    curl -i -H 'Accept: application/json' http://localhost:3030/restaurants

### Request BY ID
`GET /restaurants/id`

    curl -i -H 'Accept: application/json' http://localhost:3030/restaurants/2

### UPDATE BY ID
`PUT /restaurants/id`

    curl -i -H 'Accept: application/json' http://localhost:3030/restaurants/2

    BODY {...data}

### CREATE
`POST /restaurants`

    curl -i -H 'Accept: application/json' http://localhost:3030/restaurants

    BODY {...data}
### DELETE BY ID
`DELETE /restaurants`

    curl -i -H 'Accept: application/json' http://localhost:3030/restaurants/2
