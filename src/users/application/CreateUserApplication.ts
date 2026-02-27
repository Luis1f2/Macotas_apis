import { UserRepository } from "../domain/repository/UserRepository";
import {User} from "../domain/entities/User";
import {randomUUID} from "crypto";
import bcrypt from "bcrypt";

interface CreateUserDTO{
    name: string;
    email: string;
    password: string;
    phone?: string;
}

export class CreateUser{
    constructor(private repository: UserRepository){}
    async execute(data: CreateUserDTO): Promise<User> {
    const existing = await this.repository.findByEmail(data.email);

    if (existing) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User(
        randomUUID(),
        data.name,
        data.email,
        hashedPassword,
        'user',
        true,
        data.phone
    );

    await this.repository.save(user);

        return user;
    }
}
