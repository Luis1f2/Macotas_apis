import { Pet } from "../entity/pet";

export interface PetRepository {
    save(pet: Pet): Promise<void>;
    findById(id: string): Promise<Pet | null>;
    update(pet: Pet): Promise<void>;
    delete(id: string): Promise<void>;
}