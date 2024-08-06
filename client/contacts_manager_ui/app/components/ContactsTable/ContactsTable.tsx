"use client";
import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader/TableHeader";
import { getContacts } from "@/app/services/api/contacts/contacts";
import { Contact } from "@/app/services/api/contacts/types";
import TableRow from "./TableRow/TableRow";

const ContactsTable = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  useEffect(() => {
    getContacts().then((response) => {
      setContacts(response);
    });
  }, []);

  return (
    <div className="m-4 border rounded-lg w-2/3 mx-auto">
      <TableHeader />
      <>
        {contacts.map((contact, index) => {
          const isLast = index == contacts.length - 1;
          return (
            <TableRow key={contact.id} isLast={isLast} contact={contact} />
          );
        })}
      </>
    </div>
  );
};

export default ContactsTable;
