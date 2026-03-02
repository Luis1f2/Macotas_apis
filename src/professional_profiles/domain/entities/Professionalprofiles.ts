export class ProfessionalProfile {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public description?: string,
        public experience?: string,
        public isActive: boolean = true
    ) {}

    deactivate() {
    this.isActive = false;
    }
}