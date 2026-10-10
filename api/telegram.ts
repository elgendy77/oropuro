export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const { token, chat_id, text, action } = req.body || {};
  if (!token) {
    res.status(400).json({ ok: false, description: 'Missing token' });
    return;
  }

  const cleanToken = String(token).trim().replace(/^bot/i, '');

  try {
    if (action === 'getMe') {
      const tgRes = await fetch(`https://api.telegram.org/bot${cleanToken}/getMe`);
      const data = await tgRes.json();
      res.status(tgRes.status).json(data);
      return;
    }

    if (!chat_id || !text) {
      res.status(400).json({ ok: false, description: 'Missing chat_id or text' });
      return;
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${cleanToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: String(chat_id).trim(),
        text: String(text),
      })
    });

    const data = await tgRes.json();
    res.status(tgRes.status).json(data);
  } catch (err: any) {
    res.status(500).json({ ok: false, description: err.message || 'Internal proxy error' });
  }
}
