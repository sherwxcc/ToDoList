// Require node modules
const express = require("express");
const app = express();

// Setup middlewares
const cors = require("cors");
app.use(cors());
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup knex with postgreSQL database
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

// Setup auth
const auth = require("./auth/auth")(knex);
app.use(auth.initialize());

// Setup auth service and router
const AuthService = require("./Service/AuthService");
const AuthRouter = require("./Router/AuthRouter");
const authService = new AuthService(knex);
const authRouter = new AuthRouter(authService);

// Setup todo service and router
const ToDoService = require("./Service/TodoService");
const ToDoRouter = require("./Router/TodoRouter");
const toDoService = new ToDoService(knex);
const toDoRouter = new ToDoRouter(toDoService);

app.use("/", authRouter.router());
app.use("/todo", auth.authenticate(), toDoRouter.router());

// Set up port
const port = 8080;
app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});

module.exports = app;
