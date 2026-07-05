// app/api/team/route.ts
import { NextResponse } from 'next/server'
import team from '@/app/BD/team.json'

export async function GET() {
    return NextResponse.json(team)
}