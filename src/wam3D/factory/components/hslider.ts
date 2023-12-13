import {Slider} from "./slider";

export class HSlider extends Slider {
    constructor(label:string, options:any){
        super(label, options);
        this.width = options.width || 50;
        this.height = options.height || 20;
    }
}