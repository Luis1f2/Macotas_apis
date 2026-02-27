import { UserRepository } from "../../domain/repository/UserRepository";
import { User } from "../../domain/entities/User";
import { pool } from "../../../config/MySqlConnect";

export class MySQLUserRepository implements UserRepository {
async save(user: User): Promise<void> {
    await pool.execute(
        `INSERT INTO users 
        (id, name, email, password, role, is_active, phone)
        VALUES (?, ?, ?, ?, ?, ?,?)`,
        [
            user.id,
            user.name,
            user.email,
            user.password,
            user.rol,
            user.isActive,
            user.phone || null
        ]
    );
}

async findByEmail(email: string): Promise<User | null> {
    const [rows]: any = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if (rows.length === 0) return null;

    const row = rows[0];

    return new User(
    row.id,
    row.name,
    row.email,
    row.password,
    row.role,
    row.is_active,
    row.phone
    );


}
async findById(id: string) {
  const [rows]: any = await pool.execute(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );

  if (rows.length === 0) return null;

  const row = rows[0];

  return new User(
    row.id,
    row.name,
    row.email,
    row.password,
    row.role,
    row.is_active,
    row.phone
  );
}

async update(user: User) {
    await pool.execute(
        "UPDATE users SET name = ?, phone = ? WHERE id = ?",
        [user.name, user.phone ?? null, user.id]
    );
}

async delete(id: string) {
    await pool.execute(
        "DELETE FROM users WHERE id = ?",
        [id]
    );
}

}