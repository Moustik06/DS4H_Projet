export class BaseComponents {
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get minimum(): number {
        return this._minimum;
    }

    set minimum(value: number) {
        this._minimum = value;
    }

    get maximum(): number {
        return this._maximum;
    }

    set maximum(value: number) {
        this._maximum = value;
    }

    get step(): number {
        return this._step;
    }

    set step(value: number) {
        this._step = value;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

    private _name: string;
    private _minimum: number;
    private _maximum: number;
    private _step: number;
    private _value: number;
    private _style: string;
    constructor(label:string,options:any){
        this._name = label;
        this._minimum = options.min || 0;
        this._maximum = options.max || 100;
        this._step = options._step || 1;
        this._value = options.init || 0;
        this._style = options.style || null;
    }

}