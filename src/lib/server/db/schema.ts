import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core';

export const words = pgTable('words', {
    id: serial('id').primaryKey(),
    word: text('word').notNull(),
    hint: text('hint').notNull()
});

export const confirmations = pgTable('confirmations', {
    id: serial('id').primaryKey(),
    confirmed: boolean('confirmed').notNull(),
});
