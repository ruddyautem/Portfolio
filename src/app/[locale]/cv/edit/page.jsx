'use client';

import React, { useRef, useState, useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper/PageWrapper';
import { getCvData } from '@/lib/cvData';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';

const N = '#192a56';
const DIVIDER = `${N}18`;
const PILL = { background: N, color: '#fff', fontWeight: 600 };

const inputCls =
  'w-full rounded-lg border border-slate-600 bg-slate-700/60 px-3 py-2 text-sm text-slate-100 placeholder-slate-400 outline-none focus:border-[#4a6cf7] focus:ring-2 focus:ring-[#4a6cf7]/30 transition';
const labelCls = 'block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1';
const addBtnCls =
  'flex items-center gap-1.5 rounded-lg bg-[#192a56] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#243a6b] transition';
const xBtnCls =
  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 text-sm font-bold transition';

const Field = ({ label, value, onChange, textarea = false, rows = 3, placeholder = '' }) => (
  <div className="mb-3 last:mb-0">
    {label && <label className={labelCls}>{label}</label>}
    {textarea ? (
      <textarea
        rows={rows}
        className={inputCls}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <input
        className={inputCls}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
);

const XBtn = ({ onClick, mt }) => (
  <button onClick={onClick} className={`${xBtnCls}${mt ? ' mt-4' : ''}`}>
    ×
  </button>
);

const EditorSection = ({ title, onAdd, addLabel, children }) => (
  <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800/60 p-4">
    <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-slate-300">{title}</p>
    {children}
    {onAdd && addLabel && (
      <button onClick={onAdd} className={`${addBtnCls} mt-3 w-full justify-center`}>
        {addLabel}
      </button>
    )}
  </div>
);

// 🔥 FIX: Updated code generator to output `export const getCvData = (t) => ({...})`
function generateCvPageCode(data) {
  const esc = (s) => s.replace(/'/g, "\\'").replace(/`/g, '\\`');
  
  return `export const getCvData = (t) => ({
  name: '${esc(data.name)}',
  title: '${esc(data.title)}',
  about: '${esc(data.about)}',
  contacts: [
${data.contacts.map((c) => `    { icon: '${c.icon}', text: '${esc(c.text)}'${c.link ? `, link: '${esc(c.link)}'` : ''} },`).join('\n')}
  ],
  skillGroups: [
${data.skillGroups.map((g) => `    {\n      label: '${esc(g.label)}',\n      skills: [${g.skills.map((s) => `'${esc(s)}'`).join(', ')}],\n    },`).join('\n')}
  ],
  projects: [
${data.projects.map((p) => `    {\n      title: '${esc(p.title)}',\n      year: '${p.year}',\n      link: '${esc(p.link ?? '')}',\n      points: [\n${p.points.map((pt) => `        "${esc(pt)}",`).join('\n')}\n      ],\n    },`).join('\n')}
  ],
  formations: [
${data.formations.map((f) => `    { title: '${esc(f.title)}', institution: '${esc(f.institution)}', year: '${f.year}' },`).join('\n')}
  ],
  languages: [
${data.languages.map((l) => `    { language: '${esc(l.language)}', level: '${esc(l.level)}' },`).join('\n')}
  ],
});
`;
}

function resolveContactHref(c) {
  const text = (c.text || '').trim();
  const icon = (c.icon || '').toLowerCase();
  const link = (c.link || '').trim();

  if (link) {
    if (/^(mailto:|tel:|https?:\/\/)/.test(link)) return link;
    if (link.includes('@')) return `mailto:${link}`;
    return `https://${link}`;
  }
  if (text.includes('@')) return `mailto:${text}`;
  if (
    /^\+?[\d\s\-\.\(\)]{7,}$/.test(text) ||
    icon.includes('phone') ||
    icon.includes('tel') ||
    icon.includes('mobile')
  ) {
    return `tel:${text.replace(/[\s\-\.\(\)]/g, '')}`;
  }
  if (text.startsWith('http://') || text.startsWith('https://')) return text;
  if (text.startsWith('www.')) return `https://${text}`;

  const socialIcons = [
    'linkedin',
    'github',
    'twitter',
    'instagram',
    'web',
    'site',
    'globe',
    'link',
    'portfolio',
    'behance',
    'dribbble',
  ];
  if (socialIcons.some((s) => icon.includes(s))) {
    if (text.includes('.') || text.startsWith('/')) return `https://${text.replace(/^\/+/, '')}`;
  }
  return null;
}

const SectionTitle = ({ children }) => (
  <div style={{ marginBottom: '3.5mm', display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <h3
      style={{
        fontSize: '9.5pt',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: N,
        margin: 0,
        fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
      }}
    >
      {children}
    </h3>
    <div
      style={{ height: '3px', width: '36px', borderRadius: '999px', background: N, opacity: 0.75 }}
    />
  </div>
);

const RSection = ({ children, style }) => (
  <div
    style={{ padding: '5mm 15mm', borderBottom: `1.5px solid ${DIVIDER}`, flexShrink: 0, ...style }}
  >
    {children}
  </div>
);

const A4_W = 794;
const A4_H = 1123;

const ResumePreview = React.forwardRef(({ data, t }, ref) => (
  <div
    ref={ref}
    style={{
      fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
      background: '#ffffff',
      color: '#1a1a2e',
      width: A4_W,
      height: A4_H,
      boxSizing: 'border-box',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div
      style={{
        padding: '8mm 15mm 3mm',
        textAlign: 'center',
        background: `${N}04`,
        borderBottom: `1.5px solid ${DIVIDER}`,
        flexShrink: 0,
      }}
    >
      <h1
        style={{
          fontSize: '32pt',
          fontWeight: 900,
          color: N,
          margin: '0 0 2px',
          letterSpacing: '-0.4px',
          lineHeight: 1.05,
          fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
        }}
      >
        {data.name}
      </h1>
      <p
        style={{
          fontSize: '13.5pt',
          fontStyle: 'italic',
          fontWeight: 500,
          color: `${N}88`,
          margin: '0 0 14px',
        }}
      >
        {data.title}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px 8px' }}>
        {data.contacts.map((c, i) => {
          const href = resolveContactHref(c);
          const isExternal = href && !href.startsWith('mailto:') && !href.startsWith('tel:');
          const chipStyle = {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            border: `1px solid ${N}15`,
            background: `${N}08`,
            borderRadius: '999px',
            padding: '4px 12px',
            fontSize: '8.5pt',
            color: N,
            textDecoration: 'none',
          };
          const content = (
            <>
              <Image
                src={`/${c.icon.replace(/^\//, '')}`}
                alt=""
                width={14}
                height={14}
                unoptimized
                priority={false}
                style={{ display: 'block', flexShrink: 0 }}
              />
              {c.text}
            </>
          );
          return href ? (
            <a
              key={i}
              href={href}
              target={isExternal ? '_blank' : '_self'}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              style={chipStyle}
            >
              {content}
            </a>
          ) : (
            <span key={i} style={chipStyle}>
              {content}
            </span>
          );
        })}
      </div>
    </div>

    <RSection>
      <SectionTitle>{t('preview.about')}</SectionTitle>
      <p style={{ fontSize: '8.5pt', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
        {data.about}
      </p>
    </RSection>

    <RSection style={{ padding: '6mm 15mm' }}>
      <SectionTitle>{t('preview.skills')}</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {data.skillGroups.map((group, gi) => (
          <div key={gi} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span
              style={{
                width: '20mm',
                flexShrink: 0,
                fontSize: '7pt',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.09em',
                color: `${N}100`,
                marginTop: '5px',
              }}
            >
              {group.label}
            </span>
            <div
              style={{ width: '1px', alignSelf: 'stretch', background: DIVIDER, flexShrink: 0 }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {group.skills.map((skill, si) => (
                <span
                  key={si}
                  style={{ ...PILL, borderRadius: '6px', padding: '4px 14px', fontSize: '9.2pt' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </RSection>

    <RSection>
      <SectionTitle>{t('preview.projects')}</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5mm' }}>
        {data.projects.map((proj, pi) => (
          <div key={pi}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '3px',
                gap: '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  flexWrap: 'wrap',
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <span
                  style={{
                    height: '6px',
                    width: '6px',
                    borderRadius: '50%',
                    background: N,
                    display: 'inline-block',
                    flexShrink: 0,
                    position: 'relative',
                    top: '-1px',
                  }}
                />
                <span
                  style={{
                    fontWeight: 800,
                    color: N,
                    fontSize: '10.5pt',
                    fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
                    minWidth: 0,
                    wordBreak: 'break-word',
                  }}
                >
                  {proj.title}
                </span>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '8pt',
                      color: N,
                      fontWeight: 600,
                      textDecoration: 'none',
                      minWidth: 0,
                      wordBreak: 'break-all',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    ({proj.link.replace(/^https?:\/\//, '').replace(/\/$/, '')})
                  </a>
                )}
              </div>
              <span
                style={{
                  ...PILL,
                  borderRadius: '999px',
                  padding: '2px 12px',
                  fontSize: '8.7pt',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {proj.year}
              </span>
            </div>
            <ul style={{ margin: 0, marginTop: '4px', paddingLeft: '14px', listStyleType: 'none' }}>
              {proj.points.map((pt, pti) => (
                <li
                  key={pti}
                  style={{
                    fontSize: '8pt',
                    color: '#4b5563',
                    marginBottom: '2px',
                    lineHeight: 1.55,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: `${N}55`,
                      flexShrink: 0,
                      marginTop: '5px',
                    }}
                  />
                  <span style={{ flex: 1, minWidth: 0 }}>{pt}</span>
                </li>
              ))}
            </ul>
            {pi < data.projects.length - 1 && (
              <div style={{ height: '1px', background: DIVIDER, marginTop: '3.5mm' }} />
            )}
          </div>
        ))}
      </div>
    </RSection>

    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '3fr 2fr', overflow: 'hidden' }}>
      <div style={{ padding: '5mm 15mm', borderRight: `1.5px solid ${DIVIDER}` }}>
        <SectionTitle>{t('preview.education')}</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5mm' }}>
          {data.formations.map((f, fi) => (
            <div
              key={fi}
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                paddingBottom: fi < data.formations.length - 1 ? '3.5mm' : 0,
                borderBottom: fi < data.formations.length - 1 ? `1px solid ${DIVIDER}` : 'none',
              }}
            >
              <span
                style={{
                  ...PILL,
                  borderRadius: '6px',
                  padding: '3px 9px',
                  fontSize: '8.7pt',
                  flexShrink: 0,
                }}
              >
                {f.year}
              </span>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    color: N,
                    fontSize: '8.5pt',
                    margin: '0 0 1px',
                    fontFamily: "'Inter','Segoe UI',Arial,sans-serif",
                  }}
                >
                  {f.title}
                </p>
                <p style={{ fontStyle: 'italic', color: '#6b7280', fontSize: '7.5pt', margin: 0 }}>
                  {f.institution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '5mm 15mm' }}>
        <SectionTitle>{t('preview.languages')}</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {data.languages.map((l, li) => (
            <div
              key={li}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: `${N}0d`,
                borderRadius: '8px',
                padding: '6px 11px',
              }}
            >
              <span style={{ fontWeight: 600, color: N, fontSize: '9pt' }}>{l.language}</span>
              <span
                style={{
                  ...PILL,
                  borderRadius: '999px',
                  padding: '1px 10px',
                  fontSize: '8pt',
                  fontWeight: 500,
                }}
              >
                {l.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
));
ResumePreview.displayName = 'ResumePreview';

function ScaledPreview({ data, previewRef, t }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const s = Math.min(1, (el.clientWidth - 48) / A4_W, (el.clientHeight - 48) / A4_H);
      setScale(s > 0 ? s : 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: A4_W * scale,
          height: A4_H * scale,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: A4_W,
            height: A4_H,
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
            boxShadow: '0 4px 40px rgba(0,0,0,0.6)',
            overflow: 'hidden',
            background: '#fff',
          }}
        >
          <ResumePreview ref={previewRef} data={data} t={t} />
        </div>
      </div>
    </div>
  );
}

const EditorPanel = ({ data, setData, t }) => {
  const update = (key, val) => setData((prev) => ({ ...prev, [key]: val }));
  const updateAt = (key, i, field, val) =>
    update(
      key,
      data[key].map((item, idx) => (idx === i ? { ...item, [field]: val } : item)),
    );
  const addTo = (key, item) => update(key, [...data[key], item]);
  const removeFrom = (key, i) =>
    update(
      key,
      data[key].filter((_, idx) => idx !== i),
    );

  return (
    <div className="flex flex-col p-4">
      <EditorSection title={t('editor.identity')}>
        <Field label={t('editor.fullName')} value={data.name} onChange={(v) => update('name', v)} />
        <Field
          label={t('editor.jobTitle')}
          value={data.title}
          onChange={(v) => update('title', v)}
        />
        <Field
          label={t('editor.about')}
          value={data.about}
          onChange={(v) => update('about', v)}
          textarea
          rows={5}
        />
      </EditorSection>

      <EditorSection
        title={t('editor.contacts')}
        addLabel={t('editor.addContact')}
        onAdd={() => addTo('contacts', { icon: 'mailIcon.svg', text: '', link: '' })}
      >
        <div className="flex flex-col gap-3">
          {data.contacts.map((c, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg border border-slate-700 p-3">
              <div className="flex flex-1 flex-col">
                <Field
                  label={t('editor.icon')}
                  value={c.icon}
                  onChange={(v) => updateAt('contacts', i, 'icon', v)}
                />
                <Field
                  label={t('editor.text')}
                  value={c.text}
                  onChange={(v) => updateAt('contacts', i, 'text', v)}
                  placeholder={t('editor.textPlaceholder')}
                />
                <Field
                  label={t('editor.link')}
                  value={c.link ?? ''}
                  onChange={(v) => updateAt('contacts', i, 'link', v)}
                  placeholder={t('editor.linkPlaceholder')}
                />
              </div>
              <XBtn onClick={() => removeFrom('contacts', i)} mt />
            </div>
          ))}
        </div>
      </EditorSection>

      <EditorSection
        title={t('editor.skills')}
        addLabel={t('editor.addGroup')}
        onAdd={() => addTo('skillGroups', { label: t('editor.newCategory'), skills: [] })}
      >
        <div className="flex flex-col gap-4">
          {data.skillGroups.map((group, gi) => (
            <div key={gi} className="rounded-lg border border-slate-700 p-3">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex-1">
                  <Field
                    label={t('editor.category')}
                    value={group.label}
                    onChange={(v) => updateAt('skillGroups', gi, 'label', v)}
                  />
                </div>
                <XBtn onClick={() => removeFrom('skillGroups', gi)} mt />
              </div>
              <label className={labelCls}>{t('editor.skillsList')}</label>
              <textarea
                rows={2}
                className={inputCls}
                value={group.skills.join(', ')}
                onChange={(e) =>
                  update(
                    'skillGroups',
                    data.skillGroups.map((g, i) =>
                      i === gi
                        ? {
                            ...g,
                            skills: e.target.value
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean),
                          }
                        : g,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      </EditorSection>

      <EditorSection
        title={t('editor.projects')}
        addLabel={t('editor.addProject')}
        onAdd={() =>
          addTo('projects', {
            title: t('editor.newProject'),
            year: '2025',
            link: '',
            points: [t('editor.newDescription')],
          })
        }
      >
        <div className="flex flex-col gap-4">
          {data.projects.map((proj, pi) => (
            <div key={pi} className="rounded-lg border border-slate-700 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">
                  {t('editor.project')} {pi + 1}
                </span>
                <XBtn onClick={() => removeFrom('projects', pi)} />
              </div>
              <Field
                label={t('editor.projectTitle')}
                value={proj.title}
                onChange={(v) => updateAt('projects', pi, 'title', v)}
              />
              <div className="flex gap-2">
                <div className="w-20">
                  <Field
                    label={t('editor.year')}
                    value={proj.year}
                    onChange={(v) => updateAt('projects', pi, 'year', v)}
                  />
                </div>
                <div className="flex-1">
                  <Field
                    label={t('editor.link')}
                    value={proj.link ?? ''}
                    onChange={(v) => updateAt('projects', pi, 'link', v)}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <label className={labelCls}>{t('editor.pointsList')}</label>
              <textarea
                rows={4}
                className={inputCls}
                value={proj.points.join('\n')}
                onChange={(e) =>
                  update(
                    'projects',
                    data.projects.map((p, i) =>
                      i === pi
                        ? {
                            ...p,
                            points: e.target.value
                              .split('\n')
                              .map((s) => s.trim())
                              .filter(Boolean),
                          }
                        : p,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      </EditorSection>

      <EditorSection
        title={t('editor.education')}
        addLabel={t('editor.addEducation')}
        onAdd={() =>
          addTo('formations', {
            title: t('editor.newEducation'),
            institution: t('editor.newInstitution'),
            year: '2024',
          })
        }
      >
        <div className="flex flex-col gap-4">
          {data.formations.map((f, fi) => (
            <div key={fi} className="rounded-lg border border-slate-700 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">
                  {t('editor.educationItem')} {fi + 1}
                </span>
                <XBtn onClick={() => removeFrom('formations', fi)} />
              </div>
              <Field
                label={t('editor.projectTitle')}
                value={f.title}
                onChange={(v) => updateAt('formations', fi, 'title', v)}
              />
              <div className="flex gap-2">
                <div className="w-20">
                  <Field
                    label={t('editor.year')}
                    value={f.year}
                    onChange={(v) => updateAt('formations', fi, 'year', v)}
                  />
                </div>
                <div className="flex-1">
                  <Field
                    label={t('editor.institution')}
                    value={f.institution}
                    onChange={(v) => updateAt('formations', fi, 'institution', v)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </EditorSection>

      <EditorSection
        title={t('editor.languages')}
        addLabel={t('editor.addLanguage')}
        onAdd={() => addTo('languages', { language: t('editor.newLanguage'), level: 'A1' })}
      >
        <div className="flex flex-col gap-3">
          {data.languages.map((l, li) => (
            <div key={li} className="flex items-center gap-2">
              <div className="flex flex-1 gap-2">
                <div className="flex-1">
                  <Field
                    label={t('editor.language')}
                    value={l.language}
                    onChange={(v) => updateAt('languages', li, 'language', v)}
                  />
                </div>
                <div className="w-20">
                  <Field
                    label={t('editor.level')}
                    value={l.level}
                    onChange={(v) => updateAt('languages', li, 'level', v)}
                  />
                </div>
              </div>
              <XBtn onClick={() => removeFrom('languages', li)} mt />
            </div>
          ))}
        </div>
      </EditorSection>
    </div>
  );
};

export default function CVBuilder() {
  const locale = useLocale();
  const tData = useTranslations('cvData');
  const t = useTranslations('cvBuilder');

  const [data, setData] = useState(() => getCvData(tData));
  const [copied, setCopied] = useState(false);
  const previewRef = useRef(null);

  const handlePrint = () => {
    if (!previewRef.current) return;
    const clone = previewRef.current.cloneNode(true);
    clone.style.width = '210mm';
    clone.style.height = '297mm';
    clone.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('data:'))
        img.setAttribute('src', window.location.origin + (src.startsWith('/') ? src : '/' + src));
    });
    const html = `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8"/>
  <title>CV — ${data.name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
    body, div, span, h1, h2, h3, h4, p, li, ul, a { font-family: 'Inter', 'Segoe UI', Arial, sans-serif !important; }
    body { background: #fff; margin: 0; padding: 0; }
    @page { size: A4 portrait; margin: 0; }
    @media print { html, body { width: 210mm; height: 297mm; overflow: hidden; } }
  </style>
</head>
<body>${clone.outerHTML}</body>
</html>`;
    const win = window.open('', '_blank', 'width=900,height=700');
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.onload = () =>
      setTimeout(() => {
        win.focus();
        win.print();
      }, 1000);
  };

  const handleCopyCode = async () => {
    const code = generateCvPageCode(data);
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = Object.assign(document.createElement('textarea'), { value: code });
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <PageWrapper skipChildWrapping>
      <div className="relative z-50 flex h-screen w-full overflow-hidden bg-slate-900">
        <div className="flex w-85 shrink-0 flex-col border-r border-slate-700 bg-slate-900">
          <div
            className="flex h-12 shrink-0 items-center gap-2 border-b border-slate-700
              bg-slate-800/60 px-4"
          >
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-3 font-mono text-xs text-slate-500">// editor.json</span>
          </div>
          <div className="shrink-0 space-y-2 border-b border-slate-700 bg-slate-800/40 p-4">
            <button
              onClick={handlePrint}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#192a56] px-6
                py-3 text-sm font-bold text-white shadow-lg transition-all duration-200
                hover:bg-[#243a6b] hover:shadow-xl active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t('toolbar.print')}
            </button>
            <button
              onClick={handleCopyCode}
              className={`flex w-full items-center justify-center gap-2 rounded-xl border px-6 py-3
                text-sm font-bold shadow-lg transition-all duration-200 active:scale-95 ${
                  copied
                    ? 'border-green-500/50 bg-green-500/10 text-green-400'
                    : `border-slate-600 bg-slate-700/60 text-slate-200 hover:bg-slate-700
                      hover:shadow-xl`
                }`}
            >
              {copied ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t('toolbar.copied')}
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  {t('toolbar.copyCode')}
                </>
              )}
            </button>
            <button
              onClick={() => setData(getCvData(tData))}
              className="flex w-full items-center justify-center gap-2 rounded-xl border
                border-slate-700 px-6 py-2 text-xs font-semibold text-slate-400 transition-all
                hover:border-slate-600 hover:text-slate-300 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              {t('toolbar.reset')}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <EditorPanel data={data} setData={setData} t={t} />
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div
            className="flex h-12 shrink-0 items-center border-b border-slate-700 bg-slate-800/60
              px-6"
          >
            <span className="font-mono text-xs text-slate-500">// preview — A4</span>
          </div>
          <div className="relative flex-1 min-h-0 overflow-hidden bg-slate-800/30">
            <ScaledPreview data={data} previewRef={previewRef} t={t} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}