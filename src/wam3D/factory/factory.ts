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
/**
 * Represents a Component Factory that creates different types of components.
 */
export class ComponentFactory {
    private static instance: ComponentFactory;

    /**
     * Empty constructor. Private because of the singleton pattern.
     */
    private constructor() {
    }

    /**
     * Creates a new instance of the ComponentFactory if it doesn't exist, and returns it.
     * @returns The current instance.
     */
    public static getInstance(): ComponentFactory {
        if (!ComponentFactory.instance) {
            ComponentFactory.instance = new ComponentFactory();
        }
        return ComponentFactory.instance;
    }

    /**
     * Creates a component based on the provided type, label, and options.
     * @param type - The type of the component.
     * @param label - The label of the component.
     * @param options - The options for the component.
     * @returns The created component.
     * @throws Error if the provided type is not supported.
     */
    public createComponent(type: string, label: string, options: any) {
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
                throw new Error(`Type ${type} is not supported.`);
        }
    }
}
