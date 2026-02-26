import Status from "../../domain/entitie/objectvalue/status";
import UUID from "../../domain/entitie/objectvalue/uuid";
import JobRepository from "../../domain/job_Repository";
import ResponseDto from "../dto/ResponseDto";

export default class UpdateJobUseCase{
    constructor(
        private readonly repository: JobRepository
    ) {}

    async run(uuid: string, uuidUser: string, status: string, description?: string, experience?: string): Promise<ResponseDto> {
        const idUser = UUID.validate(uuidUser);
        const idJob = UUID.validate(uuid);
        const statusValue = Status.validate(status);
        
        const existingJob = await this.repository.findJobByUuidUser(idUser.getValue());

        let finalDescription = existingJob?.description
        if(description){
            finalDescription = description
        }

        let finalExperience = existingJob?.experience
        if(experience){
            finalExperience = experience
        }

        await this.repository.updateJobByUuid(
            idJob.getValue(), 
            statusValue.getValue(),
            finalDescription,
            finalExperience
        );

        return {
            message: "Se actualizado la informacion de tu empleo",
            status: 200
        }
    }
}