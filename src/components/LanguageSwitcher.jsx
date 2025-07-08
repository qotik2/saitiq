import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Закрытие меню при клике вне
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    if (showMenu) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showMenu]);

  if (isMobile) {
    return (
      <div className="language-toggle" style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', zIndex: 1000 }} ref={menuRef}>
        <button
          aria-label="Change language"
          style={{
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1,
            color: '#a7aaff',
          }}
          onClick={() => setShowMenu(v => !v)}
        >
          🌐
        </button>
        {showMenu && (
          <div
            style={{
              position: 'absolute',
              top: '2.2rem',
              right: 0,
              background: 'rgba(24,26,42,0.98)',
              border: '1px solid #a7aaff44',
              borderRadius: 8,
              boxShadow: '0 2px 12px #0003',
              padding: '6px 0',
              minWidth: 64,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              zIndex: 2001,
            }}
          >
            <button
              onClick={() => { i18n.changeLanguage('ru'); setShowMenu(false); }}
              style={{
                background: i18n.language === 'ru' ? '#a7aaff' : 'none',
                color: i18n.language === 'ru' ? '#181a2a' : '#a7aaff',
                border: 'none',
                borderRadius: 0,
                fontWeight: 700,
                fontSize: '1rem',
                padding: '6px 0',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              RU
            </button>
            <button
              onClick={() => { i18n.changeLanguage('en'); setShowMenu(false); }}
              style={{
                background: i18n.language === 'en' ? '#a7aaff' : 'none',
                color: i18n.language === 'en' ? '#181a2a' : '#a7aaff',
                border: 'none',
                borderRadius: 0,
                fontWeight: 700,
                fontSize: '1rem',
                padding: '6px 0',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              EN
            </button>
          </div>
        )}
      </div>
    );
  }

  // Desktop: обычные кнопки
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 10 }}>
      <button
        onClick={() => i18n.changeLanguage('ru')}
        style={{
          background: i18n.language === 'ru' ? '#a7aaff' : 'none',
          color: i18n.language === 'ru' ? '#181a2a' : '#a7aaff',
          border: '1px solid #a7aaff',
          borderRadius: 6,
          padding: '2px 8px',
          fontSize: '0.9rem',
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
          padding: '2px 8px',
          fontSize: '0.9rem',
          cursor: 'pointer',
          fontWeight: 700
        }}
      >
        en
      </button>
    </div>
  );
} 