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

export const getContacts = ctrlWrapper(async (req, res) => {
  const contacts = await getAllContacts();
  res.send(contacts);
});

export const getContactById = ctrlWrapper(async (req, res) => {
  const contact = await getContactByIdOrNull(req.params.id);

  if (!contact) {
    return res.status(404).send({ error: "contact not found" });
  }
  res.send(contact);
});

export const createContact = ctrlWrapper(async (req, res) => {
  const { error } = contactSchema.validate(req.body, { abortEarly: false });

  if (error) {
    throw HttpError(400, error.message);
  }

  const newContact = await addContact(req.body);
  res.status(201).send(newContact);
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const { error } = updateContactSchema.validate(req.body, { abortEarly: false });
  if (error) {
    throw HttpError(400, error.message);
  }

  const contact = await patchContact(req.params.id, req.body);
  if (!contact) {
    return res.status(404).send({ error: "contact not found" });
  }
  res.send(contact);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { error } = deleteContactSchema.validate(req.params);
  if (error) {
    throw HttpError(400, error.message);
  }

  const deleted = await removeContact(req.params.id);
  if (!deleted) {
    return res.status(404).send({ error: "contact not found" });
  }
  res.send({ message: "contact deleted successfully" });
});