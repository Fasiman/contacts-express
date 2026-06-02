import express from "express";
import contactsRoute from "./src/routes/contactsRoute.js";
import { errorHandler, notFoundHandler } from "./src/middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use("/contacts", contactsRoute);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(1487, () => {
  console.log("server started on http://localhost:1487");
});
