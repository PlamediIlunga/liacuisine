import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {

    const { prenom, nom, email, message } = await req.json();

    if (!prenom || !nom || !email || !message) {
        return NextResponse.json(
            { success: false, error: 'Tous les champs sont requis.' },
            { status: 400 }
        );
    }

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