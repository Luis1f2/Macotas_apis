import { PetRepository } from "../domain/repository/petRepository";

export class DeletePet {
    constructor(private repository: PetRepository) {}

    async execute(id: string) {
        const pet = await this.repository.findById(id);

        if (!pet) {
        throw new Error("Pet not found");
        }

    await this.repository.delete(id);

        return { message: "Pet deleted successfully" };
    }
}