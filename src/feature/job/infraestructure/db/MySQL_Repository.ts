import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import JobRepository from "../../domain/job_Repository";
import Job from "../../domain/entitie/job";
import UUID from "../../domain/entitie/objectvalue/uuid";
import DatabaseError from "../../../../core/errors/databaseError";
import InvalidError from "../../../../core/errors/invalidError";
import Status from "../../domain/entitie/objectvalue/status";
import Active from "../../domain/entitie/objectvalue/active";

export default class MySQLRepository implements JobRepository {
    constructor(
        private readonly pool: Pool
    ) { }
    async getJobByUuid(uuid: string): Promise<Job> {
        const query = `SELECT * FROM job WHERE uuid = ?`;
        const values = [uuid];

        const [rows] = await this.pool.execute<RowDataPacket[]>(query, values);
        try {
            const row = rows[0];
            if (!row) {
                throw new Error("No se encontro ningun trabajador con ese uuid");
            }

            const job: Job = {
                uuid: UUID.fromDatabase(row.uuid),
                uuidUser: UUID.fromDatabase(row.uuidUser),
                active: Active.fromDatabase(row.active),
                status: Status.fromDatabase(row.status),
                description: row.description,
                experience: row.experience
            };
            return job;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseError(`Error al obtener el trabajo: ${message}`);
        }
    }

    async findJobByUuidUser(uuidUser: string): Promise<Job> {
        const query = `SELECT * FROM job WHERE uuidUser = ?`;
        const values = [uuidUser];

        const [rows] = await this.pool.execute<RowDataPacket[]>(query, values);
        try {
            const row = rows[0];
            if (!row) {
                throw new Error("No se encontro ningun trabajador con ese uuid");
            }

            const job: Job = {
                uuid: UUID.fromDatabase(row.uuid),
                uuidUser: UUID.fromDatabase(row.uuidUser),
                active: Active.fromDatabase(row.active),
                status: Status.fromDatabase(row.status),
                description: row.description,
                experience: row.experience
            };
            return job;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseError(`Error al obtener el trabajo: ${message}`);
        }
    }

    async updateJobByUuid(uuidJob: string, status: boolean, description: string, experience: string): Promise<void> {
        const query = `UPDATE job SET status = ?, description = ?, experience = ? WHERE uuid = ?`;
        const values = [
            status,
            description,
            experience,
            uuidJob
        ];

        try {
            const [result] = await this.pool.execute<ResultSetHeader>(query, values);
            if (result.affectedRows === 0) {
                throw new Error("No se pudo actualizar el perfil de trabajo");
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseError(`Error al actualizar el trabajo: ${message}`);
        }
    }

    async createJob(uuid: string, uuidUser: string, active: boolean): Promise<boolean> {
        const query = `INSERT INTO job (uuid, uuidUser, active) VALUES (?, ?, ?)`;
        const values = [
            uuid,
            uuidUser,
            active,
        ];

        try {
            await this.pool.execute(query, values);
            return true;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseError(`Error al crear el trabajo: ${message}`);
        }
    }

    async deleteJobByUuid(uuid: string): Promise<void> {
        const query = "DELETE FROM users WHERE uuid = ?";
        const values = [uuid];

        try {
            const [rows] = await this.pool.execute<RowDataPacket[]>(query, values);
            if (rows.length === 0) {
                throw new InvalidError("No se pudo verificar tu entidad");
            }

            await this.pool.execute(query, values);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseError(`Error al eliminar el trabajo: ${message}`);
        }
    }
}