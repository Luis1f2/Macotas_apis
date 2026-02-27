import { Request, Response } from "express";
import { UpdateUser } from "../../application/UpdateUserApplication";
import { MySQLUserRepository } from "../repository/MysqlUserRespository";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    try {
      const repository = new MySQLUserRepository();
      const useCase = new UpdateUser(repository);

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