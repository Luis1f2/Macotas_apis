import UUID from "../../domain/entitie/objectvalue/uuid";
import JobRepository from "../../domain/job_Repository";
import ResponseDto from "../dto/ResponseDto";

export default class DeleteJobUseCase{
    constructor(
        private readonly repository: JobRepository
    ){}

    async run(uuid: string): Promise<ResponseDto>{
        const idJob = UUID.validate(uuid);
        await this.repository.deleteJobByUuid(idJob.getValue());

        return {
            status: 200,
            message: "Cuenta eliminada correctamente",
        };
    }
}