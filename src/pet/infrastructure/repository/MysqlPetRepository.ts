import { pool } from "../../../config/MySqlConnect";
import { Pet } from "../../domain/entity/pet";
import { PetRepository } from "../../domain/repository/petRepository";

export class MySQLPetRepository implements PetRepository {

async save(pet: Pet): Promise<void> {
    await pool.execute(
        `INSERT INTO pets 
        (id, user_id, name, species, breed, birth_date)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
        pet.id,
        pet.userId,
        pet.name,
        pet.species,
        pet.breed ?? null,
        pet.birthDate ?? null
        ]
    );
}

    async findById(id: string) {
    const [rows]: any = await pool.execute(
      "SELECT * FROM pets WHERE id = ?",
        [id]
    );

    if (rows.length === 0) return null;

    const row = rows[0];

    return new Pet(
        row.id,
        row.user_id,
        row.name,
        row.species,
        row.breed,
        row.birth_date
    );
}

    async update(pet: Pet) {
    await pool.execute(
        "UPDATE pets SET name = ?, breed = ? WHERE id = ?",
        [pet.name, pet.breed ?? null, pet.id]
    );
}

    async delete(id: string) {
    await pool.execute(
        "DELETE FROM pets WHERE id = ?",
        [id]
    );
    }
}