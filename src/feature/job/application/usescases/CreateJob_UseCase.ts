import ServiceUuid from "../../../../core/services/interface/ServiceUuid";
import Active from "../../domain/entitie/objectvalue/active";
import UUID from "../../domain/entitie/objectvalue/uuid";
import JobRepository from "../../domain/job_Repository";
import CreateRequest from "../dto/createRequest";
import CreateResponse from "../dto/createResponse";

export default class CreateJobUseCase {
    constructor(
        private readonly repository: JobRepository,
        private readonly serviceUuid: ServiceUuid
    ) {}

    async execute(createRequest: CreateRequest): Promise<CreateResponse> {
        const newUuid = await this.serviceUuid.generateUuid();
        const uuid = UUID.validate(newUuid);
        const uuidUser = UUID.validate(createRequest.uuidUser);
        const activeValue = Active.validate(createRequest.active);

        const result = await this.repository.createJob(
            uuid.getValue(), 
            uuidUser.getValue(), 
            activeValue.getValue()
        );

        if(result === false){
            throw new Error("No se pudo crear el perfil de trabajo");
        }
        
        return {
            messague: "Se ha creado el perfil de trabajo",
            status: 200,
            activeJob: true,
        };
    }
}