import {
  getAllContacts,
  getContactByIdOrNull,
  addContact,
  patchContact,
  removeContact,
} from "../services/contactsService.js";
import HttpError from "../helpers/HttpError.js";
import { contactSchema } from "../validators/contactValidator.js";
import { deleteContactSchema } from "../validators/contactValidator.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

export function getContacts(req, res) {
  res.send(getAllContacts());
}

export function getContactById(req, res) {
  const contact = getContactByIdOrNull(req.params.id);

  if (!contact) {
    return res.status(404).send({ error: "contact not found" });
  }
  res.send(contact);
}

export function createContact(req, res, next) {
  const { id, name, tel, country } = req.body;
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const newContact = addContact({ id, name, tel, country });
    res.status(201).send(newContact);
  } catch (error) {
    next(error);
  }
}

export function updateContact(req, res) {
  const contact = patchContact(req.params.id, req.body);
  if (!contact) {
    return res.status(404).send({ error: "contact not found" });
  }
  res.send(contact);
}

export function deleteContact(req, res, next) {
  try {
    const { error } = deleteContactSchema.validate(req.params);
    if (error) {
      throw HttpError(400, error.message);
    }

    const deleted = removeContact(req.params.id);
    if (!deleted) {
      return res.status(404).send({ error: "contact not found" });
    }
    res.send({ message: "contact deleted successfully" });
  } catch (error) {
    next(error);
  }
}
export default {
  getContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  deleteContact : ctrlWrapper(deleteContact)
}