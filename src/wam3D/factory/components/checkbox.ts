export class Checkbox {
    public pressed: boolean;
    private _label: string;
    constructor(label:string, options:any){
        this._label = label;
        this.pressed = false;
    }
    get label(): string {
        return this._label;
    }
}