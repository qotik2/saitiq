import React from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: window.innerWidth <= 600 ? 'column' : 'row',
        gap: window.innerWidth <= 600 ? 4 : 8,
        alignItems: 'center',
        position: window.innerWidth > 1000 ? 'absolute' : 'static',
        right: window.innerWidth > 1000 ? 'calc(50% - 640px)' : undefined,
        top: window.innerWidth > 1000 ? 10 : undefined,
        marginLeft: window.innerWidth > 600 ? 0 : 10
      }}
    >
      <button
        onClick={() => i18n.changeLanguage('ru')}
        style={{
          background: i18n.language === 'ru' ? '#a7aaff' : 'none',
          color: i18n.language === 'ru' ? '#181a2a' : '#a7aaff',
          border: '1px solid #a7aaff',
          borderRadius: 6,
          padding: window.innerWidth <= 600 ? '1px 1px' : '1px 5px',
          fontSize: window.innerWidth > 600 ? '0.8rem' : '0.1rem',
          cursor: 'pointer',
          fontWeight: 700
        }}
      >
        ru
      </button>
      <button
        onClick={() => i18n.changeLanguage('en')}
        style={{
          background: i18n.language === 'en' ? '#a7aaff' : 'none',
          color: i18n.language === 'en' ? '#181a2a' : '#a7aaff',
          border: '1px solid #a7aaff',
          borderRadius: 6,
          padding: window.innerWidth <= 600 ? '1px 1px' : '1px 5px',
          fontSize: window.innerWidth > 600 ? '0.8rem' : '0.04rem',
          cursor: 'pointer',
          fontWeight: 700
        }}
      >
        en
      </button>
    </div>
  );
} 