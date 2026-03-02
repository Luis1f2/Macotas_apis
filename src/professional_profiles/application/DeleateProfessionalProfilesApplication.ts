import { ProfessionalProfileRepository } from "../domain/repository/ProfessionalProfilesRepository";

export class DeleteProfessionalProfile {
    constructor(private repository: ProfessionalProfileRepository) {}

    async execute(userId: string) {
        const profile = await this.repository.findByUserId(userId);

    if (!profile) {
        throw new Error("Professional profile not found");
    }

    await this.repository.deleteByUserId(userId);

    return { message: "Professional profile removed" };
    }
}