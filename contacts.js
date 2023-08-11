const fs = require("fs").promises
const path = require("path")
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");



// TODO: udokumentuj każdą funkcję
function listContacts() {
    return fs
        .readFile(contactsPath, "utf-8")
        .then((data) => JSON.parse(data))
        .catch((err) => {
            throw err;
        });
}


function getContactById(contactId) {
    return listContacts()
        .then((contacts) => {
            const contact = contacts.find((contact) => contact.id === contactId);
            if (contact) {
                return contact;
            } else {
                throw new Error("Contact not found");
            }
        })
        .catch((error) => {
            throw error;
        });
}




function removeContact(contactId) {
    return listContacts()
        .then((contacts) => {
            const updatedContacts = contacts.filter(contact => contact.id !== contactId);
            fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), 'utf8');
            return updatedContacts
        })
        .catch((error) => {
            throw error;
        });
}



function addContact(name, email, phone) {
    const newContact = { id: uuid.v4(), name, email, phone };
    return listContacts()
        .then((contacts) => {
            const updatedContacts = [...contacts, newContact];
            return fs.writeFile(
                contactsPath,
                JSON.stringify(updatedContacts, null, 2),
                "utf8"
            );
        })
        .catch((error) => {
            throw error;
        });
}


module.exports = { listContacts, getContactById, removeContact, addContact }