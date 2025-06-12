import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const token = cookies().get('github_token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const res = await fetch('https://api.github.com/user/repos?per_page=100', {
        headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github+json',
        },
    });

    if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch repos' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
