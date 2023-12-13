export class NEntry{
    private min : number;
    private max : number;
    private step : number;
    private init : number;
    private type : string;
    constructor(label:string, options:any){
        this.min = options.min || 0;
        this.max = options.max || 100;
        this.step = options.step || 1;
        this.init = options.init || 0;
        this.type = options.type || 'number';

    }
}