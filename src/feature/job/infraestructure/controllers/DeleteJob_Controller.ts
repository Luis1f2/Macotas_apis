import { Request, Response } from "express";
import DeleteJobUseCase from "../../application/usescases/DeleteJob_UseCase";
import InvalidError from "../../../../core/errors/invalidError";

export default class DeleteJobController {
    constructor(
        private readonly deleteJobUseCase: DeleteJobUseCase
    ) { }

    async run(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            if (!id) {
                throw new InvalidError("Error: No se envio la informacion especifica de la cuenta");
            }

            const deleteResponse = await this.deleteJobUseCase.run(id as string);
            return res.status(deleteResponse.status).json(deleteResponse);
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