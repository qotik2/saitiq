import './App.css';
import { useRef, useState } from 'react';
import { FaTelegramPlane, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import myBg from './assets/mybg.webm';
import avatar from './assets/avatar.jpeg';
import holy from './assets/holy.png';
import tgicon from './assets/tgicon.svg';
import kuromiGif from './assets/kuromi.gif';
import floweyGif from './assets/flowey.gif';
import { ChannelBlock } from './components/ChannelBlock';
import { TeletypeBlock } from './components/TeletypeBlock';
import art1 from './assets/arts/art1.jpg';
import art2 from './assets/arts/art2.jpg';
import art3 from './assets/arts/art3.jpg';
import art4 from './assets/arts/art4.jpg';
import art5 from './assets/arts/art5.jpg';
import { GuestbookBlock } from './components/GuestbookBlock';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useTranslation, Trans } from 'react-i18next';
import i18n from './i18n';

export default function App() {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [modalImg, setModalImg] = useState(null);
  const channelRef = useRef(null);
  const teletypeRef = useRef(null);
  const artRef = useRef(null);
  const guestbookRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false); // состояние для бургер-меню

  function scrollToSection(ref) {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenuOpen(false); // закрывать меню при переходе
    }
  }

  return (
    <div className="AppRoot">
      {/* Fullscreen video background */}
      <video
        ref={videoRef}
        className="bg-video"
        autoPlay
        loop
        muted
        playsInline
        poster="/pic.png"
      >
        <source src={myBg} type="video/webm" />
        <img
          src="/pic.png"
          alt="background"
          className="bg-fallback"
        />
      </video>

      {/* Sticky header (desktop only) */}
      <header className="glass header" style={{ position: 'relative' }}>
        <div className="header-row">
          <nav>
            <ul className="main-nav">
              <li onClick={() => scrollToSection(channelRef)}>{t('nav_my_channel')}</li>
              <span className="divider">|</span>
              <li onClick={() => scrollToSection(teletypeRef)}>{t('nav_teletype')}</li>
              <span className="divider">|</span>
              <li onClick={() => scrollToSection(artRef)}>{t('nav_art')}</li>
              <span className="divider">|</span>
              <li onClick={() => scrollToSection(guestbookRef)}>{t('nav_guestbook')}</li>
            </ul>
          </nav>
          <div className="language-toggle">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Мобильный бургер-меню */}
      <button
        className={`burger-btn${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Открыть меню"
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`mobile-drawer${menuOpen ? ' open' : ''}`}>
        <div className="drawer-content">
          <ul className="drawer-nav">
            <li onClick={() => scrollToSection(channelRef)}>{t('nav_my_channel')}</li>
            <li onClick={() => scrollToSection(teletypeRef)}>{t('nav_teletype')}</li>
            <li onClick={() => scrollToSection(artRef)}>{t('nav_art')}</li>
            <li onClick={() => scrollToSection(guestbookRef)}>{t('nav_guestbook')}</li>
          </ul>
          <div className="drawer-lang-switcher" style={{ display: 'flex', gap: 8, marginTop: 18 }}>
            <button
              onClick={() => { i18n.changeLanguage('ru'); setMenuOpen(false); }}
              style={{
                background: i18n.language === 'ru' ? '#a7aaff' : 'none',
                color: i18n.language === 'ru' ? '#181a2a' : '#a7aaff',
                border: '1px solid #a7aaff',
                borderRadius: 6,
                padding: '2px 8px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              ru
            </button>
            <button
              onClick={() => { i18n.changeLanguage('en'); setMenuOpen(false); }}
              style={{
                background: i18n.language === 'en' ? '#a7aaff' : 'none',
                color: i18n.language === 'en' ? '#181a2a' : '#a7aaff',
                border: '1px solid #a7aaff',
                borderRadius: 6,
                padding: '2px 8px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              en
            </button>
          </div>
        </div>
        <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />
      </nav>

      {/* Blue glassmorphism panel with avatar, текст и секции */}
      <div className="steam-glass-frame">
        {/* Вводная часть */}
        <div className="section-block intro-block">
          <div className="steam-avatar-block">
            <div className="avatar-overlay-container">
              <img src={avatar} alt={t('intro_avatar_alt')} className="steam-avatar-img" />
              <img src={holy} alt={t('intro_holy_alt')} className="holy-img" />
            </div>
            <div className="avatar-caption">
              {t('intro_this_is_me')}
              <img src={kuromiGif} alt="kuromi gif" style={{ marginLeft: -10, verticalAlign: 'middle', width: 60, height: 60 }} />
            </div>
          </div>
          <div className="custom-text-block" style={{ position: 'relative' }}>
            <img src={tgicon} alt="Telegram Icon" className="tg-icon-abs" />
            <Trans i18nKey="intro_text">
              Привет, меня зовут <strong>Sanrio</strong> — я овнер <span className="telegram-gradient">Telegram</span>-канала <span className="rajdhani-bold" style={{color: '#ff3b3b'}}>@notcloudcafe</span>, где пишу авторские статьи о крипторынке, делюсь мыслями и разбираю громкие новости. Акцент канала — блокчейн <span style={{color: '#009dff', fontWeight: 700}}>TON</span>, у меня есть свой блог на Teletype.
            </Trans>
          </div>
        </div>
        {/* Блок с каналом */}
        <div ref={channelRef} style={{ marginTop: '24px' }}>
          <ChannelBlock />
        </div>
        {/* Teletype блок */}
        <div ref={teletypeRef} style={{ marginTop: '24px' }}>
          <TeletypeBlock />
        </div>
        {/* Новый блок-витрина (диджитал-арт) */}
        <div ref={artRef} style={{ marginTop: '12px' }}>
          <div className="steam-favorite-title" style={{ marginBottom: -10, marginTop: 84, textAlign: 'center', fontSize: '2.7rem', fontWeight: 700, color: '#E6399B', fontFamily: '"Pixelify Sans", monospace', letterSpacing: '0.12em', textShadow: '0 0 1px #000, 2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000' }}>
            <span className="glitch-text" data-content={t('art_title')}><span>{t('art_title')}</span></span>
            <img src={floweyGif} alt="flowey gif" style={{ height: 52, marginLeft: 8, verticalAlign: 'middle', borderRadius: 8 }} />
          </div>
          <div className="section-block steam-favorite-block teletype-block">
            <div className="steam-favorite-content channel-flex teletype-flex" style={{ minHeight: 300, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
              <div style={{ color: '#fff', fontSize: '1.35rem', fontWeight: 600, marginBottom: 16, marginTop: 5, textAlign: 'center', maxWidth: 700, paddingTop: 0 }}>
                {t('art_description')}
              </div>
              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 }}>
                <img src={art1} alt="art1" style={{ width: 260, height: 260, borderRadius: 20, objectFit: 'cover', boxShadow: '0 2px 24px #0006', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => setModalImg(art1)} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                <img src={art2} alt="art2" style={{ width: 260, height: 260, borderRadius: 20, objectFit: 'cover', boxShadow: '0 2px 24px #0006', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => setModalImg(art2)} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                <img src={art3} alt="art3" style={{ width: 260, height: 260, borderRadius: 20, objectFit: 'cover', boxShadow: '0 2px 24px #0006', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => setModalImg(art3)} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                <img src={art4} alt="art4" style={{ width: 260, height: 260, borderRadius: 20, objectFit: 'cover', boxShadow: '0 2px 24px #0006', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => setModalImg(art4)} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                <img src={art5} alt="art5" style={{ width: 260, height: 260, borderRadius: 20, objectFit: 'cover', boxShadow: '0 2px 24px #0006', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => setModalImg(art5)} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
              </div>
              <a
                href="https://t.me/kartinochka228"
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-link"
                style={{
                  color: '#E238A7',
                  fontWeight: 600,
                  fontSize: '1.3rem',
                  textDecoration: 'underline',
                  transition: 'color 0.2s',
                  marginTop: -16
                }}
                onMouseOver={e => { e.currentTarget.style.color = '#a259ff'; }}
                onMouseOut={e => { e.currentTarget.style.color = '#E238A7'; }}
              >
                {t('portfolio_link')}
              </a>
            </div>
          </div>
        </div>
        {/* Гостевая книга */}
        <div ref={guestbookRef} style={{ marginTop: 36, marginBottom: 0 }}>
          <GuestbookBlock />
        </div>
        {/* Нижние секции/блоки */}
        <div className="section-block bottom-blocks-container" style={{ marginTop: 32, textAlign: 'center', padding: '32px 0 16px 0' }}>
          <a
            href="https://t.me/sanriouv"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#5CCCCC',
              fontWeight: 600,
              fontFamily: 'Montserrat Alternates, sans-serif',
              fontSize: '1.35rem',
              textDecoration: 'none',
              transition: 'color 0.2s',
              cursor: 'pointer',
              display: 'inline-block',
              marginBottom: 12
            }}
          >
            {t('contact_me')}
          </a>
          <div style={{ color: '#aaa', fontSize: '1.08rem', marginTop: 16, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6, fontWeight: 600, fontFamily: 'Montserrat Alternates, sans-serif' }}>
            {t('site_made_by')}
          </div>
        </div>
      </div>
      {/* Модалка для просмотра арта на весь экран */}
      {modalImg && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(10,12,30,0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
          }}
          onClick={() => setModalImg(null)}
        >
          <img src={modalImg} alt="art-full" style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 24, boxShadow: '0 4px 32px #000a' }} />
        </div>
      )}
    </div>
  );
}
