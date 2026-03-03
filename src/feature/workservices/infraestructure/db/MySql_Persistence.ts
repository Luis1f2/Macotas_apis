import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import WorkServicesRepository from "../../domain/Work_Services_Repositrory";
import WorkServices from "../../domain/entitie/Work_Services";
import DatabaseError from "../../../../core/errors/databaseError";
import ExistError from "../../../../core/errors/existError";
import UUID from "../../domain/entitie/objectvalue/uuid";
import TypeService from "../../domain/entitie/objectvalue/typeservice";
import Service from "../../domain/entitie/objectvalue/service";
import Active from "../../domain/entitie/objectvalue/active";

export default class MySqlPersistence implements WorkServicesRepository{
    constructor(
        private readonly pool: Pool
    ){}
    async createWorkServices(workServices: WorkServices): Promise<void> {
        const query = "INSERT INTO work_services (uuid, uuidJob, typeService, service, price, address, active) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [
            workServices.uuid.getValue(),
            workServices.uuidJob.getValue(),
            workServices.typeservice.getValue(),
            workServices.service.getValue(),
            workServices.price,
            workServices.address,
            workServices.active.getValue(),
        ];
        try {
            await this.pool.execute(query, values);
        } catch (error) {
            if (error && typeof error === 'object' && 'code' in error) {
                const mysqlError = error as { code: string; message?: string };
                if (mysqlError.code === 'ER_DUP_ENTRY') {
                    throw new ExistError("El servicio ya existe");
                }
            }
            
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseError(`Error al crear el servicio: ${message}`);
        }
    }

    async updateWorkServices(uuid: string, price: number, address: string): Promise<void> {
        const query = "UPDATE work_services SET price = ?, address = ? WHERE uuid = ?";
        const values = [price, address, uuid];
        try {
            const [result] = await this.pool.execute<ResultSetHeader>(query, values);
            if (result.affectedRows === 0) {
                throw new ExistError("El servicio no existe");
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseError(`Error al actualizar el servicio: ${message}`);
        }
    }
    
    async deleteWorkServices(uuid: string): Promise<boolean> {
        const query = "DELETE FROM work_services WHERE uuid = ?";
        const values = [uuid];
        try {
            const [rows] = await this.pool.execute<RowDataPacket[]>(query, values);
        
            if (!rows || rows.length === 0) {
                throw new ExistError("El servicio no existe");
            }
        
            return true;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseError(`Error al eliminar el servicio: ${message}`);
        }
    }

    async getWorkServicesByUuid(uuid: string): Promise<WorkServices> {
        const query = "SELECT * FROM work_services WHERE uuid = ?";
        const values = [uuid];
        try {
            const [rows] = await this.pool.execute<RowDataPacket[]>(query, values);
        
            if (!rows || rows.length === 0) {
                throw new ExistError("El servicio no existe");
            }
        
            const row = rows[0];

            const workServices: WorkServices = {
                uuid: UUID.fromDatabase(row.uuid),
                uuidJob: UUID.fromDatabase(row.uuidJob),
                typeservice: TypeService.fromDatabase(row.typeService),
                service: Service.fromDatabase(row.service),
                price: row.price,
                address: row.address,
                active: Active.fromDatabase(row.active),
            }

            return workServices;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseError(`Error al obtener el servicio: ${message}`);
        }
    }

    async getAllWorkServices(): Promise<WorkServices[]> {
        const query = "SELECT * FROM work_services";
        try {
            const [rows] = await this.pool.execute<RowDataPacket[]>(query);
        
            const workServices: WorkServices[] = rows.map((row) => {
                return {
                    uuid: UUID.fromDatabase(row.uuid),
                    uuidJob: UUID.fromDatabase(row.uuidJob),
                    typeservice: TypeService.fromDatabase(row.typeService),
                    service: Service.fromDatabase(row.service),
                    price: row.price,
                    address: row.address,
                    active: Active.fromDatabase(row.active),
                }
            });

            return workServices;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseError(`Error al obtener el servicio: ${message}`);
        }
    }
}