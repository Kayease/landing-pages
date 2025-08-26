import { ReactNode, useEffect } from 'react'
import { useI18n } from './I18nContext'

export function DirectionProvider({ children }: { children: ReactNode }) {
  const { lang } = useI18n()
  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
  }, [lang])
  return <>{children}</>
}


