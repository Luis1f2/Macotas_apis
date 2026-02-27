import { Request, Response } from "express";
import { LoginUser } from "../../application/LoginUserApplication";
import { MySQLUserRepository } from "../repository/MysqlUserRespository";

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const repository = new MySQLUserRepository();
      const useCase = new LoginUser(repository);

      const result = await useCase.execute(req.body);

      res.status(200).json(result);

    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}