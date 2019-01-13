# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) React: Idea Board Backend

Author: Sonyl Nagale (sonyl.nagale@ga.co)

Release: 0.0.0

## Usage

This API backend is to simplify the [React Idea Board project](https://git.generalassemb.ly/react-development/idea-board) for the React Part-time course.

The API has 3 specific endpoints with permutations, and 2 in development:

  1. `/list`: displays all data in the database.
    * `/list/:name`: displays all data for the { String } `name` parameter
  1. `/create`: enters information into the database of this format:
      * { String } title
      * { String } description
      * `/create/seed`: enters test data for quickstart.
  1. `/update/`: Updates a specific idea. `id` is POSTed.
  1. `/delete/:id`: Deletes a specific user and all its data.
  1. `/test/create`: a basic form to test adding data to the database and see it reflected in the `/list` views.

### Listing Data

The `/list` and `/list/:name` URLs will list all data (https://react-idea-board-backend.herokuapp.com/list/) or data for a specific name (https://react-idea-board-backend.herokuapp.com/list/Sonyl)

The data is presented in JSON format in both cases, using Firebase IDs:

_All Data_


![List All Data](./images/list.png)

_User Data_


![List User Data](./images/user.png)

## Caveat

The API only has rudimentary sanitization, so please discourage students from trying to break it with XSS or other means.

## Stood-up URLs to Distribute to Students

Sample Listing:  https://react-idea-board-backend.herokuapp.com/list/

* Create: POST https://react-idea-board-backend.herokuapp.com/create/:name
* Read: GET  https://react-idea-board-backend.herokuapp.com/:name
* Update: PUT https://react-idea-board-backend.herokuapp.com/update/:id
* Delete: POST https://react-idea-board-backend.herokuapp.com/

## Technologies

* Node.js
* Express
* Firebase
