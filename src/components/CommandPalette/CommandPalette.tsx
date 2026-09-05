'use client';

import { useEffect, useContext, useCallback } from 'react';
import { Command } from 'cmdk';
import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { ThemeContext } from '@/context/ThemeContext';
import { THEME_OPTIONS, THEME_DOT_COLORS, THEME_LABELS, LANGUAGES } from '@/lib/constants';
import {
  FileCode,
  FolderKanban,
  User,
  Mail,
  FileText,
  Globe,
  Copy,
  Download,
  Sliders,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CommandPalette({ open, setOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { theme, toggle: setTheme } = useContext(ThemeContext);
  const isFr = locale === 'fr';

  useEffect(() => {
    const down = (e) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === 'p' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  const runCommand = useCallback(
    (command) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command Menu"
    >
      <div cmdk-input-wrapper="">
        <Command.Input
          placeholder={
            isFr
              ? '> Tapez une commande ou le nom d\'un fichier...'
              : '> Type a command or file name to open...'
          }
        />
      </div>
      <Command.List>
        <Command.Empty>
          {isFr ? 'Aucun résultat trouvé.' : 'No results found.'}
        </Command.Empty>

        {/* Navigation Group */}
        <Command.Group heading={isFr ? 'Fichiers & Navigation' : 'Files & Navigation'}>
          <Command.Item
            onSelect={() => runCommand(() => router.push('/'))}
          >
            <FileCode className="h-4 w-4 text-accent" />
            <span>index.jsx (Home)</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => router.push('/about'))}
          >
            <User className="h-4 w-4 text-blue-400" />
            <span>about.html ({isFr ? 'À propos / Compétences' : 'About / Skills'})</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => router.push('/projects'))}
          >
            <FolderKanban className="h-4 w-4 text-amber-400" />
            <span>projects.js ({isFr ? 'Mes Projets' : 'Projects'})</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => router.push('/cv'))}
          >
            <FileText className="h-4 w-4 text-emerald-400" />
            <span>cv.json (Curriculum Vitae)</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => router.push('/contact'))}
          >
            <Mail className="h-4 w-4 text-pink-400" />
            <span>contact.css ({isFr ? 'Me contacter' : 'Contact Me'})</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => router.push('/settings'))}
          >
            <Sliders className="h-4 w-4 text-purple-400" />
            <span>settings.json ({isFr ? 'Paramètres IDE' : 'IDE Settings'})</span>
          </Command.Item>
        </Command.Group>

        {/* Themes Group */}
        <Command.Group heading={isFr ? 'Thèmes VS Code' : 'VS Code Themes'}>
          {THEME_OPTIONS.map((themeKey) => (
            <Command.Item
              key={themeKey}
              onSelect={() => runCommand(() => setTheme(themeKey))}
            >
              <span className={cn('h-2.5 w-2.5 rounded-full ring-1 ring-white/30', THEME_DOT_COLORS[themeKey])} />
              <span>{THEME_LABELS[themeKey] ?? themeKey}</span>
              {theme === themeKey && (
                <span className="ml-auto text-xs text-slate-500">{isFr ? '(Actif)' : '(Active)'}</span>
              )}
            </Command.Item>
          ))}
        </Command.Group>

        {/* Languages Group */}
        <Command.Group heading={isFr ? 'Langue / Language' : 'Language / Langue'}>
          {LANGUAGES.map((lang) => (
            <Command.Item
              key={lang.code}
              onSelect={() =>
                runCommand(() => {
                  if (locale !== lang.code) {
                    router.replace(pathname, { locale: lang.code });
                  }
                })
              }
            >
              <Globe className="h-4 w-4 text-slate-400" />
              <span>{lang.title}</span>
              {locale === lang.code && (
                <span className="ml-auto text-xs text-slate-500">{isFr ? '(Actuel)' : '(Current)'}</span>
              )}
            </Command.Item>
          ))}
        </Command.Group>

        {/* Quick Actions */}
        <Command.Group heading={isFr ? 'Actions Rapides' : 'Quick Actions'}>
          <Command.Item
            onSelect={() =>
              runCommand(() => {
                navigator.clipboard.writeText('ruddy.autem@gmail.com');
              })
            }
          >
            <Copy className="h-4 w-4 text-slate-400" />
            <span>{isFr ? 'Copier l\'adresse email' : 'Copy email address'}</span>
          </Command.Item>
          <Command.Item
            onSelect={() =>
              runCommand(() => {
                const pdf = isFr ? '/Autem_Ruddy_CV.pdf' : '/Autem_Ruddy_Resume.pdf';
                window.open(pdf, '_blank');
              })
            }
          >
            <Download className="h-4 w-4 text-slate-400" />
            <span>{isFr ? 'Télécharger le CV (PDF)' : 'Download CV / Resume (PDF)'}</span>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
