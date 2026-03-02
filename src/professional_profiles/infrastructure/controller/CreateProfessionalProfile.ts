import { Request, Response } from "express";
import { CreateProfessionalProfile } from "../../application/CreateProfessionalProfilesApplication";
import { MySQLProfessionalProfileRepository } from "../repository/MySQLProfessionalProfileRepository";

export class CreateProfessionalProfileController {
    async handle(req: Request, res: Response) {
    try {
        const repository = new MySQLProfessionalProfileRepository();
        const useCase = new CreateProfessionalProfile(repository);

        const result = await useCase.execute(req.body);

        res.status(201).json(result);

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
    }
}