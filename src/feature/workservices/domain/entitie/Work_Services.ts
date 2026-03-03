import Active from "./objectvalue/active";
import Service from "./objectvalue/service";
import TypeService from "./objectvalue/typeservice";
import UUID from "./objectvalue/uuid";

export default interface WorkServices {
    uuid: UUID;
    uuidJob: UUID;
    typeservice: TypeService;
    service: Service;
    price: number;
    address: string;
    active: Active;
}