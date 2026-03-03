export default class ExistError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ExistError";
    }
}