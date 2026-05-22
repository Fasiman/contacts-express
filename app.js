import express from "express";
const app = express();

import { contacts } from "./db/contacts.js";

app.get("/", (req, res) => {
    res.send(contacts);
});

app.get("/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
        return res.status(404).send({ error: "Contact not found" });
    }
    const deleted = contacts.splice(index, 1)[0];
    res.send(deleted);
});

app.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const contact = contacts.find((contact) => contact.id === id);
    if (!contact) {
        return res.status(404).send({ error: "Contact not found" });
    }
    res.send(contact);
});

app.listen(1487, () => {
    console.log("server started");
});