"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactForm from "../ContactForm/ContactForm";
import Image from "next/image";
import { PageWrapper } from "../PageWrapper/PageWrapper";
import TopPageDecoration from "../TopPageDecoration/TopPageDecoration";

const myContacts = [
  {
    social: "Email",
    link: "ruddy.autem@gmail.com",
    href: "mailto:ruddy.autem@gmail.com",
    icon: "/contact-email.svg",
    color: "bg-red-500/20",
    hoverColor: "hover:bg-red-500/30",
    description: "Pour me contacter",
  },
  {
    social: "linkedIn",
    link: "ruddyautem",
    href: "https://www.linkedin.com/in/ruddyautem/",
    icon: "/contact-linkedin.svg",
    color: "bg-blue-500/20",
    hoverColor: "hover:bg-blue-500/30",
    description: "Réseau professionnel",
  },
  {
    social: "github",
    link: "ruddyautem",
    href: "https://github.com/ruddyautem/",
    icon: "/contact-github.svg",
    color: "bg-gray-500/20",
    hoverColor: "hover:bg-gray-500/30",
    description: "Codes et Projets",
  },
];

const ContactList = () => {
  return (
    <PageWrapper skipChildWrapping={true}>
      <div className="3xl:p-20 flex w-full items-center justify-center overflow-x-hidden p-4 sm:p-6 md:p-8 xl:p-12 2xl:p-16">
        <div className="item-animate relative z-10 flex w-full max-w-6xl flex-col 2xl:max-w-[100rem]">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/20 backdrop-blur-xl sm:rounded-3xl">
            {/* Decorative header bar */}
            <TopPageDecoration filename="contact.css" />

            {/* Header Section */}
            <div className="item-animate border-b border-slate-700/30 p-6 text-center sm:p-8 md:p-10">
              <h1 className="item-animate mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl 2xl:text-6xl">
                Me <span className="text-accent">Contacter</span>
              </h1>
              <p className="item-animate mx-auto max-w-2xl text-lg text-slate-300 sm:text-xl 2xl:text-2xl">
                Vous pouvez me contacter via le formulaire ci-dessous ou via mes
                réseaux.
              </p>
            </div>

            {/* Main Content */}
            <div className="item-animate group">
              <div className="grid min-h-[650px] grid-cols-1 lg:grid-cols-5">
                {/* Left Side - Social Links */}
                <div className="border-b border-slate-700/30 p-8 lg:col-span-2 lg:border-r lg:border-b-0">
                  <div className="item-animate mb-8 text-center lg:text-left">
                    <h2 className="mb-3 text-xl font-bold text-white 2xl:text-2xl">
                      Réseaux
                    </h2>
                    <div className="bg-accent mx-auto h-1 w-16 rounded-full lg:mx-0"></div>
                  </div>

                  {/* Social buttons */}
                  <div className="flex flex-col gap-6 sm:flex-row sm:justify-center sm:gap-6 lg:flex-col lg:gap-6">
                    {myContacts.map((contact) => (
                      <a
                        key={contact.social}
                        href={contact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/contact hover:shadow-glow flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/30 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-700/30 sm:min-w-[0] sm:flex-1 lg:flex-row lg:items-start lg:justify-start lg:text-left"
                      >
                        <div
                          className={`${contact.color} ${contact.hoverColor} flex h-12 w-12 items-center justify-center rounded-xl border border-slate-600/30 transition-all duration-300 group-hover/contact:scale-110`}
                        >
                          <Image
                            src={contact.icon}
                            alt={`${contact.social} icon`}
                            width={20}
                            height={20}
                            className="brightness-0 invert"
                          />
                        </div>
                        <div className="flex w-full flex-col items-center lg:items-start">
                          <h3 className="mb-1 h-7 text-lg font-bold text-white capitalize">
                            {contact.social}
                          </h3>
                          <p className="mb-2 h-6 text-sm text-slate-300">
                            {contact.description}
                          </p>
                          <div className="group-hover/contact:text-accent relative flex w-full items-center justify-center text-xs font-medium text-slate-400 lg:justify-start">
                            <div className="flex w-full items-center justify-center overflow-hidden lg:justify-start">
                              <span className="transform truncate transition-transform duration-300 ease-in-out sm:mt-4 md:group-hover/contact:-translate-x-1 lg:mt-0 lg:group-hover/contact:translate-x-0">
                                {contact.link}
                              </span>
                              <span className="absolute hidden opacity-0 transition-all duration-300 ease-in-out group-hover/contact:opacity-100 sm:mt-4 md:static md:flex md:translate-x-2 md:transform md:group-hover/contact:translate-x-1 lg:mt-0 lg:ml-2">
                                →
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="item-animate mt-10 border-t border-slate-700/30 pt-7 text-center lg:text-left">
                    <div className="mb-4 flex items-center justify-center lg:justify-start">
                      <div className="mr-3 h-3 w-3 rounded-full bg-green-400" />
                      <h3 className="text-lg font-bold text-white">
                        Temps de réponse
                      </h3>
                    </div>
                    <p className="text-slate-300">24 heures</p>
                  </div>
                </div>

                {/* Right Side - Contact Form */}
                <div className="p-8 lg:col-span-3">
                  <div className="item-animate mb-8 text-center lg:text-left">
                    <h2 className="mb-3 text-xl font-bold text-white 2xl:text-2xl">
                      Envoyer un message
                    </h2>
                    <p className="text-slate-300">
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
          theme="dark"
        />
      </div>
    </PageWrapper>
  );
};

export default ContactList;
