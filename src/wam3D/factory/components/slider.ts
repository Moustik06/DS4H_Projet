export class Slider{
    protected label: string;
    protected min : number;
    protected max : number;
    protected step : number;
    protected init : number;
    protected width : number;
    protected height : number;
    protected style : string;

    constructor(_label:string, options:any) {
        this.label = _label;
        this.min = options.min || 0;
        this.max = options.max || 100;
        this.step = options.step || 1;
        this.init = options.init || 0;
        this.width = options.width || 128;
        this.height = options.height || 40;
        this.style = options.style || null;
    }

}