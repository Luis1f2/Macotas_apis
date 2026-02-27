export type UserRole = 'admin' | 'user';

export class User {
    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public password: string,
        public rol : UserRole = 'user',
        public isActive : boolean = true,
        public phone?: string
    ){}

    deactivate(){
        this.isActive = false;
    }
}