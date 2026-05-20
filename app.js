import express from "express"
const app = express();

import { contacts } from "./db/contacts.js";

app.get("/", (req, res) => {
  res.send(contacts);
});

app.get("/:id", (req, res) => {
  res.send(contacts);
});


app.listen(1487, () => {
    console.log("server started")
})