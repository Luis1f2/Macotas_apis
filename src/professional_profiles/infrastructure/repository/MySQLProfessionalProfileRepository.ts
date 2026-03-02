import { pool } from "../../../config/MySqlConnect";
import { ProfessionalProfile } from "../../domain/entities/Professionalprofiles";
import { ProfessionalProfileRepository } from "../../domain/repository/ProfessionalProfilesRepository";

export class MySQLProfessionalProfileRepository
implements ProfessionalProfileRepository
{
    async save(profile: ProfessionalProfile): Promise<void> {
        await pool.execute(
        `INSERT INTO professional_profiles
        (id, user_id, description, experience, is_active)
        VALUES (?, ?, ?, ?, ?)`,
        [
            profile.id,
            profile.userId,
            profile.description ?? null,
            profile.experience ?? null,
            profile.isActive,
        ]
        );
    }

    async findByUserId(userId: string) {
        const [rows]: any = await pool.execute(
        "SELECT * FROM professional_profiles WHERE user_id = ?",
        [userId]
    );

    if (rows.length === 0) return null;

    const row = rows[0];

    return new ProfessionalProfile(
        row.id,
        row.user_id,
        row.description ?? null,
        row.experience ?? null,
        row.is_active
        );
    }

    async deleteByUserId(userId: string): Promise<void> {
    await pool.execute(
        "DELETE FROM professional_profiles WHERE user_id = ?",
        [userId]
        );
    }
}