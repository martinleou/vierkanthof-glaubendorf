import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  message?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br/>');}

export async function POST(request: NextRequest) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
  }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const phone = (body.phone || '').trim();
  const date = (body.date || '').trim();
  const message = (body.message || '').trim();

  if (name.length < 2 || !email.includes('@') || phone.length < 6 || message.length < 10) {
    return NextResponse.json({ error: 'Bitte alle Pflichtfelder korrekt ausfüllen' }, { status: 400 });
  }

  const recipient = process.env.CONTACT_EMAIL;
  if (!recipient) {
    console.error('CONTACT_EMAIL environment variable is not set.');
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
  }

  const subject = `Neue Anfrage: Vierkanthof Glaubendorf – ${name}`;

  const textBody = [
    'Neue Kontaktanfrage über die Website Vierkanthof Glaubendorf.',
    '',
    `Name: ${name}`,
    `E-Mail: ${email}`,
    `Telefon: ${phone}`,
    `Gewünschtes Datum: ${date || '—'}`,
    '',
    'Nachricht:',
    message,
  ].join('\n');

  const htmlBody = `
    <h2>Neue Kontaktanfrage – Vierkanthof Glaubendorf</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
    <strong>E-Mail:</strong> ${escapeHtml(email)}<br/>
    <strong>Telefon:</strong> ${escapeHtml(phone)}<br/>
    <strong>Gewünschtes Datum:</strong> ${escapeHtml(date || '—')}></p>
    <p><strong>Nachricht:</strong><br/>${escapeHtml(message)}</p>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY || ''}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Vierkanthof Glaubendorf <onboarding@resend.dev>',
        to: [recipient],
        subject,
        text: textBody,
        html: htmlBody,
        reply_to: email,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('Email provider error:', response.status, errorText);
      return NextResponse.json({ error: 'E-Mail konnte nicht gesendet werden' }, { status: 502 });
    }
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json({ error: 'E-Mail konnte nicht gesendet werden' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
