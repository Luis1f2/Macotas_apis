import InvalidError from "../../../../../core/errors/invalidError";

export default class Service{
    private readonly value: string;

    constructor(value: string){
        this.value = value;
    }

    public static validate(value: string, typeservice: string): Service {
        if (!value) {
            throw new InvalidError("El servicio es requerido");
        }

        const normalizedValue = value.toLowerCase().trim();

        switch (typeservice) {
            case "movilidad & ejercicio":
                { const movilidadEjercicio = this.movilidadEjercicio(normalizedValue);
                return new Service(movilidadEjercicio); }
            case "cuidado en hogar":
                { const cuidadoHogar = this.cuidadoHogar(normalizedValue);
                return new Service(cuidadoHogar); }
            case "higiene & estética":
                { const higieneEstetica = this.higieneEstetica(normalizedValue);
                return new Service(higieneEstetica); }
            case "entrenamiento & comportamiento":
                { const entrenamientoComportamiento = this.entrenamientoComportamiento(normalizedValue);
                return new Service(entrenamientoComportamiento); }
            case "salud & bienestar":
                { const saludBienestar = this.saludBienestar(normalizedValue);
                return new Service(saludBienestar); }
            case "extras":
                { const extras = this.extras(normalizedValue);
                return new Service(extras); }
            default:
                throw new InvalidError("El tipo de servicio no es valido");
        }
    }

    private static movilidadEjercicio(value: string): string {
        const services = [
            "Paseo de perros",
            "Running con perros",
            "Transporte de mascotas",
            "Aventura outdoor"
        ]

        if (!services.includes(value)) {
            throw new InvalidError("El servicio no es valido");
        }

        return value;
    }

    private static cuidadoHogar(value: string): string {
        const services = [
            "Cuidado en casa del dueño",
            "Cuidado en casa del cuidador",
            "Visitas a domicilio",
            "Compañía para mascota anciana"
        ]

        if (!services.includes(value)) {
            throw new InvalidError("El servicio no es valido");
        }

        return value;
    }

    private static higieneEstetica(value: string): string {
        const services = [
            "Baño básico a domicilio",
            "Grooming completo",
            "Spa y bienestar",
            "Limpieza dental"
        ]

        if (!services.includes(value)) {
            throw new InvalidError("El servicio no es valido");
        }

        return value;
    }

    private static entrenamientoComportamiento(value: string): string {
        const services = [
            "Entrenamiento básico",
            "Entrenamiento avanzado",
            "Modificación de conducta",
            "Socialización guiada",
            "Entrenamiento para cachorros"
        ]

        if (!services.includes(value)) {
            throw new InvalidError("El servicio no es valido");
        }

        return value;
    }

    private static saludBienestar(value: string): string {
        const services = [
            "Visita al veterinario",
            "Fisioterapia canina",
            "Alimentación especializada"
        ]

        if (!services.includes(value)) {
            throw new InvalidError("El servicio no es valido");
        }

        return value;
    }

    private static extras(value: string): string {
        const services = [
            "Fotografía de mascotas",
            "Cumpleaños/eventos para mascotas",
            "Entrega de alimentos/suministros"
        ]

        if (!services.includes(value)) {
            throw new InvalidError("El servicio no es valido");
        }

        return value;
    }

    public static fromDatabase(value: string): Service {
        return new Service(value);
    }

    getValue(): string {
        return this.value;
    }
}