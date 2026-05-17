export async function getBrowserFingerprint(): Promise<string> {
    if (typeof window === 'undefined') {
        return 'unknown';
    }

    const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number };
    const values = [
        navigator.userAgent,
        navigator.language,
        ...(navigator.languages || []),
        navigator.platform,
        screen.width,
        screen.height,
        screen.colorDepth,
        navigatorWithMemory.deviceMemory ?? 'unknown',
        navigator.hardwareConcurrency ?? 'unknown',
        Intl.DateTimeFormat().resolvedOptions().timeZone,
    ];

    const signature = values.filter(Boolean).join('||');
    return sha256(signature);
}

export function getCountryFromLocale(): string | undefined {
    if (typeof navigator === 'undefined') {
        return undefined;
    }

    const locale = navigator.language || '';
    const match = locale.match(/[-_]([A-Za-z]{2})$/);
    return match?.[1]?.toUpperCase();
}

async function sha256(value: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
}
