/**
 * Represents the base class for a slider component.
 */
export class Slider {
    protected label: string;
    protected min: number;
    protected max: number;
    protected step: number;
    protected init: number;
    protected width: number;
    protected height: number;
    protected style: string;

    /**
     * Creates a new instance of the Slider class.
     * @param _label - The label for the slider.
     * @param options - The options for the slider. If not provided, default values are used.
     */
    constructor(_label: string, options: any) {
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