'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslations, useLocale } from 'next-intl';
import { Check } from 'lucide-react';
import InputField from './InputField';

// Strict email regex matching backend
const EMAIL_STRICT_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  sujet: '',
  message: '',
  website: '',
};

const FIELDS_CONFIG = [
  { name: 'name', type: 'text', required: true, minLength: 3 },
  { name: 'email', type: 'email', required: true },
  { name: 'sujet', type: 'text', required: true, minLength: 2 },
  { name: 'message', type: 'textarea', required: true, minLength: 10 },
];

const ContactForm = () => {
  const t = useTranslations('contactForm');
  const locale = useLocale();

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState({ loading: false });
  const [validationErrors, setValidationErrors] = useState<Record<string, string | null>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trimStart() }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouchedFields((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isFieldValid = (fieldName: string, value: string) => {
    const field = FIELDS_CONFIG.find((f) => f.name === fieldName);
    if (!field) return false;
    const val = value.trim();
    if (!val) return false;
    if (field.minLength && val.length < field.minLength) return false;
    if (field.type === 'email' && !EMAIL_STRICT_REGEX.test(val)) return false;
    return true;
  };

  const getFieldValidationMessage = (fieldName: string, value: string): string => {
    const field = FIELDS_CONFIG.find((f) => f.name === fieldName);
    if (!field) return '';
    const val = value.trim();
    const label = t(`fields.${fieldName}`);
    if (!val) return t('validation.required', { label });
    if (field.minLength && val.length < field.minLength) {
      return t('validation.minLength', { label, min: field.minLength });
    }
    if (field.type === 'email' && !EMAIL_STRICT_REGEX.test(val)) {
      return t('validation.emailInvalid');
    }
    return '';
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    FIELDS_CONFIG.forEach((field) => {
      const msg = getFieldValidationMessage(field.name, formData[field.name as keyof typeof formData]);
      if (msg) errors[field.name] = msg;
    });
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setTouchedFields(Object.fromEntries(FIELDS_CONFIG.map((field) => [field.name, true])));
      toast.error(t('validation.formError'));
      return;
    }

    setStatus({ loading: true });
    setValidationErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });

      // Handle the case where the server returns an HTML error page
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(t('validation.genericError'));
      }

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setFormData(INITIAL_FORM_STATE);
        setTouchedFields({});
        setValidationErrors({});
      } else {
        if (data.field && data.message) {
          setValidationErrors((prev) => ({ ...prev, [data.field]: data.message }));
          setTouchedFields((prev) => ({ ...prev, [data.field]: true }));
        }
        if (Array.isArray(data.errors)) {
          const newErrors: Record<string, string> = {};
          const newTouched: Record<string, boolean> = {};
          data.errors.forEach((err: { field: string; message: string }) => {
            if (err.field) {
              newErrors[err.field] = err.message;
              newTouched[err.field] = true;
            }
          });
          setValidationErrors((prev) => ({ ...prev, ...newErrors }));
          setTouchedFields((prev) => ({ ...prev, ...newTouched }));
        }
        throw new Error(data.message || t('validation.genericError'));
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : t('validation.genericError'));
    } finally {
      setStatus({ loading: false });
    }
  };

  const validFields = FIELDS_CONFIG.filter((field) =>
    isFieldValid(field.name, formData[field.name as keyof typeof formData]),
  ).length;
  const progressPercentage = (validFields / FIELDS_CONFIG.length) * 100;
  const isComplete = progressPercentage === 100;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/20 backdrop-blur-xl transition-all duration-300 hover:border-slate-600/70 shadow-xl">
      {/* IDE Terminal Header */}
      <div className="flex h-9 items-stretch justify-between border-b border-slate-700/50 bg-slate-800/60 px-3.5 backdrop-blur-md">
        <div className="flex h-full items-end gap-2">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5 self-center" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          {/* Active file tab */}
          <div className="relative z-10 -mb-px ml-2 flex items-center gap-1.5 rounded-t-md border-x border-t border-b-0 border-slate-700/50 bg-slate-800 px-2.5 py-0.5 text-[11px] font-mono text-slate-200">
            <span className="text-accent">ts</span>
            <span>send-message.ts</span>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-1.5 self-center rounded-full border border-slate-700/50 bg-slate-800/50 px-2 py-0.5 text-[10px] font-mono text-slate-300">
          <span className={`h-1.5 w-1.5 rounded-full ${isComplete ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span>{isComplete ? t('ui.ready') : `${validFields}/${FIELDS_CONFIG.length}`}</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 xl:p-7">
        {/* 4-Step Segmented Progress Tracker */}
        <div className="mb-5">
          <div className="mb-2.5 flex items-center justify-between text-xs font-mono">
            <span className={isComplete ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>
              {isComplete ? t('ui.progressComplete') : t('ui.progressIncomplete')}
            </span>
            <span className={`font-semibold ${isComplete ? 'text-emerald-400' : 'text-accent'}`}>
              {validFields}/{FIELDS_CONFIG.length} ({Math.round(progressPercentage)}%)
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {FIELDS_CONFIG.map((field) => {
              const isValid = isFieldValid(field.name, formData[field.name as keyof typeof formData]);
              const fieldLabel = t(`fields.${field.name}`);
              return (
                <div key={field.name} className="flex flex-col gap-1.5 min-w-0">
                  {/* Segment Bar */}
                  <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-700/40">
                    <div
                      className={`h-full w-full rounded-full transition-all duration-300 ease-out ${
                        isValid
                          ? isComplete
                            ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.55)]'
                            : 'bg-accent shadow-[0_0_8px_rgba(255,204,102,0.45)]'
                          : 'bg-transparent'
                      }`}
                    />
                  </div>

                  {/* Segment Label with Check/Dot */}
                  <div className="flex items-center gap-1 text-[11px] font-mono min-w-0">
                    <span
                      className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold transition-all duration-300 ${
                        isValid
                          ? isComplete
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-accent/15 text-accent border border-accent/40'
                          : 'bg-slate-700/40 text-slate-500 border border-slate-700/50'
                      }`}
                      aria-hidden="true"
                    >
                      {isValid ? <Check className="h-2.5 w-2.5" /> : '•'}
                    </span>
                    <span
                      className={`truncate transition-colors duration-200 ${
                        isValid
                          ? isComplete
                            ? 'text-emerald-300 font-medium'
                            : 'text-accent font-medium'
                          : 'text-slate-400'
                      }`}
                    >
                      {fieldLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            className="hidden pointer-events-none"
            aria-hidden="true"
          />

          {/* Name and Email Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
            {FIELDS_CONFIG.slice(0, 2).map((field) => (
              <InputField
                key={field.name}
                {...field}
                label={t(`fields.${field.name}`)}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                className="w-full"
                error={validationErrors[field.name]}
                isValid={isFieldValid(field.name, formData[field.name as keyof typeof formData])}
                isTouched={touchedFields[field.name]}
                validationMessage={getFieldValidationMessage(field.name, formData[field.name as keyof typeof formData])}
              />
            ))}
          </div>

          {/* Subject and Message */}
          {FIELDS_CONFIG.slice(2).map((field) => (
            <InputField
              key={field.name}
              {...field}
              label={t(`fields.${field.name}`)}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              className="w-full"
              error={validationErrors[field.name]}
              isValid={isFieldValid(field.name, formData[field.name as keyof typeof formData])}
              isTouched={touchedFields[field.name]}
              validationMessage={getFieldValidationMessage(field.name, formData[field.name as keyof typeof formData])}
            />
          ))}

          {/* Submit Action */}
          <div className="pt-2 text-center xl:text-left">
            <button
              type="submit"
              disabled={status.loading || progressPercentage < 100}
              className={`flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl
                font-mono font-semibold text-sm transition-all duration-300 ${
                  progressPercentage === 100 && !status.loading
                    ? 'bg-accent text-slate-950 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 active:scale-[0.99]'
                    : 'bg-slate-800/80 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-60'
                }`}
            >
              {status.loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                  <span>{t('ui.sending')}</span>
                </>
              ) : (
                <>
                  <span>{t('ui.sendBtn')}</span>
                  {progressPercentage === 100 && <span>🚀</span>}
                </>
              )}
            </button>

            <p
              className={`mt-2 text-center text-[11px] font-mono text-slate-400 transition-opacity duration-200 ${
                progressPercentage < 100 ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'
              }`}
              aria-hidden={progressPercentage === 100}
            >
              {t('ui.fillAllFields')}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
