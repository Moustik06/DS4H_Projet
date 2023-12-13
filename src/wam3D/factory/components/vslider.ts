import {Slider} from "./slider";
export class VSlider extends Slider{

    constructor(label:string, options:any){
        super(label, options);
        this.width = options.width || 127;
        this.height = options.height || 32;
    }

}