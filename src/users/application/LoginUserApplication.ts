import { UserRepository } from "../domain/repository/UserRepository";
import bcrypt from "bcrypt";

interface LoginDTO {
    email: string;
    password: string;
}

export class LoginUser {
    constructor(private repository: UserRepository) {}

    async execute(data: LoginDTO) {
        const user = await this.repository.findByEmail(data.email);

    if (!user) {
        throw new Error("Invalid credentials");
        }

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) {
        throw new Error("Invalid credentials");
        }

    return {
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            },
        };
    }
}