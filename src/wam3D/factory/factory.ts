import { VGroup } from './components/vgroup';
import { HGroup } from './components/hgroup';
import { HSlider } from './components/hslider';
import { Switch } from './components/switch';
import { Checkbox } from './components/checkbox';
import { VSlider } from './components/vslider';
import { Button } from './components/button';
import { NEntry } from './components/nentry';
import { HBarGraph } from './components/hbargraph';
import { VBarGraph } from './components/vbargraph';
export class ComponentFactory{
    private static instance: ComponentFactory;
    private constructor() {
    }
    public static getInstance(): ComponentFactory {
        if (!ComponentFactory.instance) {
            ComponentFactory.instance = new ComponentFactory();
        }
        return ComponentFactory.instance;
    }
    createComponent(type:string,label:string, options:any){
        switch (type) {
            case 'vgroup':
                return new VGroup(label, options);
            case 'hgroup':
                return new HGroup(label, options);
            case 'hslider':
                return new HSlider(label, options);
            case 'switch':
                return new Switch(label, options);
            case 'checkbox':
                return new Checkbox(label, options);
            case 'vslider':
                return new VSlider(label, options);
            case 'button':
                return new Button(label, options);
            case 'nentry':
                return new NEntry(label, options);
            case 'hbargraph':
                return new HBarGraph(label, options);
            case 'vbargraph':
                return new VBarGraph(label, options);
            default:
                throw new Error(`Type ${type} non pris en charge.`);
        }
    }
}
