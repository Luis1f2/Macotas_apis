import { Request, Response } from "express";
import InvalidError from "../../../../core/errors/invalidError";
import GetJobUseCase from "../../application/usescases/GetJob_UseCase";

export default class GetJobController {
    constructor(
        private readonly getJobUseCase: GetJobUseCase
    ) { }

    async run(req: Request, res: Response) {
        try {
            const { uuid } = req.params;
            const { uuidUser } = req.body;

            const job = await this.getJobUseCase.run(
                uuid as string,
                uuidUser
            );

            return res.status(200).json(job);
        } catch (error) {
            if (error instanceof InvalidError) {
                return res.status(400).json({ error: error.message });
            }

            return res.status(500).json({
                status: 500,
                message: "Error: Internal server error",
                error: error
            });
        }
    }
}