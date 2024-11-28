import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

// Cross Origin Resource Sharing. fetch() and XML_HttpRequest follow same-origin-policy i.e. they allow the request only from the same origin the application was running from.
// CORS is HTTP-header based mechanism that allows the server to indicate any origins other than its own from which the browser should permit the requests.
// E.g., your front end is in https://domain1.com and your back end is in https://domain2.com. Now the CORS policy error occurs. 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// express.json() is middleware that is for parsing the incoming JSON payloads and making that data available in req.body or for further processing within the routes.
app.use(express.json({limit:"16kb"}));

// This is a built-in middleware function based on Body Parser. When POST Request from client send to server is of content-type application/form-data-urlencoded, this middleware parses that data and made available in req.body object with key-value pairs.
app.use(express.urlencoded({extended: true, limit: "16kb"}));

// This is also a built-in middleware function provided by Express to serve static files in our application like images, CSS, JavaScript files, etc.
app.use(express.static("public"));
app.use(cookieParser());





export { app }