import { Request, Response } from "express";
import { CreateUser } from "../../application/CreateUserApplication";
import { MySQLUserRepository } from "../repository/MysqlUserRespository";

export class UserController {
    async create(req: Request, res: Response) {
    try {
        const repository = new MySQLUserRepository();
        const useCase = new CreateUser(repository);

        const user = await useCase.execute(req.body);

        res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        });

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
}