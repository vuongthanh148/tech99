## Introduction

Tech99 is a cutting-edge application designed to manage resources efficiently and enhance productivity.

## Table of contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Instructions to Run with Docker](#instructions-to-run-with-docker)
- [Accessing Swagger](#accessing-swagger)
- [Calling the API](#calling-the-api)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Docker
- Swagger

## Folder Structure

```
/tech99
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   └── services
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Instructions to Run with Docker

1. Ensure Docker is installed on your machine.
2. Navigate to the project directory:
   ```sh
   cd /Users/stephen/Documents/Projects/tech99
   ```
3. Build the Docker image:
   ```sh
   docker-compose build
   ```
4. Run the Docker container:
   ```sh
   docker-compose up
   ```

## Accessing Swagger

Once the application is running, you can access the Swagger documentation by navigating to:

```
http://localhost:3000/api-docs
```

## Calling the API

To call the API, use tools like `curl` or Postman. For example, to get a list of items:

```sh
curl -X GET "http://localhost:3000/api/items" -H "accept: application/json"
```
