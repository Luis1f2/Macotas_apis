import { Request, Response } from "express";
import CreateWorkServiceUseCase from "../../application/usescases/CreateWorkService_UseCase";
import InvalidError from "../../../../core/errors/invalidError";
import DatabaseError from "../../../../core/errors/databaseError";
import ExistError from "../../../../core/errors/existError";

export default class CreateWorkServiceController{
    constructor(
        private readonly createWorkServiceUseCase: CreateWorkServiceUseCase
    ){}

    async run(req: Request, res: Response): Promise<Response>{
        try {
            const {uuidJob, typeService, service, price, address, active} = req.body;

            const createRequestDto = {
                uuidJob,
                typeService,
                service,
                price,
                address,
                active
            };

            const createResponseDto = await this.createWorkServiceUseCase.run(createRequestDto);

            return res.status(200).json(createResponseDto);
        } catch (error) {
            if(error instanceof InvalidError){
                return res.status(400).json({message: error.message});
            }
            
            if(error instanceof ExistError){
                return res.status(409).json({message: error.message});
            }

            if (error instanceof DatabaseError){
                return res.status(500).json({message: error.message});
            }

            return res.status(500).json({message: "Error al crear el servicio"});
        }
    }
}