import { UserRepository } from "../domain/repository/UserRepository";

export class DeleteUser {
  constructor(private repository: UserRepository) {}

  async execute(id: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    await this.repository.delete(id);

    return {
      message: "User deleted successfully",
    };
  }
}