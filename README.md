# MERN-Blog-Application

This is the **BLog Application** Web App developed using MERN Stack

I have used MongoDB Atlas as a Database

*The user can perform CRUD operations and can see the blogs posted by others.*

### **[View Demo](https://660fb73e41e16c6a44f2c0b8--leafy-concha-1ddd4c.netlify.app/)**

## Demo Images

![Demo Image 1](<frontend/src/assets/Annotation 2024-04-11 211155.png>)

![Demo Image 2](<frontend/src/assets/Annotation 2024-04-11 211307.png>)
 
 ![Demo Image 3](<frontend/src/assets/Annotation 2024-04-11 212024.png>)


## Before Running  this application
<p>Add your MONGODB ATLAS URI in **.env-example** in backend folder </p>
<p>Rename the .env-example file to **.env** </p>

## To run this application


#### To Run from Root Directory

`npm run dev` <br> (concurrently run server and client) <br>

or <br>

`npm run server`  (only run backend) <br>

`npm run client`  (only run frontend) <br>


#### To Run Backend
`npm --prefix backend start` (node) 

 or <br>
 
`npm --prefix backend run server` (with nodemon) 

 or <br>

`cd backend` <br>

`npm install` <br>

`npm start`

#### To Run Frontend

`npm --prefix frontend run client` <br>

or

`cd frontend` <br>

`npm install` <br>

`npm run dev`

