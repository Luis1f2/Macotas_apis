import InvalidError from "../../../../../core/errors/invalidError";
import { ActiveEnum } from "../enums/Active";

export default class Active {
    private readonly value: boolean;

    constructor(value: boolean) {
        this.value = value;
    }

    public static validate(value: string): Active {
        if (!value) {
            throw new InvalidError("El valor no es valido");
        }

        switch (value) {
            case ActiveEnum.ACTIVE:
                return new Active(true);
            case ActiveEnum.INACTIVE:
                return new Active(false);
            default:
                throw new InvalidError("El estado no es valido");
        }
    }

    public static fromDatabase(value: boolean): Active {
        return new Active(value);
    }

    public static toString(value: Active): string {
        switch (value.getValue()) {
            case true:
                return ActiveEnum.ACTIVE;
            case false:
                return ActiveEnum.INACTIVE;
            default:
                throw new InvalidError("El estado no es valido");
        }
    }

    public getValue(): boolean {
        return this.value;
    }
}