'use client';

import { memo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import ContactForm from '../ContactForm/ContactForm';
import TopPageDecoration from '../TopPageDecoration/TopPageDecoration';

// ============================================================================
// DONNÉES
// ============================================================================

const CONTACT_LINKS = [
  {
    social: 'Email',
    link: 'ruddy.autem@gmail.com',
    href: 'mailto:ruddy.autem@gmail.com',
    icon: '/contact-email.svg',
    color: 'bg-red-500/20',
    hoverColor: 'hover:bg-red-500/30',
    description: 'Pour me contacter',
  },
  {
    social: 'linkedIn',
    link: 'ruddyautem',
    href: 'https://www.linkedin.com/in/ruddyautem/',
    icon: '/contact-linkedin.svg',
    color: 'bg-blue-500/20',
    hoverColor: 'hover:bg-blue-500/30',
    description: 'Réseau professionnel',
  },
  {
    social: 'github',
    link: 'ruddyautem',
    href: 'https://github.com/ruddyautem/',
    icon: '/contact-github.svg',
    color: 'bg-gray-500/20',
    hoverColor: 'hover:bg-gray-500/30',
    description: 'Codes et Projets',
  },
];

// ============================================================================
// SOUS-COMPOSANTS
// ============================================================================

const SocialCard = memo(({ contact }) => (
  <a
    href={contact.href}
    target="_blank"
    rel="noopener noreferrer"
    // Ajout de item-animate sur chaque carte de réseau social
    className="item-animate group/contact flex flex-col items-center justify-center gap-4 rounded-xl border
      border-slate-600/30 bg-slate-800/30 p-5 text-center backdrop-blur-sm transition-all
      duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-700/30
      hover:shadow-glow sm:min-w-0 sm:flex-1 lg:flex-row lg:items-center lg:justify-start
      lg:text-left"
  >
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border
        border-slate-600/30 transition-all duration-300 group-hover/contact:scale-110
        ${contact.color} ${contact.hoverColor}`}
    >
      <Image
        src={contact.icon}
        alt={`${contact.social} icon`}
        width={20}
        height={20}
        className="brightness-0 invert"
      />
    </div>

    <div className="flex w-full min-w-0 flex-col items-center lg:items-start">
      <h3 className="mb-1 h-7 truncate text-lg font-bold capitalize text-white">
        {contact.social}
      </h3>
      <p className="mb-2 h-6 w-full truncate text-sm text-slate-300">{contact.description}</p>
      <div
        className="relative flex w-full items-center justify-center text-xs font-medium
          text-slate-400 transition-colors duration-300 group-hover/contact:text-accent
          lg:justify-start"
      >
        <div className="flex w-full items-center justify-center overflow-hidden lg:justify-start">
          <span
            className="transform truncate transition-transform duration-300 ease-in-out sm:mt-4
              md:group-hover/contact:-translate-x-1 lg:mt-0 lg:group-hover/contact:translate-x-0"
          >
            {contact.link}
          </span>
          <span
            className="absolute hidden opacity-0 transition-all duration-300 ease-in-out
              group-hover/contact:opacity-100 sm:mt-4 md:static md:flex md:translate-x-2
              md:transform md:group-hover/contact:translate-x-1 lg:mt-0 lg:ml-2"
          >
            →
          </span>
        </div>
      </div>
    </div>
  </a>
));
SocialCard.displayName = 'SocialCard';

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

const ContactList = () => {
  return (
    <div
      className="box-border flex h-auto min-h-screen w-full flex-col items-center justify-start
        overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:h-full lg:min-h-0 lg:justify-center
        lg:overflow-hidden lg:p-6 2xl:p-10 3xl:p-16"
    >
      {/* J'ai retiré item-animate d'ici pour que la frame de base ne bouge pas, mais que le contenu oui */}
      <div className="relative z-10 flex w-full max-w-6xl flex-col 2xl:max-w-400">
        <div
          className="flex h-auto w-full max-w-full flex-col overflow-hidden rounded-2xl border
            border-slate-700/50 bg-slate-800/20 shadow-2xl backdrop-blur-xl sm:rounded-3xl lg:h-full
            lg:max-h-[85vh] 2xl:max-h-[90vh] 3xl:max-h-[90vh]"
        >
          <TopPageDecoration filename="contact.css" />

          <div className="flex w-full flex-col overflow-y-auto lg:h-full">
            <div
              className="border-b border-slate-700/30 p-6 text-center sm:p-8 md:p-10
                lg:shrink-0"
            >
              {/* Le titre arrive en premier */}
              <h1
                className="item-animate mb-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl 2xl:mb-4
                  2xl:text-6xl"
              >
                Me <span className="text-accent">Contacter</span>
              </h1>
              {/* Le sous-titre arrive en second */}
              <p className="item-animate mx-auto max-w-2xl text-base text-slate-300 sm:text-lg 2xl:text-2xl">
                Vous pouvez me contacter via le formulaire ci-dessous ou via mes réseaux.
              </p>
            </div>

            <div className="grid flex-1 grid-cols-1 lg:grid-cols-5">
              <div
                className="flex flex-col border-b border-slate-700/30 p-6 sm:p-8 lg:col-span-2
                  lg:border-r lg:border-b-0"
              >
                {/* L'en-tête "Réseaux" arrive */}
                <div className="item-animate mb-6 text-center lg:mb-8 lg:text-left">
                  <h2 className="mb-2 text-xl font-bold text-white 2xl:mb-3 2xl:text-2xl">
                    Réseaux
                  </h2>
                  <div className="mx-auto h-1 w-16 rounded-full bg-accent lg:mx-0" />
                </div>

                <div
                  className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:flex-col lg:gap-6"
                >
                  {CONTACT_LINKS.map((contact) => (
                    <SocialCard key={contact.social} contact={contact} />
                  ))}
                </div>

                {/* Le bloc stats en bas à gauche */}
                <div
                  className="item-animate mt-8 border-t border-slate-700/30 pt-6 text-center lg:mt-auto lg:pt-8
                    lg:text-left"
                >
                  <div className="mb-3 flex items-center justify-center lg:justify-start">
                    <div className="mr-3 h-2.5 w-2.5 rounded-full bg-green-400" />
                    <h3 className="text-base font-bold text-white 2xl:text-lg">Temps de réponse</h3>
                  </div>
                  <p className="text-sm text-slate-300 2xl:text-base">24 heures</p>
                </div>
              </div>

              <div className="flex flex-col p-6 sm:p-8 lg:col-span-3">
                {/* L'en-tête "Envoyer un message" arrive */}
                <div className="item-animate mb-6 text-center lg:mb-8 lg:text-left">
                  <h2 className="mb-2 text-xl font-bold text-white 2xl:mb-3 2xl:text-2xl">
                    Envoyer un message
                  </h2>
                  <p className="text-sm text-slate-300 2xl:text-base">
                    Veuillez remplir le formulaire ci-dessous.
                  </p>
                </div>

                {/* Le formulaire arrive en dernier */}
                <div className="item-animate flex-1">
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
  );
};

export default ContactList;