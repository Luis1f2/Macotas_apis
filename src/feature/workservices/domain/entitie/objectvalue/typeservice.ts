import InvalidError from "../../../../../core/errors/invalidError";

export default class TypeService {
    private readonly value: string;

    constructor(value: string){
        this.value = value;
    }

    public static validate(value: string): TypeService {
        if (!value) {
            throw new InvalidError("El tipo de servicio es requerido");
        }

        const normalizedValue = value.toLowerCase().trim();

        const typeservice = ["movilidad & ejercicio", "cuidado en hogar", "higiene & estética", "entrenamiento & comportamiento", "salud & bienestar", "extras"];
        
        if (!typeservice.includes(normalizedValue)) {
            throw new InvalidError("El tipo de servicio no es valido");
        }

        return new TypeService(normalizedValue);
    }

    public static fromDatabase(value: string): TypeService {
        return new TypeService(value);
    }

    public getValue(): string {
        return this.value;
    }
}