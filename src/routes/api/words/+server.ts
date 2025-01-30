import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { words } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
    try {
        const randomWords = await db.select()
            .from(words)
            .orderBy(sql`RANDOM()`)
            .limit(5);

        return json(randomWords);
    } catch (error) {
        return json({ error: 'Failed to fetch words' }, { status: 500 });
    }
}
