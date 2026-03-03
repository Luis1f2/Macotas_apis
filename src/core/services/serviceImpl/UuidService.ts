import { v4 as uuidv4 } from 'uuid';
import ServiceUuid from '../interface/ServiceUuid';

export default class UuidService implements ServiceUuid {
    async generateUuid(): Promise<string> {
        return uuidv4();
    }
}