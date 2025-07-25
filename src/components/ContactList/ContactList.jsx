"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactForm from "../ContactForm/ContactForm";
import Image from "next/image";
import { PageWrapper } from "../PageWrapper/PageWrapper";

const myContacts = [
  {
    social: "Email",
    link: "ruddy.autem@gmail.com",
    href: "mailto:ruddy.autem@gmail.com",
    icon: "/contact-email.svg",
    color: "bg-red-500",
    description: "Pour me contacter directement",
  },
  {
    social: "linkedIn",
    link: "ruddyautem",
    href: "https://www.linkedin.com/in/ruddyautem/",
    icon: "/contact-linkedin.svg",
    color: "bg-blue-500",
    description: "Réseau professionnel",
  },
  {
    social: "github",
    link: "ruddyautem",
    href: "https://github.com/ruddyautem/",
    icon: "/contact-github.svg",
    color: "bg-gray-800",
    description: "Codes et Projets récents",
  },
];

const ContactList = () => {
  return (
    <PageWrapper skipChildWrapping={true}>
      <div className="min-h-screen w-full">
        <div className="container mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
          <div className="item-animate mb-14 text-center">
            <h1 className="mb-5 text-3xl font-black text-white sm:text-4xl">
              Me Contacter
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Vous pouvez me contacter via le formulaire ci-dessous ou via mes
              réseaux.
            </p>
          </div>

          <div className="item-animate group">
            <div className="relative border-2 border-[#242936] bg-[#f5f5f5] text-[#242936] shadow-[9px_9px_0px_#242936] transition-all duration-300 group-hover:shadow-[0px_0px_35px_rgba(36,41,54,0.35)]">
              <div className="grid min-h-[650px] grid-cols-1 lg:grid-cols-5">
                <div className="border-r-0 border-b-2 border-[#242936] bg-white p-8 lg:col-span-2 lg:border-r-2 lg:border-b-0">
                  <div className="item-animate mb-8">
                    <h2 className="mb-3 text-xl font-black text-[#242936]">
                      Réseaux
                    </h2>
                    <div className="h-1 w-16 rounded-full bg-[#242936]"></div>
                  </div>

                  <div className="space-y-6">
                    {myContacts.map((contact, index) => (
                      <div key={contact.social} className="item-animate">
                        <a
                          href={contact.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/contact block transform rounded-xl border-2 border-gray-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#242936] hover:shadow-lg"
                        >
                          <div className="flex items-start">
                            <div
                              className={`${contact.color} mr-4 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover/contact:scale-110`}
                            >
                              <Image
                                src={contact.icon}
                                alt={`${contact.social} icon`}
                                width={24}
                                height={24}
                                className="brightness-0 invert"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="mb-1 text-lg font-bold text-[#242936] capitalize">
                                {contact.social}
                              </h3>
                              <p className="mb-2 text-sm text-gray-600">
                                {contact.description}
                              </p>
                              <div className="flex items-center text-xs font-medium text-[#242936] group-hover/contact:text-[#242936]">
                                <span className="truncate">{contact.link}</span>
                                <span className="ml-2 opacity-0 transition-opacity group-hover/contact:opacity-100">
                                  →
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Additional Info Section */}
                  <div className="item-animate mt-10 border-t-2 border-gray-100 pt-7">
                    <div className="mb-4 flex items-center">
                      <div className="mr-3 h-3 w-3 rounded-full bg-green-400" />
                      <h3 className="text-lg font-bold text-[#242936]">
                        Temps de réponse
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      Je m&apos;engage à répondre sous 24 heures.
                    </p>
                  </div>
                </div>

                {/* Contact Form - Wide Right Column */}
                <div className="p-8 lg:col-span-3">
                  <div className="item-animate mb-8">
                    <h2 className="mb-3 text-xl font-black text-[#242936]">
                      Envoyer un message
                    </h2>
                    <p className="text-gray-600">
                      Veuillez remplir le formulaire ci-dessous.
                    </p>
                  </div>

                  <div className="item-animate">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Container */}
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </PageWrapper>
  );
};

export default ContactList;
