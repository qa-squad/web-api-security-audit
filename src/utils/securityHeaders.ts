export type SecurityHeaderResult = {
    name: string;
    present: boolean;
    value?: string;
    recommendation: string;
};

const requiredHeaders = [
    {
        name: 'strict-transport-security',
        recommendation: 'Add Strict-Transport-Security to enforce HTTPS usage.',
    },
    {
        name: 'content-security-policy',
        recommendation: 'Add Content-Security-Policy to reduce XSS risk.',
    },
    {
        name: 'x-frame-options',
        recommendation: 'Add X-Frame-Options to reduce clickjacking risk.',
    },
    {
        name: 'x-content-type-options',
        recommendation: 'Add X-Content-Type-Options: nosniff.',
    },
    {
        name: 'referrer-policy',
        recommendation: 'Add Referrer-Policy to control referrer information leakage.',
    },
];

export function checkSecurityHeaders(
    headers: Record<string, string>
): SecurityHeaderResult[] {
    return requiredHeaders.map(header => ({
        name: header.name,
        present: Boolean(headers[header.name]),
        value: headers[header.name],
        recommendation: header.recommendation,
    }));
}