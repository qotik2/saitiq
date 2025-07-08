import { useState, useEffect } from 'react';

const TGSTAT_API_BASE = 'https://api.tgstat.ru';
const TGSTAT_TOKEN = import.meta.env.VITE_TGSTAT_TOKEN;

export const useTgStat = (channelId) => {
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChannelData = async () => {
    const cacheKey = `tgstat_channel_data_${channelId}`;
    const cacheTimestampKey = `tgstat_cache_timestamp_${channelId}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(cacheTimestampKey);
    const now = Date.now();
    const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 часов

    if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < CACHE_DURATION) {
      try {
        setChannelData(JSON.parse(cachedData));
        setLoading(false);
        return;
      } catch (err) {
        localStorage.removeItem(cacheKey);
        localStorage.removeItem(cacheTimestampKey);
      }
    }

    if (!TGSTAT_TOKEN) {
      setError('TGStat API токен не найден');
      setLoading(false);
      return;
    }
    if (!channelId) {
      setError('channelId канала не указан');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const url = `/api/tgstat?token=${TGSTAT_TOKEN}&channelId=${channelId}`;
      const response = await fetch(url);
      const text = await response.text();
      if (!text) {
        throw new Error('Пустой ответ от TGStat');
      }
      const data = JSON.parse(text);
      if (data.status !== 'ok') {
        throw new Error(data.error || 'Ошибка получения данных канала');
      }
      setChannelData(data.response);
      try {
        localStorage.setItem(cacheKey, JSON.stringify(data.response));
        localStorage.setItem(cacheTimestampKey, Date.now().toString());
      } catch {}
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannelData();
    // eslint-disable-next-line
  }, [channelId]);

  const refreshData = () => {
    const cacheKey = `tgstat_channel_data_${channelId}`;
    const cacheTimestampKey = `tgstat_cache_timestamp_${channelId}`;
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(cacheTimestampKey);
    setLoading(true);
    setError(null);
    setChannelData(null);
    fetchChannelData();
  };

  return { channelData, loading, error, refreshData };
};
