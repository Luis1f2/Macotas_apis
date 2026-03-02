import { PetRepository } from "../domain/repository/petRepository";
import { Pet } from "../domain/entity/pet";
import { randomUUID } from "crypto";

interface CreatePetDTO {
    userId: string;
    name: string;
    species: string;
    breed?: string;
    birthDate?: Date;
}

export class CreatePet {
  constructor(private repository: PetRepository) {}

  async execute(data: CreatePetDTO) {
    const pet = new Pet(
        randomUUID(),
        data.userId,
        data.name,
        data.species,
        data.breed,
        data.birthDate
    );

    await this.repository.save(pet);

    return pet;
  }
}