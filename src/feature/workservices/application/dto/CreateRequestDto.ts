export default interface CreateRequestDto {
    uuidJob: string;
    typeService: string;
    service: string;
    price: number;
    address: string;
    active: boolean;
}