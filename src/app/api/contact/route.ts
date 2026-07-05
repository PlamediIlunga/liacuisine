import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
    isHoneypotTriggered,
    validateContactPayload,
} from '@/lib/contactValidation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    let body: unknown;

    try {
        body = await req.json();
    } catch {
        return NextResponse.json(
            { success: false, error: 'Corps de requête invalide.' },
            { status: 400 }
        );
    }

    if (isHoneypotTriggered(body)) {
        return NextResponse.json({ success: true });
    }

    const validation = validateContactPayload(body);
    if (!validation.ok) {
        return NextResponse.json(
            { success: false, error: validation.error },
            { status: 400 }
        );
    }

    const { prenom, nom, email, message } = validation.data;

    if (!process.env.RESEND_API_KEY || !process.env.MAIL_TO) {
        console.error('❌ Variables RESEND_API_KEY ou MAIL_TO manquantes dans .env.local');
        return NextResponse.json(
            { success: false, error: 'Configuration serveur manquante.' },
            { status: 500 }
        );
    }

    try {
        const { error } = await resend.emails.send({
            from:    'Lia Cuisine <onboarding@resend.dev>',
            to:      process.env.MAIL_TO,
            replyTo: email,
            subject: `Nouveau message de ${prenom} ${nom} — Lia Cuisine`,
            text: `
Nom      : ${prenom} ${nom}
Email    : ${email}

Message
───────────────────────────
${message}
            `.trim(),
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { success: false, error: "Erreur lors de l'envoi." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error('Erreur Resend:', err);
        return NextResponse.json(
            { success: false, error: 'Erreur réseau.' },
            { status: 500 }
        );
    }
}
