import { UserRepository } from "../domain/repository/UserRepository";

interface UpdateUserDTO {
  id: string;
  name?: string;
  phone?: string;
}

export class UpdateUser {
  constructor(private repository: UserRepository) {}

  async execute(data: UpdateUserDTO) {
    const user = await this.repository.findById(data.id);

    if (!user) {
      throw new Error("User not found");
    }

    if (data.name) user.name = data.name;
    if (data.phone) user.phone = data.phone;

    await this.repository.update(user);

    return {
      message: "User updated successfully",
    };
  }
}