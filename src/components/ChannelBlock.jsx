import cafeAvatar from '../assets/cafe.jpg';
import { useTgStat } from '../hooks/useTgStat';
import React from 'react';
import tgGif from '../assets/tg.gif';
import { useTranslation } from 'react-i18next';

export const ChannelBlock = ({ channelId = '-1002204625015' }) => {
  const { i18n, t } = useTranslation();
  const { channelData, loading, error } = useTgStat(channelId);

  // Форматирование чисел
  const formatNumber = (num) => {
    if (num === undefined || num === null) return i18n.language === 'en' ? t('no_data') : 'нет данных';
    if (typeof num === 'string' && num.trim() === '') return i18n.language === 'en' ? t('no_data') : 'нет данных';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Получение аватара
  const getChannelAvatar = () => {
    if (channelData?.image640) {
      return channelData.image640.startsWith('http') ? channelData.image640 : 'https:' + channelData.image640;
    }
    if (channelData?.image100) {
      return channelData.image100.startsWith('http') ? channelData.image100 : 'https:' + channelData.image100;
    }
    return cafeAvatar;
  };

  // Fallback данные
  const fallbackChannelData = {
    title: '@notcloudcafe',
    username: '@notcloudcafe',
    participants_count: 1900,
    posts_count: 1000,
    err_percent: 37.2,
    avg_post_reach: 800,
    image640: cafeAvatar
  };

  const data = channelData || fallbackChannelData;
  const channelUrl = data.username ? `https://t.me/${data.username.replace(/^@/, '')}` : '';

  // Для анимации переливания цвета
  const title = t('channel_title');

  // Тексты для русского и английского
  const labels = i18n.language === 'en' ? {
    subscribers: t('channel_subscribers'),
    posts: t('channel_posts'),
    avg_reach: t('channel_avg_reach'),
    loading: t('channel_loading'),
    default_title: t('channel_default_title'),
    longreads_title: t('channel_longreads_title'),
    longread_nft: t('channel_longread_nft'),
    longread_book: t('channel_longread_book'),
    longread_utility: t('channel_longread_utility'),
  } : {
    subscribers: 'Подписчиков',
    posts: 'Постов',
    avg_reach: 'Средний охват',
    loading: 'Загрузка статистики...',
    default_title: 'Канал',
    longreads_title: 'Интересные лонгриды',
    longread_nft: 'NFT-коллекции. Взлёты и падения.',
    longread_book: 'Литература как фундамент майндсета.',
    longread_utility: 'Утилити NFT.',
  };

  if (loading) {
    return (
      <div className="section-block steam-favorite-block channel-block">
        <div className="steam-favorite-title channel-animated-title">{
          Array.from(title).map((char, idx) => (
            <span
              key={idx}
              className="channel-animated-letter"
              style={{
                animationDelay: `${idx * 0.12}s`,
              }}
            >{char}</span>
          ))
        }
        <img src={tgGif} alt="tg gif" style={{ height: 38, marginLeft: 8, verticalAlign: 'middle', borderRadius: 8 }} />
        </div>
        <div className="steam-favorite-content channel-flex channel-block-flex">
          <div style={{textAlign: 'center', width: '100%'}}>
            <div style={{ color: '#a7aaff', fontSize: '1.1rem' }}>{labels.loading}</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-block steam-favorite-block channel-block">
        <div className="steam-favorite-title channel-animated-title">{
          Array.from(title).map((char, idx) => (
            <span
              key={idx}
              className="channel-animated-letter"
              style={{
                animationDelay: `${idx * 0.12}s`,
              }}
            >{char}</span>
          ))
        }
        <img src={tgGif} alt="tg gif" style={{ height: 38, marginLeft: 8, verticalAlign: 'middle', borderRadius: 8 }} />
        </div>
        <div className="steam-favorite-content channel-flex channel-block-flex">
          <img src={getChannelAvatar()} alt="Channel" className="steam-favorite-img" style={{marginBottom: 16}} />
          <div className="steam-favorite-name" style={{fontSize: '1.3rem', marginBottom: 8}}>{fallbackChannelData.title}</div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '16px 0', gap: 12}}>
            <div>
              <span className="steam-favorite-number" style={{fontSize: '1.2rem', fontWeight: 700}}>{formatNumber(fallbackChannelData.participants_count)}</span>
              <span className="steam-favorite-label" style={{marginLeft: 4}}>{labels.subscribers}</span>
            </div>
            <div>
              <span className="steam-favorite-number" style={{fontSize: '1.2rem', fontWeight: 700}}>{formatNumber(fallbackChannelData.posts_count)}</span>
              <span className="steam-favorite-label" style={{marginLeft: 4}}>{labels.posts}</span>
            </div>
            <div>
              <span className="steam-favorite-label">ERR: </span>
              <span>{fallbackChannelData.err_percent !== undefined && fallbackChannelData.err_percent !== null ? fallbackChannelData.err_percent + '%' : (i18n.language === 'en' ? t('no_data') : 'нет данных')}</span>
            </div>
            <div>
              <span className="steam-favorite-label">{labels.avg_reach}: </span>
              <span>{formatNumber(fallbackChannelData.avg_post_reach)}</span>
            </div>
          </div>
          <div style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: 8 }}>⚠️ {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-block steam-favorite-block channel-block">
      <div className="steam-favorite-title channel-animated-title mobile-channel-title">{
        Array.from(title).map((char, idx) => (
          <span
            key={idx}
            className="channel-animated-letter"
            style={{
              animationDelay: `${idx * 0.12}s`,
            }}
          >{char}</span>
        ))
      }
      <img src={tgGif} alt="tg gif" style={{ height: 38, marginLeft: 8, verticalAlign: 'middle', borderRadius: 8 }} />
      </div>
      <div className="steam-favorite-content channel-flex channel-block-flex" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 12}}>
        <a href={channelUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexDirection: 'column', minWidth: 120 }}>
          <img src={getChannelAvatar()} alt={data.title || 'Channel'} className="steam-favorite-img" style={{marginBottom: 16}} />
          <span
            className="steam-favorite-name channel-title-orange mobile-channel-name"
            style={{
              fontSize: '1.3rem',
              marginBottom: 8,
              color: '#ffb84d',
              marginLeft: -50,
              transition: 'color 0.2s, text-decoration 0.2s',
              cursor: 'pointer',
              textAlign: 'center',
              display: 'block',
              width: '100%'
            }}
            onMouseOver={e => { e.currentTarget.style.color = '#ffc266'; e.currentTarget.style.textDecoration = 'underline'; }}
            onMouseOut={e => { e.currentTarget.style.color = '#ffb84d'; e.currentTarget.style.textDecoration = 'none'; }}
          >
            {data.title || labels.default_title}
          </span>
        </a>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 18}}>
          {[
            {
              value: formatNumber(data.participants_count),
              label: labels.subscribers,
            },
            {
              value: formatNumber(data.posts_count),
              label: labels.posts,
            },
            {
              value: data.err_percent !== undefined && data.err_percent !== null ? data.err_percent + '%' : (i18n.language === 'en' ? t('no_data') : 'нет данных'),
              label: 'ERR',
            },
            {
              value: formatNumber(data.avg_post_reach),
              label: labels.avg_reach,
            },
          ].map((item, idx) => (
            <a
              key={item.label}
              href="https://tgstat.ru/channel/@notcloudcafe/stat"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border: '1px solid #444',
                borderRadius: 10,
                padding: '18px 28px',
                background: 'rgba(30,32,60,0.7)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 110,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s, border 0.2s, color 0.2s',
                outline: 'none',
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#23234a';
                e.currentTarget.style.border = '1.5px solid #ffb84d';
                e.currentTarget.querySelector('.steam-favorite-number').style.color = '#ffb84d';
                e.currentTarget.querySelector('.steam-favorite-label').style.color = '#ffb84d';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'rgba(30,32,60,0.7)';
                e.currentTarget.style.border = '1px solid #444';
                e.currentTarget.querySelector('.steam-favorite-number').style.color = '#ffb84d';
                e.currentTarget.querySelector('.steam-favorite-label').style.color = '#ffb84d';
              }}
            >
              <span className="steam-favorite-number" style={{fontSize: '1.6rem', fontWeight: 700, lineHeight: 1, color: '#ffb84d'}}>{item.value}</span>
              <span className="steam-favorite-label" style={{fontSize: '1.1rem', color: '#ffb84d', marginTop: 4}}>{item.label}</span>
            </a>
          ))}
        </div>
        <div className="vertical-divider"></div>
        <div style={{marginLeft: 0, minWidth: 300, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
          <div className="mobile-hr"></div>
          <div style={{fontWeight: 800, fontSize: '1.25rem', color: '#fff', marginBottom: 16, letterSpacing: 0.5}}>{labels.longreads_title}</div>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, color: '#fff', fontSize: '1.15rem', lineHeight: 2.1, width: '100%'}}>
            <li style={{marginBottom: 10, display: 'flex', alignItems: 'center'}}>
              <span style={{color: '#ffb84d', fontSize: '1.3em', marginRight: 8, marginLeft: 2}}>•</span>
              <span role="img" aria-label="NFT" style={{fontSize: '1.15em', marginRight: 8, display: 'inline-block', verticalAlign: 'middle'}}>🚀</span>
              <a href="https://t.me/notcloudcafe/2149" target="_blank" rel="noopener noreferrer" 
                style={{
                  color: '#a7aaff',
                  textDecoration: 'none',
                  padding: '8px 0',
                  display: 'inline-block',
                  borderRadius: 8,
                  transition: 'background 0.2s, color 0.2s',
                  fontWeight: 600
                }}
                onMouseOver={e => { e.currentTarget.style.background = '#23234a'; e.currentTarget.style.color = '#ffb84d'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#a7aaff'; }}
              >
                {labels.longread_nft}
              </a>
            </li>
            <li style={{marginBottom: 10, display: 'flex', alignItems: 'center'}}>
              <span style={{color: '#ffb84d', fontSize: '1.3em', marginRight: 8, marginLeft: 2}}>•</span>
              <span role="img" aria-label="book" style={{fontSize: '1.15em', marginRight: 8, display: 'inline-block', verticalAlign: 'middle'}}>📚</span>
              <a href="https://t.me/notcloudcafe/2187" target="_blank" rel="noopener noreferrer" 
                style={{
                  color: '#a7aaff',
                  textDecoration: 'none',
                  padding: '8px 0',
                  display: 'inline-block',
                  borderRadius: 8,
                  transition: 'background 0.2s, color 0.2s',
                  fontWeight: 600
                }}
                onMouseOver={e => { e.currentTarget.style.background = '#23234a'; e.currentTarget.style.color = '#ffb84d'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#a7aaff'; }}
              >
                {labels.longread_book}
              </a>
            </li>
            <li style={{display: 'flex', alignItems: 'center'}}>
              <span style={{color: '#ffb84d', fontSize: '1.3em', marginRight: 8, marginLeft: 2}}>•</span>
              <span role="img" aria-label="money" style={{fontSize: '1.15em', marginRight: 8, display: 'inline-block', verticalAlign: 'middle'}}>💸</span>
              <a href="https://t.me/notcloudcafe/2455" target="_blank" rel="noopener noreferrer" 
                style={{
                  color: '#a7aaff',
                  textDecoration: 'none',
                  padding: '8px 0',
                  display: 'inline-block',
                  borderRadius: 8,
                  transition: 'background 0.2s, color 0.2s',
                  fontWeight: 600
                }}
                onMouseOver={e => { e.currentTarget.style.background = '#23234a'; e.currentTarget.style.color = '#ffb84d'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#a7aaff'; }}
              >
                {labels.longread_utility}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 