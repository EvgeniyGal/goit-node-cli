import {
  addContacts,
  getContactById,
  listContacts,
  removeContacts,
} from "./contacts.js";
import { program } from "commander";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(contact ?? "Contact not found");
      break;

    case "add":
      const newContact = await addContacts({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await removeContacts(id);
      console.log(removedContact ?? "Contact not found");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
