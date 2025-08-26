import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type LanguageCode = 'en' | 'ar'

type Dictionary = Record<string, string>

const dictionaries: Record<LanguageCode, Dictionary> = {
  en: {
    searchPlaceholder: 'Search anything...',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Log out',
  },
  ar: {
    searchPlaceholder: 'ابحث عن أي شيء...',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
  },
}

interface I18nContextValue {
  lang: LanguageCode
  t: (key: string) => string
  setLang: (lang: LanguageCode) => void
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>('en')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lang') as LanguageCode | null
      if (stored) setLangState(stored)
    } catch {}
  }, [])

  const setLang = useCallback((l: LanguageCode) => {
    setLangState(l)
    try { localStorage.setItem('lang', l) } catch {}
  }, [])

  const t = useCallback((key: string) => {
    const dict = dictionaries[lang] || dictionaries.en
    return dict[key] ?? key
  }, [lang])

  const value = useMemo(() => ({ lang, t, setLang }), [lang, t, setLang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}


