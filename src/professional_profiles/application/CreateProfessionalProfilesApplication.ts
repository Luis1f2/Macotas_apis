import { ProfessionalProfileRepository } from "../domain/repository/ProfessionalProfilesRepository";
import { ProfessionalProfile } from "../domain/entities/Professionalprofiles";
import { randomUUID } from "crypto";

interface CreateProfessionalProfileDTO {
    userId: string;
    description?: string;
    experience?: string;
}

export class CreateProfessionalProfile {
    constructor(private repository: ProfessionalProfileRepository) {}

    async execute(data: CreateProfessionalProfileDTO) {
    const existing = await this.repository.findByUserId(data.userId);

    if (existing) {
        throw new Error("User already has professional profile");
    }

    const profile = new ProfessionalProfile(
        randomUUID(),
        data.userId,
        data.description,
        data.experience
    );

    await this.repository.save(profile);

    return profile;
    }
}