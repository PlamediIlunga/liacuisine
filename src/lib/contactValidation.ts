export const CONTACT_LIMITS = {
    prenom: 80,
    nom: 80,
    email: 254,
    message: 5000,
    name: 160,
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactPayload = {
    prenom: string;
    nom: string;
    email: string;
    message: string;
};

export type ContactValidationResult =
    | { ok: true; data: ContactPayload }
    | { ok: false; error: string };

export function isValidEmail(email: string): boolean {
    return email.length <= CONTACT_LIMITS.email && EMAIL_REGEX.test(email);
}

export function stripHeaderInjection(value: string): string {
    return value.replace(/[\r\n]/g, ' ').trim();
}

export function isHoneypotTriggered(body: unknown): boolean {
    if (!body || typeof body !== 'object') return false;
    const website = (body as Record<string, unknown>).website;
    return typeof website === 'string' && website.trim() !== '';
}

export function validateContactPayload(raw: unknown): ContactValidationResult {
    if (!raw || typeof raw !== 'object') {
        return { ok: false, error: 'Données invalides.' };
    }

    const body = raw as Record<string, unknown>;

    const prenom  = stripHeaderInjection(String(body.prenom  ?? ''));
    const nom     = stripHeaderInjection(String(body.nom     ?? ''));
    const email   = String(body.email   ?? '').trim().toLowerCase();
    const message = String(body.message ?? '').trim();

    if (!prenom)  return { ok: false, error: 'Le prénom est requis.' };
    if (!nom)     return { ok: false, error: 'Le nom est requis.' };
    if (!email)   return { ok: false, error: "L'adresse courriel est requise." };
    if (!message) return { ok: false, error: 'Le message est requis.' };

    if (prenom.length > CONTACT_LIMITS.prenom)   return { ok: false, error: 'Le prénom est trop long.' };
    if (nom.length > CONTACT_LIMITS.nom)         return { ok: false, error: 'Le nom est trop long.' };
    if (message.length > CONTACT_LIMITS.message) return { ok: false, error: 'Le message est trop long.' };

    if (!isValidEmail(email)) {
        return { ok: false, error: 'Adresse courriel invalide.' };
    }

    return { ok: true, data: { prenom, nom, email, message } };
}

export function validateHomeForm(name: string, email: string, message: string): ContactValidationResult {
    const trimmedName = name.trim();

    if (!trimmedName) return { ok: false, error: 'Le nom est requis.' };
    if (trimmedName.length > CONTACT_LIMITS.name) {
        return { ok: false, error: 'Le nom est trop long.' };
    }

    return validateContactPayload({
        prenom: trimmedName,
        nom: '(accueil)',
        email: email.trim(),
        message: message.trim(),
    });
}
