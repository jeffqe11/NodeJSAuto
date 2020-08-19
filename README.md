AutoFi Test NodeJS

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
