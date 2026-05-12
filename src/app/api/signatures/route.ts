import { NextResponse } from 'next/server';
import { getSignatureCount, signPetition } from '@/lib/db';

export async function GET() {
  try {
    const count = await getSignatureCount();
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch count' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({} as Record<string, unknown>));
  const rawPetitionId = body.petition_id ?? process.env.NEXT_PUBLIC_PETITION_ID ?? '1';
  const petition_id = typeof rawPetitionId === 'string' && /^[0-9]+$/.test(rawPetitionId)
    ? Number(rawPetitionId)
    : rawPetitionId;
  const fingerprint = typeof body.fingerprint === 'string' ? body.fingerprint : 'unknown';
  const country = typeof body.country === 'string' ? body.country : undefined;
  const city = typeof body.city === 'string' ? body.city : undefined;
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown';

  if (!fingerprint || fingerprint === 'unknown') {
    return NextResponse.json({ error: 'Unable to generate fingerprint' }, { status: 400 });
  }

  try {
    const result = await signPetition({ petition_id, ip_address: ip, fingerprint, country, city });
    const count = await getSignatureCount();
    return NextResponse.json({ success: true, count, result });
  } catch (error: any) {
    const normalizedMessage = String(error?.message || '').toLowerCase();

    if (normalizedMessage.includes('already signed')) {
      return NextResponse.json({ error: 'You have already signed' }, { status: 403 });
    }

    console.error('Sign petition failed:', error);
    return NextResponse.json({ error: 'Failed to sign petition' }, { status: 500 });
  }
}
