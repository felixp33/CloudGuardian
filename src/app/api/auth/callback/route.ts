import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    if (!code) {
        return NextResponse.redirect('/login');
    }

    const clientId = process.env.GITHUB_CLIENT_ID as string;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET as string;

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
        }),
    });

    const tokenData = await tokenRes.json();
    const token = tokenData.access_token as string | undefined;

    if (!token) {
        return NextResponse.redirect('/login');
    }

    cookies().set('github_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });

    return NextResponse.redirect('/auth/callback');
}
