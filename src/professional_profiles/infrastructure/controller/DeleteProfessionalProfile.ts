import { Request, Response } from "express";
import { DeleteProfessionalProfile } from "../../application/DeleateProfessionalProfilesApplication";
import { MySQLProfessionalProfileRepository } from "../repository/MySQLProfessionalProfileRepository";

export class DeleteProfessionalProfileController {
    async handle(req: Request<{ userId: string }>, res: Response) {
    try {
        const repository = new MySQLProfessionalProfileRepository();
        const useCase = new DeleteProfessionalProfile(repository);

        const result = await useCase.execute(req.params.userId);

        res.status(200).json(result);

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
    }
}