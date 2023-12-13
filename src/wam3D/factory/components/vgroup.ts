export class VGroup {
    label: string;
    private options: any;
    readonly components: any[];
    constructor(label: string, ...options: any[]) {
        this.label = label;
        this.options = options;
        this.components = [];
    }

    addComponent(component: any) {
        this.components.push(component);
    }
    getComponents() {
        return this.components;
    }
}
