// app/api/menu/route.ts
import menu from '@/app/BD/menu.json';
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(menu);
}