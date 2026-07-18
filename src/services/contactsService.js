import { writeFile, readFile } from "fs/promises";
// import { contacts } from "../../db/contacts.js";
import fs, { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contacts = path.join(__dirname, "../db/contacts.json");
export function getAllContacts() {
  const data = readFileSync(contacts, "utf-8");

  return JSON.parse(data);
}

export function getContactByIdOrNull(id) {
   const data = readFileSync(contacts, "utf-8");
  return data.find((contact) => String(contact.id) === String(id));
}

export async function  addContact(contactData) {
  const data = readFile(contacts, "utf-8")
  const parsed = JSON.parse(data)
  console.log(data)
  const nextId =
    (data.length ? Math.max(...data.map((contact) => contact.id)) : 0) +
    1;
  const newContact = {
    id: nextId,
    name: contactData.name,
    tel: contactData.tel,
    country: contactData.country,
  };
  parsed.push(newContact);

  await writeFile(dataPath, contacts)
  console.log(parsed);
  return newContact;
}

export function patchContact(id, updates) {
  const contact = getContactByIdOrNull(id);
  if (!contact) {
    return null;
  }

  return contact;
}

export function removeContact(id) {
  const index = contacts.findIndex(
    (contact) => String(contact.id) === String(id),
  );
  if (index === -1) {
    return false;
  }
  contacts.splice(index, 1);
  return true;
}
