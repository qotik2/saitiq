export default async function handler(req, res) {
  const { token, channelId } = req.query;

  if (!token || !channelId) {
    res.status(400).json({ error: 'Missing token or channelId' });
    return;
  }

  const url = `https://api.tgstat.ru/channels/stat?token=${token}&channelId=${channelId}`;

  try {
    const tgstatRes = await fetch(url);
    const data = await tgstatRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'TGStat proxy error', details: err.message });
  }
} 