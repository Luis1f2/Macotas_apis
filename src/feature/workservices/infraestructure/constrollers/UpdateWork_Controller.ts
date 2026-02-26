import { Request, Response } from "express";
import InvalidError from "../../../../core/errors/invalidError";
import DatabaseError from "../../../../core/errors/databaseError";
import UpdateWorkServiceUseCase from "../../application/usescases/UpdateWorkService_UseCase";
import ExistError from "../../../../core/errors/existError";

export default class UpdateWorkServicesController{
    constructor(
        private readonly updateWorkServiceUseCase: UpdateWorkServiceUseCase
    ){}

    async run(req: Request, res: Response): Promise<Response>{
        try {
            const {uuid} = req.params;
            const {price, address} = req.body;

            const updateResponseDto = await this.updateWorkServiceUseCase.run(
                uuid as string, 
                price, 
                address
            );

            return res.status(200).json(updateResponseDto);
        } catch (error) {
            if(error instanceof InvalidError){
                return res.status(400).json({message: error.message});
            }

            if(error instanceof ExistError){
                return res.status(404).json({message: error.message});
            }

            if (error instanceof DatabaseError){
                return res.status(500).json({message: error.message});
            }

            return res.status(500).json({message: "Error al actualizar el servicio"});
        }
    }
}