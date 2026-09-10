'use client';

import { memo } from 'react';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ContactForm from '../ContactForm/ContactForm';
import TopPageDecoration from '../TopPageDecoration/TopPageDecoration';
import { PAGE_OUTER_CLASSES, PAGE_INNER_CLASSES, PAGE_CARD_CLASSES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ContactItem {
  social: string;
  link: string;
  href: string;
  icon: string;
  color: string;
  hoverColor: string;
  description: string;
}

const SocialCard = memo(({ contact, index = 0 }: { contact: ContactItem; index?: number }) => (
  <a
    href={contact.href}
    target="_blank"
    rel="noopener noreferrer"
    className={`item-animate-${Math.min(index + 1, 3)} group/contact flex flex-col items-center justify-center gap-4 rounded-xl border
      border-slate-600/30 bg-slate-800/30 p-5 text-center backdrop-blur-sm transition-all
      duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-700/30
      hover:shadow-glow sm:min-w-0 sm:flex-1 lg:flex-row lg:items-center lg:justify-start
      lg:text-left`}
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

const ContactList = () => {
  const t = useTranslations('contact');
  const tTabs = useTranslations('tabsbar');

  const CONTACT_LINKS = [
    {
      social: 'Email',
      link: 'ruddy.autem@gmail.com',
      href: 'mailto:ruddy.autem@gmail.com',
      icon: '/contact-email.svg',
      color: 'bg-red-500/20',
      hoverColor: 'hover:bg-red-500/30',
      description: t('socials.email'),
    },
    {
      social: 'linkedIn',
      link: 'ruddyautem',
      href: 'https://www.linkedin.com/in/ruddyautem/',
      icon: '/contact-linkedin.svg',
      color: 'bg-blue-500/20',
      hoverColor: 'hover:bg-blue-500/30',
      description: t('socials.linkedin'),
    },
    {
      social: 'github',
      link: 'ruddyautem',
      href: 'https://github.com/ruddyautem/',
      icon: '/contact-github.svg',
      color: 'bg-gray-500/20',
      hoverColor: 'hover:bg-gray-500/30',
      description: t('socials.github'),
    },
  ];

  return (
    <div className={PAGE_OUTER_CLASSES}>
      <div className={PAGE_INNER_CLASSES}>
        <div className={PAGE_CARD_CLASSES}>
          <TopPageDecoration filename={tTabs('contact')} />

          <div className="flex w-full flex-col overflow-y-auto lg:h-full">
            <div
              className="border-b border-slate-700/30 px-4 py-4 text-center sm:p-6 md:p-8 2xl:py-6 3xl:p-14
                lg:shrink-0"
            >
              <h1
                className="item-animate mb-1.5 text-2xl font-bold text-white sm:mb-2.5 sm:text-3xl md:text-4xl 2xl:mb-2
                  2xl:text-4xl 3xl:mb-4 3xl:text-6xl"
              >
                {t('title')} <span className="text-accent">{t('titleAccent')}</span>
              </h1>
              <p className="item-animate mx-auto max-w-2xl text-xs text-slate-300 sm:text-base 2xl:text-base 3xl:text-2xl">
                {t('subtitle')}
              </p>
            </div>

            <div className="grid flex-1 grid-cols-1 lg:grid-cols-5">
              <div
                className="flex flex-col border-b border-slate-700/30 p-4 sm:p-6 2xl:p-7 3xl:p-12 lg:col-span-2
                  lg:border-r lg:border-b-0"
              >
                <div className="item-animate mb-4 text-center lg:mb-5 3xl:mb-8 lg:text-left">
                  <h2 className="mb-1.5 text-lg font-bold text-white 2xl:mb-2 2xl:text-xl 3xl:mb-3 3xl:text-2xl">
                    {t('networksTitle')}
                  </h2>
                  <div className="mx-auto h-1 w-12 rounded-full bg-accent lg:mx-0 3xl:w-16" />
                </div>

                <div
                  className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:flex-col lg:gap-4 3xl:gap-6"
                >
                  {CONTACT_LINKS.map((contact, index) => (
                    <SocialCard key={contact.social} contact={contact} index={index} />
                  ))}
                </div>

                <div
                  className="item-animate mt-4 border-t border-slate-700/30 pt-4 text-center lg:mt-auto lg:pt-6
                    3xl:mt-8 3xl:pt-8 lg:text-left"
                >
                  <div className="mb-2 flex items-center justify-center lg:justify-start 3xl:mb-3">
                    <div className="mr-2.5 h-2 w-2 rounded-full bg-green-400 3xl:h-2.5 3xl:w-2.5" />
                    <h3 className="text-sm font-bold text-white 2xl:text-base 3xl:text-lg">{t('responseTime')}</h3>
                  </div>
                  <p className="text-xs text-slate-300 2xl:text-sm 3xl:text-base">{t('hours24')}</p>
                </div>
              </div>

              <div className="flex flex-col p-4 sm:p-6 2xl:p-7 3xl:p-12 lg:col-span-3">
                <div className="item-animate mb-4 text-center lg:mb-5 3xl:mb-8 lg:text-left">
                  <h2 className="mb-1.5 text-lg font-bold text-white 2xl:mb-2 2xl:text-xl 3xl:mb-3 3xl:text-2xl">
                    {t('sendMessageTitle')}
                  </h2>
                  <p className="text-xs text-slate-300 2xl:text-sm 3xl:text-base">
                    {t('sendMessageSubtitle')}
                  </p>
                </div>

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