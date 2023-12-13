export class HBarGraph{
    private _label:string;
    private _width:number;
    private _height:number;
    constructor(label:string, options:any){
        this._label = label;
        this._width = options.width || 100
        this._height = options.height || 10;
    }
    get label():string{
        return this._label;
    }
}