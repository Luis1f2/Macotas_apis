import UUID from "../../domain/entitie/objectvalue/uuid";
import WorkServicesRepository from "../../domain/Work_Services_Repositrory";
import ResponseDto from "../dto/ResponseDto";

export default class DeleteWorkServiceUseCase{
    constructor(
        private readonly workServicesRepository: WorkServicesRepository
    ){}

    async run(uuid: string): Promise<ResponseDto>{
        const uuidValue = UUID.validate(uuid);
        await this.workServicesRepository.deleteWorkServices(uuidValue.getValue());

        return {
            message: "Servicio eliminado correctamente",
            status: 200,
        };
    }
}