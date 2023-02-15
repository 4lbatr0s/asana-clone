# Project Title

Asana Clone Backend

## Description

This project is a clone of Asana, with the purpose of managing projects and tasks. It contains the backend code only, and uses MongoDB as a database.

## Installation

### Prerequisites

- Docker
- docker-compose

### Steps

1.  Clone this repository
2.  Run `docker-compose up` to start the MongoDB container
3.  Start the server by running `npm start`

## Usage

You can send HTTP requests to the server to create, read, update, and delete projects and tasks. Here are some examples:

- `GET /projects`: Retrieve a list of all projects
    
- `GET /projects/:id`: Retrieve a specific project by ID
    
- `POST /projects`: Create a new project
    
- `PUT /projects/:id`: Update an existing project
    
- `DELETE /projects/:id`: Delete a project
    
- `GET /tasks`: Retrieve a list of all tasks
    
- `GET /tasks/:id`: Retrieve a specific task by ID
    
- `POST /tasks`: Create a new task
    
- `PUT /tasks/:id`: Update an existing task
    
- `DELETE /tasks/:id`: Delete a task

## Collection Relations
![Database](/home/serhatoner/Coding/asana-clone/DB.png)

## Contributing

Contributions are welcome! Please create a pull request with your changes.

## License

This project is licensed under the MIT License.