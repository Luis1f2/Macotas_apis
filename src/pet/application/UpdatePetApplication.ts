import { PetRepository } from "../domain/repository/petRepository";

interface UpdatePetDTO {
    id: string;
    name?: string;
    breed?: string;
}

export class UpdatePet {
    constructor(private repository: PetRepository) {}

    async execute(data: UpdatePetDTO) {
        const pet = await this.repository.findById(data.id);

    if (!pet) {
        throw new Error("Pet not found");
    }

    if (data.name) pet.name = data.name;
    if (data.breed) pet.breed = data.breed;

    await this.repository.update(pet);

    return { message: "Pet updated successfully" };
    }
}