import React from "react";
import ContactForm from "../ContactForm/ContactForm";
import Image from "next/image";

const myContacts = [
  {
    social: "email",
    link: "ruddy.autem@gmail.com",
    href: "mailto:ruddy.autem@gmail.com",
    icon: "/contact-email.svg",
  },
  {
    social: "linkedIn",
    link: "ruddyautem",
    href: "https://www.linkedin.com/in/ruddyautem/",
    icon: "/contact-linkedin.svg",
  },
  {
    social: "github",
    link: "ruddyautem",
    href: "https://github.com/ruddyautem/",
    icon: "/contact-github.svg",
  },
];

const ContactList = () => (
  <div className="flex flex-col gap-8 xl:flex-row">
    {/* Contact Links */}
    <div className="flex flex-1 flex-col">
      <div className="mb-6 rounded-lg bg-gray-400/5 p-6">
        <h2 className="mb-6 text-center text-xl font-bold sm:text-2xl md:text-left">
          Me contacter directement
        </h2>
        <div className="flex flex-col space-y-4">
          {myContacts.map((contact) => (
            <a
              key={contact.social}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-md bg-gray-400/5 transition-colors duration-200 hover:bg-gray-400/10 md:flex-row md:items-start"
            >
              <div className="bg-accent absolute inset-y-0 left-0 w-0.5 transition-opacity duration-200 group-hover:opacity-100" />
              <div className="flex w-full flex-col items-center gap-4 p-3 md:flex-row md:items-start">
                <div className="group-hover:bg-accent/10 flex h-10 w-10 items-center justify-center rounded-md bg-gray-400/10 transition-colors duration-200">
                  <Image
                    src={contact.icon}
                    alt={`${contact.social} icon`}
                    width={22}
                    height={22}
                    className="opacity-90 transition-opacity duration-200 group-hover:opacity-100"
                  />
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-sm text-gray-400 uppercase">
                    {contact.social}
                  </span>
                  <span className="text-accent">{contact.link}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="mx-4 hidden self-stretch xl:flex">
      <div className="bg-accent w-px opacity-30" />
    </div>

    {/* Contact Form */}
    <div className="flex flex-1 flex-col">
      <div className="mb-6 rounded-lg bg-gray-400/5 p-6">
        <h2 className="mb-6 text-center text-xl font-bold sm:text-2xl md:text-left">
          M&apos;envoyer un message
        </h2>
        <ContactForm />
      </div>
    </div>
  </div>
);

export default ContactList;
