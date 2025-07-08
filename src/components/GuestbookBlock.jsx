import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 5;

export function GuestbookBlock({ desktopOffsetLeft = 199 }) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      setError(null);
      let { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('date', { ascending: false });
      if (!error) setMessages(data);
      else setError(t('guestbook_error'));
      setLoading(false);
    }
    fetchMessages();
  }, [t]);

  async function handleSend(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('guestbook')
      .insert([{ name: name.trim() || t('Аноним'), text: message.trim() }])
      .select();
    if (!error) {
      setMessages([{ ...data[0] }, ...messages]);
      setMessage('');
      setPage(1);
    } else {
      setError(t('guestbook_error'));
    }
    setLoading(false);
  }

  const totalPages = Math.ceil(messages.length / PAGE_SIZE) || 1;
  const pagedMessages = messages.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function goToPage(p) {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  }

  return (
    <div
      className="guestbook"
      style={{
        maxWidth: 700,
        width: '100%',
        background: 'rgba(24,26,42,0.97)',
        borderRadius: 18,
        boxShadow: '0 2px 16px 0 rgba(31,38,135,0.10)',
        padding: '36px 40px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: (typeof window !== 'undefined' && window.innerWidth > 600) ? desktopOffsetLeft : undefined,
      }}
    >
      <div style={{
        textAlign: 'center',
        fontSize: '2rem',
        color: '#a7aaff',
        fontWeight: 700,
        marginBottom: 18,
        letterSpacing: '0.02em',
      }}>
        {t('guestbook_title')}
      </div>
      <form onSubmit={handleSend} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 22 }}>
        <input
          type="text"
          placeholder={t('guestbook_placeholder_name')}
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ padding: '14px 18px', borderRadius: 8, border: '1px solid #444', background: '#23234a', color: '#fff', fontSize: '1.08rem', width: '100%' }}
        />
        <textarea
          placeholder={t('guestbook_placeholder_message')}
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={3}
          style={{ padding: '14px 18px', borderRadius: 8, border: '1px solid #444', background: '#23234a', color: '#fff', fontSize: '1.13rem', resize: 'vertical', width: '100%' }}
        />
        <button type="submit" disabled={loading} style={{ background: '#a7aaff', color: '#181a2a', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 0', fontSize: '1.13rem', cursor: 'pointer', transition: 'background 0.2s', width: '100%' }}>
          {loading ? t('guestbook_sending') : t('guestbook_send')}
        </button>
      </form>
      {error && <div style={{ color: '#ff6b6b', marginBottom: 12 }}>{error}</div>}
      <div style={{ maxHeight: 420, overflowY: 'auto', width: '100%', marginTop: 4 }}>
        {loading && messages.length === 0 && (
          <div style={{ color: '#aaa', textAlign: 'center', fontSize: '1.13rem' }}>{t('guestbook_loading')}</div>
        )}
        {!loading && messages.length === 0 && (
          <div style={{ color: '#aaa', textAlign: 'center', fontSize: '1.13rem' }}>{t('guestbook_no_messages')}</div>
        )}
        {pagedMessages.map((msg, idx) => (
          <div key={msg.id || idx} style={{ background: 'rgba(30,32,60,0.82)', borderRadius: 10, padding: '12px 22px', marginBottom: 12, boxShadow: '0 1px 6px #0001', position: 'relative' }}>
            <div style={{ color: '#a7aaff', fontWeight: 600, fontSize: '1.08rem', marginBottom: 2 }}>{msg.name}</div>
            <div style={{ color: '#fff', fontSize: '1.13rem', marginBottom: 2, whiteSpace: 'pre-line' }}>{msg.text}</div>
            <div style={{ color: '#888', fontSize: '0.93rem', textAlign: 'right' }}>{msg.date ? new Date(msg.date).toLocaleString('ru-RU') : ''}</div>
          </div>
        ))}
      </div>
      {/* Пагинация */}
      {messages.length > PAGE_SIZE && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 10 }}>
          <button onClick={() => goToPage(page - 1)} disabled={page === 1} style={{ background: 'none', border: 'none', color: '#a7aaff', fontSize: 20, cursor: page === 1 ? 'default' : 'pointer', opacity: page === 1 ? 0.4 : 1, padding: '2px 8px' }}>&lt;</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              style={{
                background: page === i + 1 ? '#a7aaff' : 'none',
                color: page === i + 1 ? '#181a2a' : '#a7aaff',
                border: 'none',
                borderRadius: 6,
                fontWeight: 700,
                fontSize: 16,
                cursor: page === i + 1 ? 'default' : 'pointer',
                padding: '2px 8px',
                margin: '0 2px',
                opacity: page === i + 1 ? 1 : 0.7,
                transition: 'background 0.2s, color 0.2s',
              }}
              disabled={page === i + 1}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => goToPage(page + 1)} disabled={page === totalPages} style={{ background: 'none', border: 'none', color: '#a7aaff', fontSize: 20, cursor: page === totalPages ? 'default' : 'pointer', opacity: page === totalPages ? 0.4 : 1, padding: '2px 8px' }}>&gt;</button>
        </div>
      )}
    </div>
  );
} 