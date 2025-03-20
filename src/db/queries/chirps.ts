import { eq } from "drizzle-orm";
import { db } from "../index.js"
import { NewChirp, chirps } from "../schema/schema.js"

export async function CreateChirp(chirp: NewChirp) {
    const [rows] = await db.insert(chirps).values(chirp).onConflictDoNothing().returning();
    return rows;
}

export async function getChirps() {
    return db.select().from(chirps);
}

export async function getChirp(id: string) {
    const rows = await db.select().from(chirps).where(eq(chirps.id, id));
    if (rows.length === 0 ) {
        return;
    }
    return rows[0];
}