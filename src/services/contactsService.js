import { writeFile, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function readContacts() {
  const data = await readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export async function getAllContacts() {
  return await readContacts();
}

export async function getContactByIdOrNull(id) {
  const contacts = await readContacts();
  return contacts.find((contact) => String(contact.id) === String(id)) || null;
}

export async function addContact(contactData) {
  const contacts = await readContacts();
  const ids = contacts
    .map((contact) => contact.id)
    .filter((id) => typeof id === 'number');

  const nextId = (ids.length > 0 ? Math.max(...ids) : 0) + 1;
  const newContact = {
    id: nextId,
    ...contactData,
  };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

export async function patchContact(id, updates) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => String(contact.id) === String(id));
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...updates };
  await writeContacts(contacts);
  return contacts[index];
}

export async function removeContact(id) {
  const contacts = await readContacts();
  const index = contacts.findIndex(
    (contact) => String(contact.id) === String(id),
  );
  if (index === -1) {
    return false;
  }
  contacts.splice(index, 1);
  await writeContacts(contacts);
  return true;
}
