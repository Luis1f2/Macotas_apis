import Active from "../../domain/entitie/objectvalue/active";
import Status from "../../domain/entitie/objectvalue/status";
import UUID from "../../domain/entitie/objectvalue/uuid";
import InvalidError from "../../../../core/errors/invalidError";
import JobRepository from "../../domain/job_Repository";
import GetResponse from "../dto/GetResponse";

export default class GetJobUseCase {
    constructor(
        private readonly repository: JobRepository
    ) { }

    async run(uuid: string, uuidUser: string): Promise<GetResponse> {
        const idJob = UUID.validate(uuid);
        const idUser = UUID.validate(uuidUser);

        const job = await this.repository.getJobByUuid(idJob.getValue());

        const newJob: GetResponse = {
            uuid: job.uuid.getValue(),
            uuidUser: job.uuidUser.getValue(),
            active: Active.toString(job.active),
            status: Status.toString(job.status),
            description: job.description,
            experience: job.experience
        }

        if (job.uuidUser.getValue() !== idUser.getValue()) {
            throw new InvalidError("No tienes permiso para acceder a esta información");
        }

        return newJob;
    }
}