import WorkServicesRepository from "../../domain/Work_Services_Repositrory";
import ResponseDto from "../dto/ResponseDto";
import ServiceUuid from "../../../../core/services/interface/ServiceUuid";
import UUID from "../../domain/entitie/objectvalue/uuid";
import CreateRequestDto from "../dto/CreateRequestDto";
import WorkServices from "../../domain/entitie/Work_Services";
import TypeService from "../../domain/entitie/objectvalue/typeservice";
import Service from "../../domain/entitie/objectvalue/service";
import Active from "../../domain/entitie/objectvalue/active";

export default class CreateWorkServiceUseCase {
    constructor(
        private readonly workServicesRepository: WorkServicesRepository,
        private readonly uuidService: ServiceUuid
    ) {}

    async run(createRequestDto: CreateRequestDto): Promise<ResponseDto>{
        const uuid = await this.uuidService.generateUuid();
        const uuidJob = UUID.validate(createRequestDto.uuidJob);
        const uuidService = UUID.validate(uuid);

        const typeService = TypeService.validate(createRequestDto.typeService);
        const service = Service.validate(createRequestDto.service, typeService.getValue());
        const active = Active.validateActive(service.getValue(), createRequestDto.active);

        const newWorkServices: WorkServices = {
            uuid: uuidService,
            uuidJob: uuidJob,
            typeservice: typeService,
            service: service,
            price: createRequestDto.price,
            address: createRequestDto.address,
            active: active
        };

        await this.workServicesRepository.createWorkServices(newWorkServices);
        
        return {
            message: "El servicio se ha creado correctamente",
            status: 201,
        }
    }
}