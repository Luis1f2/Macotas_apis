export default class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Error en la base de datos';
    }
}