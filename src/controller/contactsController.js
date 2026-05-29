import {
  getAllContacts,
  getContactByIdOrNull,
  addContact,
  patchContact,
  removeContact,
} from "../services/contactsService.js";

export function getContacts(req, res) {
  res.send(getAllContacts());
}

export function getContactById(req, res) {
  const contact = getContactByIdOrNull(req.params.id);
  if (!contact) {
    return res.status(404).send({ error: "ontact not found" });
  }
  res.send(contact);
}

export function createContact(req, res) {
  const { id, name, tel, country } = req.body;
  const newContact = addContact({ id, name, tel, country });
  res.status(201).send(newContact);
}

export function updateContact(req, res) {
  const contact = patchContact(req.params.id, req.body);
  if (!contact) {
    return res.status(404).send({ error: "contact not found" });
  }
  res.send(contact);
}

export function deleteContact(req, res) {
  const deleted = removeContact(req.params.id);
  if (!deleted) {
    return res.status(404).send({ error: "contact not found" });
  }
  res.send({ message: "contact deleted successfully" });
}
