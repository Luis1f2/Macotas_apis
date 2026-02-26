import { Request, Response } from "express";
import DeleteWorkServiceUseCase from "../../application/usescases/DeleteWorkService_UseCase";
import InvalidError from "../../../../core/errors/invalidError";
import ExistError from "../../../../core/errors/existError";
import DatabaseError from "../../../../core/errors/databaseError";

export default class DeleteWorkServiceController{
    constructor(
        private readonly deleteWorkServiceUseCase: DeleteWorkServiceUseCase
    ){}

    async run(req: Request, res: Response): Promise<Response>{
        try {
            const {uuid} = req.params
            if(!uuid){
                throw new InvalidError("El uuid es requerido");
            }

            const result = await this.deleteWorkServiceUseCase.run(uuid as string);

            return res.status(result.status).json(result);
        } catch (error) {
            if(error instanceof InvalidError){
                return res.status(400).json({message: error.message});
            }

            if(error instanceof ExistError){
                return res.status(404).json({message: error.message});
            }

            if(error instanceof DatabaseError){
                return res.status(500).json({message: error.message});
            }

            return res.status(500).json({message: "Error al eliminar en el servidor"});
        }
    }
}