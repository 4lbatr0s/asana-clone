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

### Projects

- `GET /projects`: Returns a list of all projects.
- `POST /projects`: Creates a new project. Requires authentication. The request body should contain a JSON object with the properties of the new project.
- `PATCH /projects/:id`: Updates an existing project with the specified `id`. Requires authentication. The request body should contain a JSON object with the properties to update.
- `DELETE /projects/:id`: Deletes the project with the specified `id`. Requires authentication.
- `GET /projects/:projectId/sections`: Returns a list of all sections for the project with the specified `projectId`. Requires authentication.

### Sections

- `GET /sections/index`: Returns a list of all sections.
- `GET /sections`: Returns a list of all sections. Requires authentication.
- `GET /sections/:projectId`: Returns a list of all sections for the project with the specified `projectId`. Requires authentication.
- `POST /sections`: Creates a new section. Requires authentication. The request body should contain a JSON object with the properties of the new section.
- `PATCH /sections/:id`: Updates an existing section with the specified `id`. Requires authentication. The request body should contain a JSON object with the properties to update.
- `DELETE /sections/:id`: Deletes the section with the specified `id`. Requires authentication.

### Users

- `POST /users`: Creates a new user. The request body should contain a JSON object with the properties of the new user.
- `GET /users`: Returns a list of all users. Requires authentication.
- `POST /users/login`: Authenticates a user. The request body should contain a JSON object with the user's email and password.
- `PATCH /users`: Updates the authenticated user. Requires authentication. The request body should contain a JSON object with the properties to update.
- `GET /users/projects`: Returns a list of all projects for the authenticated user. Requires authentication.
- `POST /users/reset-password`: Sends an email to the user with instructions to reset their password. The request body should contain a JSON object with the user's email.
- `POST /users/change-password`: Changes the authenticated user's password. Requires authentication. The request body should contain a JSON object with the old and new passwords.
- `DELETE /users/:id`: Deletes the user with the specified `id`. Requires authentication.
- `POST /users/update-profile-image`: Updates the authenticated user's profile image. Requires authentication. The request body should contain a multipart/form-data object with the image file.

## Collection Relations
![Alt Text](/home/serhatoner/Coding/asana-clone/DB.png)

## Contributing

Contributions are welcome! Please create a pull request with your changes.

## License

This project is licensed under the MIT License.

## TODO's

1. Create a lazy loading logic for the services and controllers.