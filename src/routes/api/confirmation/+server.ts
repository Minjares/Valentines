import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { confirmations } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
    try {
        const confirmation = await db.select().from(confirmations).limit(1);
        return json(confirmation);
    } catch (error) {
        return json({ error: 'Failed to fetch confirmation' }, { status: 500 });
    }
}

export async function PUT() {
    try {
        await db.update(confirmations).set({ confirmed: true });
        return json({ message: 'Confirmation updated' });
    } catch (error) {
        return json({ error: 'Failed to update confirmation' }, { status: 500 });
    }
}
