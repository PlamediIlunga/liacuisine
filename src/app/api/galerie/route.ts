// app/api/team/route.ts
import { NextResponse } from 'next/server'
import galerie from '@/app/BD/galerie.json'

export async function GET() {
    return NextResponse.json(galerie)
}