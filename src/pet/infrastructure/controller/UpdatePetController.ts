import { Request, Response } from "express";
import { UpdatePet } from "../../application/UpdatePetApplication";
import { MySQLPetRepository } from "../repository/MysqlPetRepository";

export class UpdatePetController {
    async handle(req: Request<{ id: string }>, res: Response) {
        try {
            const repository = new MySQLPetRepository();
            const useCase = new UpdatePet(repository);

        const result = await useCase.execute({
            id: req.params.id,
            ...req.body,
        });

        res.status(200).json(result);

        } catch (error: any) {
        res.status(400).json({ error: error.message });
        }
    }
}