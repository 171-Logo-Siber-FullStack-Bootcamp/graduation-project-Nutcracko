# SinglePageECommerce

A single-page application developed in vuejs in frontend and nodeJS in the backend.

Frontend Tools:
Axios, fontawesome, google fonts

Backend Tools:
Express, ElasticSearch, pg, jsonwebtoken, multer, winston, bcrypt, cookie-parser, cors, dotenv, joi

## DB Schema:

![alt text](./screenshots/DB-schema.JPG "DB Schema")

## BACKEND Folder Structure(./api/)

-config: configuration scripts for the application such as elasticsearch and db connection configurations and logger configs

-controllers: controllers for error handling, logging and handling requests and responses. Controllers are named according to processes.

-middleware: uploading image middleware and mail middleware to send verification mails. Mail verification is not added to the
controllers since mail account is needed.

-models: DB models are created as classes and functions to access the data are performed inside these models.

-public: Static served files by express are stored here. Used mostly for serving product images.

-routes: routes named by the endpoints. Assigns requests to the corresponding controllers.

-validators: Validators created by joi library to validate the incoming requests for authentication processes and product creation process.

## FRONTEND Folder Structure(./client/)

inside src folder

-assets: Holds the assets for the frontend. Only logo exists by the time.

-components: Holds Lower level components for pages. They are foldered according to page names and deeper level components are foldered accordingly to the component names.

-pages: Most composed components for the router to render.

-router: Assigning which components should be rendered on which endpoint.

## How to run the app;

.env file should be checked and changed for configuration.

Api:

```
cd api
npm install
npm start
```

Client:

```
cd client
npm install
npm run serve
```

## Screenshots of the app:

---

## HomePage:

![alt text](./screenshots/HomePage.JPG "Home page")

## ContactPage:

![alt text](./screenshots/ContactPage.JPG "Contact page")

## StorePage:

![alt text](./screenshots/StorePage.JPG "Store page")

## LoginPage:

![alt text](./screenshots/LoginPage.JPG "Login Page")

## RegisterPage:

![alt text](./screenshots/RegisterPage.JPG "Register Page")

![alt text](./screenshots/RegisterPage2.JPG "Register Page 2")

## StorePage After Login:

![alt text](./screenshots/UserItemAddedtoCart.JPG "User item added to cart")

## User Cart Page

![alt text](./screenshots/UserCart.JPG "User cart page")

## Seller Dashboard:

![alt text](./screenshots/SellerDashboard.JPG "Seller Dashboard")

## Item Stock Option Changed:

![alt text](./screenshots/StockChanged.JPG "Stock changed")

## Item's Out of Stock on store:

![alt text](./screenshots/ItemsOutofStockInStore.JPG "Stock changed => store")

## Search:

![alt text](./screenshots/Search.JPG "Search")

---

![alt text](./screenshots/Search2.JPG "Search2")

## Filter Shoes Category:

![alt text](./screenshots/FilterShoes.JPG "Filter Shoes Category")

## Video of the App Running:

!Couldn't upload video since it is bigger than 10MB.
Can see the video in ./video/ProjectRunningVideo.mp4
