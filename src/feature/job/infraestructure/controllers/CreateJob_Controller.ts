import { Request, Response } from "express";
import CreateJobUseCase from "../../application/usescases/createJob_UseCase";
import InvalidError from "../../../../core/errors/invalidError";

export default class CreateJobController {
    constructor(
        private readonly createJobUseCase: CreateJobUseCase,
    ) { }

    async execute(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body
            if (!body) {
                throw new InvalidError("Error: No se envio nada para realizar la peticion");
            }
            const createResponse = await this.createJobUseCase.execute(body);

            return res.status(createResponse.status).json(createResponse);
        } catch (error) {
            if (error instanceof InvalidError) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({
                status: 500,
                message: "Error: Internal server error",
                error: error
            });
        }
    }
}