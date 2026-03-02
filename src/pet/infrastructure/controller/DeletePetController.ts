import { Request, Response } from "express";
import { DeletePet } from "../../application/DeletePetApplication";
import { MySQLPetRepository } from "../repository/MysqlPetRepository";

export class DeletePetController {
    async handle(req: Request<{ id: string }>, res: Response) {
        try {
        const repository = new MySQLPetRepository();
        const useCase = new DeletePet(repository);

        const result = await useCase.execute(req.params.id);

        res.status(200).json(result);

    } catch (error: any) {
        res.status(400).json({ error: error.message });
        }
    }
}