import Job from "./entitie/job";

export default interface JobRepository {
    findJobByUuidUser(uuidUser: string): Promise<Job>;
    getJobByUuid(uuid: string): Promise<Job>;
    updateJobByUuid(uuidJob: string, status: boolean, description: string, experience: string): Promise<void>;
    createJob(uuid: string, uuidUser: string, active: boolean): Promise<boolean>;
    deleteJobByUuid(uuid: string): Promise<void>;
}