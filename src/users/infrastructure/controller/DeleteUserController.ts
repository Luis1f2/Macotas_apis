import { Request, Response } from "express";
import { DeleteUser } from "../../application/DeleteUserApplication";
import { MySQLUserRepository } from "../repository/MysqlUserRespository";

interface Params {
    id: string;
}

export class DeleteUserController {
async handle(req: Request<Params>, res: Response) {
    try {
        const repository = new MySQLUserRepository();
        const useCase = new DeleteUser(repository);

        const result = await useCase.execute(req.params.id);

        res.status(200).json(result);

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
}