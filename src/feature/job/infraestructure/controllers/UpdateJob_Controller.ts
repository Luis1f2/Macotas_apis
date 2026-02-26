import { Request, Response } from "express";
import InvalidError from "../../../../core/errors/invalidError";
import UpdateJobUseCase from "../../application/usescases/UpdateJob_UseCase";

export default class UpdateJobController {
    constructor(
        private readonly updateJobUseCase: UpdateJobUseCase
    ) { }

    async run(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            if (!id) {
                throw new InvalidError("Error: No se envio la informacion especifica del usuario");
            }

            const { uuidUser, description, experience, status } = req.body;
            const hasAtLeastOneField =
                description !== undefined ||
                experience !== undefined;

            if (!hasAtLeastOneField) {
                throw new InvalidError("Error: Debes enviar al menos un campo para actualizar (description, experience o active)");
            }

            const updateResponse = await this.updateJobUseCase.run(
                id as string,
                uuidUser,
                status,
                description,
                experience
            );

            return res.status(updateResponse.status).json(updateResponse);
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