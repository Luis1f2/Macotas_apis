export class Pet {
    constructor(
    public readonly id: string,
    public readonly userId: string,
    public name: string,
    public species: string,
    public breed?: string,
    public birthDate?: Date
    ){}
}