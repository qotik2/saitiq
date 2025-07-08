import broGif from '../assets/bro.gif';
import utilityImg from '../assets/teletype/utility.jpeg';
import nftImg from '../assets/teletype/nft.jpeg';
import articleImg from '../assets/teletype/dbcdb5ff-dfac-4356-948e-21c159e19443.png';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const TeletypeBlock = () => {
  const { t } = useTranslation();
  const [typed, setTyped] = useState('');
  const [showGif, setShowGif] = useState(false);
  const typeText = 'Teletype';
  useEffect(() => {
    setTyped('');
    setShowGif(false);
    let i = 0;
    let typing = true;
    let interval;
    function startTyping() {
      typing = true;
      i = 0;
      setShowGif(false);
      interval = setInterval(() => {
        if (i < typeText.length) {
          setTyped(typeText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setShowGif(true);
          setTimeout(startErasing, 2500); // пауза после печати
        }
      }, 290);
    }
    function startErasing() {
      typing = false;
      i = typeText.length;
      setShowGif(false);
      interval = setInterval(() => {
        if (i > 0) {
          setTyped(typeText.slice(0, i - 1));
          i--;
        } else {
          clearInterval(interval);
          setTimeout(startTyping, 400); // пауза после стирания
        }
      }, 80);
    }
    startTyping();
    return () => clearInterval(interval);
  }, []);
  const imgStyle = {
    width: 300,
    height: 300,
    objectFit: 'cover',
    borderRadius: 8,
    marginRight: 16,
    marginBottom: 8,
    display: 'block',
    transition: 'box-shadow 0.4s, transform 0.4s',
    boxShadow: '0 2px 12px 0 rgba(31, 38, 135, 0.10)',
  };
  const captionStyle = {
    textAlign: 'center',
    marginTop: 4,
    fontSize: '1.15rem',
    color: '#a7aaff',
    fontWeight: 600,
    letterSpacing: '0.01em',
    textDecoration: 'none',
    display: 'block',
    transition: 'color 0.4s',
  };
  const italicStyle = {
    fontStyle: 'italic',
    color: '#fff',
    fontSize: '1.5rem',
    marginTop: 0,
    marginBottom: 24,
    textAlign: 'center',
    width: '100%',
    display: 'block',
    fontWeight: 400,
  };
  return (
    <div className="section-block steam-favorite-block teletype-block">
      <div className="steam-favorite-title mobile-teletype-title" style={{ minHeight: 60, color: '#fff', textShadow: '0 0 7px #000, 0 3px 0 #000, 3px 0 0 #000, 0 -3px 0 #000, -3px 0 0 #000' }}>
        <span>{typed}</span>
        {showGif && <img src={broGif} alt="bro gif" className="teletype-gif" style={{ height: 60, marginLeft: 8, verticalAlign: 'middle', borderRadius: 10 }} />}
      </div>
      <div className="steam-favorite-content channel-flex teletype-flex" style={{ gap: 0, justifyContent: 'center', flexWrap: 'nowrap', flexDirection: 'column', alignItems: 'center', paddingBottom: 0, marginBottom: 0 }}>
        <a
          href="https://teletype.in/@sanriouv"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...italicStyle,
            color: '#fff',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s, textDecoration 0.2s',
            display: 'block',
          }}
          onMouseOver={e => { e.currentTarget.style.color = '#a259ff'; e.currentTarget.style.textDecoration = 'underline'; }}
          onMouseOut={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.textDecoration = 'none'; }}
        >
          {t('teletype_main_link')}
        </a>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16}}>
            <a className="teletype-link" href="https://teletype.in/@sanriouv/utilities" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
              <img src={utilityImg} alt="utility" style={imgStyle} />
            </a>
            <a className="teletype-link" href="https://teletype.in/@sanriouv/utilities" target="_blank" rel="noopener noreferrer" style={captionStyle}>
              {t('teletype_utilities')}
            </a>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16}}>
            <a className="teletype-link" href="https://teletype.in/@sanriouv/podarOCHKI" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
              <img src={nftImg} alt="nft" style={imgStyle} />
            </a>
            <a className="teletype-link" href="https://teletype.in/@sanriouv/podarOCHKI" target="_blank" rel="noopener noreferrer" style={captionStyle}>
              {t('teletype_gifts')}
            </a>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 0}}>
            <a className="teletype-link" href="https://teletype.in/@sanriouv/dopeshitonly" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
              <img src={articleImg} alt="article" style={imgStyle} />
            </a>
            <a className="teletype-link" href="https://teletype.in/@sanriouv/dopeshitonly" target="_blank" rel="noopener noreferrer" style={captionStyle}>
              {t('teletype_azuki')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 