import Active from "./objectvalue/active";
import Status from "./objectvalue/status";
import UUID from "./objectvalue/uuid";

export default interface Job {
    uuid: UUID;
    uuidUser: UUID;
    description: string;
    experience: string;
    active: Active;
    status: Status;
    certification?: boolean;
}