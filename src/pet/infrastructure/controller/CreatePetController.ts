import { Request, Response } from "express";
import { CreatePet } from "../../application/CreatePetApplication";
import { MySQLPetRepository } from "../repository/MysqlPetRepository";

export class CreatePetController {
    async handle(req: Request, res: Response) {
        try {
        const repository = new MySQLPetRepository();
        const useCase = new CreatePet(repository);

        const result = await useCase.execute(req.body);

        res.status(201).json(result);

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
}