import {
  getAllContacts,
  getContactByIdOrNull,
  addContact,
  patchContact,
  removeContact,
} from "../services/contactsService.js";
import HttpError from "../helpers/HttpError.js";
import { contactSchema, updateContactSchema, deleteContactSchema } from "../validators/contactValidator.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

export const getContacts = ctrlWrapper((req, res) => {
  console.log(getAllContacts())
  res.send(getAllContacts());
});

export const getContactById = ctrlWrapper((req, res) => {
  const contact = getContactByIdOrNull(req.params.id);

  if (!contact) {
    return res.status(404).send({ error: "contact not found" });
  }
  res.send(contact);
});

export const createContact = ctrlWrapper((req, res) => {
  const { error } = contactSchema.validate(req.body, { abortEarly: false });
  console.log(req.body)

  if (error) {
    throw HttpError(400, error.message);
  }

  const newContact = addContact(req.body);
  res.status(201).send(newContact);
});

export const updateContact = ctrlWrapper((req, res) => {
  const { error } = updateContactSchema.validate(req.body, { abortEarly: false });
  if (error) {
    throw HttpError(400, error.message);
  }

  const contact = patchContact(req.params.id, req.body);
  if (!contact) {
    return res.status(404).send({ error: "contact not found" });
  }
  res.send(contact);
});

export const deleteContact = ctrlWrapper((req, res) => {
  const { error } = deleteContactSchema.validate(req.params);
  if (error) {
    throw HttpError(400, error.message);
  }

  const deleted = removeContact(req.params.id);
  if (!deleted) {
    return res.status(404).send({ error: "contact not found" });
  }
  res.send({ message: "contact deleted successfully" });
});