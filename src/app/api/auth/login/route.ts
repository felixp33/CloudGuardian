import { NextResponse } from 'next/server';

export async function GET() {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const redirect = `${baseUrl}/api/auth/callback`;
    const scope = 'repo read:user user:email';

    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirect)}&scope=${encodeURIComponent(scope)}`;
    return NextResponse.redirect(url);
}
