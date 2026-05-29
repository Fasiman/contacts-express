import express from "express";
import contactsRoute from "./src/routes/contactsRoute.js";

const app = express();
app.use(express.json());
app.use("/contacts", contactsRoute);

app.listen(1487, () => {
  console.log("server started on http://localhost:1487");
});
