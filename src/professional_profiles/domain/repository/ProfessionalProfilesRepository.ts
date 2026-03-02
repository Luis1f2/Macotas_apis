import { ProfessionalProfile } from "../entities/Professionalprofiles";

export interface ProfessionalProfileRepository {
  save(profile: ProfessionalProfile): Promise<void>;
  findByUserId(userId: string): Promise<ProfessionalProfile | null>;
  deleteByUserId(userId: string): Promise<void>;
}