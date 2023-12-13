export class Switch{
    private _label: string;
    public pressed: boolean;
    constructor(label:string, options:any){
        this._label = label;
        this.pressed = false;
    }
    get label(): string {
        return this._label;
    }
}