AutoFi Test NodeJS

Description: This project is based on the development of a backend with nodejs that allows the user from a user interface or through an api, to store in the database through a csv file and a provider name, it can also be listed all cars previously entered.

---

Getting started

\*npm install -> install all dependencies in the project

\*npm start -> start project server listening at http://localhost:3000/

-When project is running write a provider name and select a csv file with correct format.
-Correct format csv file in-> Test/MOCK_DATA_SUCCESS.csv
-Incorrect format csv file in-> MOCK_DATA_ERROR.csv -> Does not contain all required data

\*npm test -> run all test
-api.test -> execute test related with api request
-server.test -> execute test related with database & server

---

API

GET
/api/autos -> get all autos

POST
/api/autos -> post autos with selected csv file

---
