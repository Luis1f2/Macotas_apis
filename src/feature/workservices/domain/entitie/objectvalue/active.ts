export default class Active {
    private readonly value: boolean;

    constructor(value: boolean) {
        this.value = value;
    }

    public static validateActive(service: string, certificate: boolean): Active {

        const activeService = [
            "Transporte de mascotas", 
            "Cuidado en casa del cuidador", 
            "Compañía para mascota anciana", 
            "Grooming completo", 
            "Spa y bienestar", 
            "Limpieza dental", 
            "Entrenamiento avanzado",
            "Modificación de conducta",
            "Socialización guiada",
            "Visita al veterinario",
            "Fisioterapia canina",
            "Alimentación especializada",
            "Fotografía de mascotas",
            "Cumpleaños/eventos para mascotas",
            "Entrega de alimentos/suministros",
        ];

        if(activeService.includes(service)){
            if (certificate === true) {
                return new Active(true);
            }
        }

        return new Active(false);
    }

    public static fromDatabase(value: boolean): Active {
        return new Active(value);
    }

    public getValue(): boolean {
        return this.value;
    }
}