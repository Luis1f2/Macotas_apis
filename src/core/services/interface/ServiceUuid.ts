export default interface ServiceUuid {
    generateUuid(): Promise<string>;
}