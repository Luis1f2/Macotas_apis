import InvalidError from "../../../../../core/errors/invalidError";
import { StatusEnum } from "../enums/Status";

export default class Status {
    private readonly value: boolean;

    constructor(value: boolean) {
        this.value = value;
    }

    public static validate(value: string): Status {
        if (!value) {
            throw new InvalidError("El estado no es valido");
        }

        switch (value) {
            case StatusEnum.SERVING:
                return new Status(true);
            case StatusEnum.NO_SERVING:
                return new Status(false);
            default:
                throw new InvalidError("El estado no es valido");
        }
    }

    public static fromDatabase(value: boolean): Status {
        return new Status(value);
    }

    public static toString(value: Status): string {
        switch (value.getValue()) {
            case true:
                return StatusEnum.SERVING;
            case false:
                return StatusEnum.NO_SERVING;
            default:
                throw new InvalidError("El estado no es valido");
        }
    }

    public getValue(): boolean {
        return this.value;
    }
}