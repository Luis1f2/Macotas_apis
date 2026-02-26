import WorkServices from "./entitie/Work_Services";

export default interface WorkServicesRepository{
    createWorkServices(workServices: WorkServices): Promise<void>;
    updateWorkServices(uuid: string, price: number, address: string): Promise<void>;
    deleteWorkServices(uuid: string): Promise<boolean>;
    getWorkServicesByUuid(uuid: string): Promise<WorkServices>;
    getAllWorkServices(): Promise<WorkServices[]>;
}