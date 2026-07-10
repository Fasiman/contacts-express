import { contacts } from "../../db/contacts.js";

export function getAllContacts() {
  return contacts;
}

export function getContactByIdOrNull(id) {
  return contacts.find((contact) => String(contact.id) === String(id));
}

export function addContact(contactData) {
  const nextId = (contacts.length ? Math.max(...contacts.map((contact) => contact.id)) : 0) + 1;
  const newContact = {
    id: nextId,
    name: contactData.name,
    tel: contactData.tel,
    country: contactData.country,
  };
  contacts.push(newContact);
  return newContact;
}

export function patchContact(id, updates) {
  const contact = getContactByIdOrNull(id);
  if (!contact) {
    return null;
  }

  if (Object.prototype.hasOwnProperty.call(updates, "name")) {
    contact.name = updates.name;
  }
  if (Object.prototype.hasOwnProperty.call(updates, "tel")) {
    contact.tel = updates.tel;
  }
  if (Object.prototype.hasOwnProperty.call(updates, "country")) {
    contact.country = updates.country;
  }

  return contact;
}

export function removeContact(id) {
  const index = contacts.findIndex((contact) => String(contact.id) === String(id));
  if (index === -1) {
    return false;
  }
  contacts.splice(index, 1);
  return true;
}
