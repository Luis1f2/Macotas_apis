import WorkServicesRepository from "../../domain/Work_Services_Repositrory";
import ResponseDto from "../dto/ResponseDto";

export default class UpdateWorkServiceUseCase{
    constructor(
        private readonly workServicesRepository: WorkServicesRepository
    ){}

    async run(uuid: string, price?: number, address?: string): Promise<ResponseDto>{

        const workServices = await this.workServicesRepository.getWorkServicesByUuid(uuid);

        let newPrice = workServices.price;
        let newAddress = workServices.address;

        if(price){
            newPrice = price;
        }

        if(address){
            newAddress = address;
        }
        
        await this.workServicesRepository.updateWorkServices(
            uuid, 
            newPrice, 
            newAddress
        );

        return {
            message: "Servicio actualizado correctamente",
            status: 200,
        };
    }
}