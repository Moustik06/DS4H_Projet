import {groups, parser} from "../parsing";
import {todo} from "../../utils/utils";
import {AdvancedDynamicTexture, GUI3DManager, MeshButton3D, PlanePanel, Slider3D, TextBlock} from "@babylonjs/gui";
import {Color3, MeshBuilder, Scene, StandardMaterial, TransformNode, Vector3} from "@babylonjs/core";
import {HGroup} from "../factory/components/hgroup";
import {MeshLoader} from "../meshLoader";
import {VGroup} from "../factory/components/vgroup";


enum orientation {
    HORIZONTAL, VERTICAL
}

/**
 * Main class responsible for building the 3D GUI & components.
 * @method buildFromJson - Builds the 3D GUI & components from the JSON file.
 */
export class Builder3D {
    json: any;
    gui3DManager: GUI3DManager;
    scene: Scene;
    private offsetY = 1;
    private offsetX = -2;
    private offsetYForGroupName = 1.75;
    private isTitleNeeded = true;
    private rootOrientation: orientation;
    private currentOrientation: orientation;

    /**
     * Boolean to know if the main group is vertical or horizontal.
     */
    private isVertical = false;

    /**
     * Materials used for the meshes.
     */
    private readonly supportBoxMaterial: StandardMaterial;
    private readonly knobMaterial: StandardMaterial;
    private readonly checkboxMaterial: StandardMaterial;
    private readonly checkboxCheckedMaterial: StandardMaterial;


    /**
     * Constructor of the Builder3D class.
     * @param scene - The scene where the 3D GUI will be built.
     * @param gui3DManager - The BABYLON GUI3DManager instance.
     *
     * @description Retrieve the JSON file from the parser and set up the materials.
     */
    constructor(scene: Scene, gui3DManager: GUI3DManager) {
        this.json = parser();
        this.gui3DManager = gui3DManager;
        this.scene = scene;

        this.supportBoxMaterial = new StandardMaterial("supportBoxMaterial", this.scene);
        this.supportBoxMaterial.diffuseColor = new Color3(0.1, 0.1, 0.1);
        this.supportBoxMaterial.specularColor = new Color3(0.1, 0.1, 0.1);

        this.checkboxMaterial = new StandardMaterial("checkboxMaterial", this.scene);
        this.checkboxMaterial.diffuseColor = new Color3(1, 1, 1);
        this.checkboxMaterial.specularColor = new Color3(1, 1, 1);

        this.checkboxCheckedMaterial = new StandardMaterial("checkboxCheckedMaterial", this.scene);
        this.checkboxCheckedMaterial.diffuseColor = new Color3(0, 1, 0);
        this.checkboxCheckedMaterial.specularColor = new Color3(0, 1, 0);

    }

    /**
     * Builds the 3D GUI & components from the JSON file.
     */
    public buildFromJson() {
        this.rootOrientation = this.getOrientation(this.json)

        if (this.rootOrientation == orientation.VERTICAL) {
            this.isVertical = true;
        }

        console.log("ORIENTATION DU GROUP ROOT = " + this.rootOrientation);
        const {hgroupCount, vgroupCount} = groups;
        const mainTitle = MeshBuilder.CreatePlane("holder", {width: 2, height: 2}, this.scene);
        mainTitle.position = new Vector3(0, 2.2, 0);
        let holderName = new TextBlock();
        holderName.text = this.json.label;
        holderName.fontSize = "20%";
        holderName.color = "white";
        let advancedTexture = AdvancedDynamicTexture.CreateForMesh(mainTitle);
        advancedTexture.addControl(holderName);


        /**
         * Loop through the components in the parsed JSON file and process them.
         *
         */

        this.json.components.forEach((group: any) => {
            this.isTitleNeeded = !!group.components; // group.components ? true : false
            this.currentOrientation = this.getOrientation(group);
            this.processGroup(group, mainTitle)


            /**
             * Offset the position of the next group depending on the orientation of the current group.
             * -x -> left
             * +x -> right
             * -y -> down
             * +y -> up
             *
             */
            if (this.isTitleNeeded) {

                /**
                 * New title needed, new group is horizontal, so we make it start at -2 on the x-axis.
                 */
                if (this.currentOrientation == orientation.HORIZONTAL) {
                    console.log("title needed + horizontal")
                    this.offsetX = -2;
                    this.offsetY -= 1;
                } else {
                    /**
                     * New title needed, new group is vertical, so we make it go down by 1 on the y-axis and go right by 1 on the x-axis.
                     */
                    console.log("title needed + vertical")
                    this.offsetY -= 1;
                    this.offsetX += 1;
                }
            } else {
                /**
                 * No new title needed, offset is changed in the processGroup function.
                 */
                if (this.currentOrientation == orientation.HORIZONTAL && this.rootOrientation == orientation.HORIZONTAL) {
                    console.log("title not needed + horizontal")
                } else {
                    /**
                     * No new title needed, we have a vertical group, so we make it go down by 1 on the y-axis and restart at -2 on the x-axis.
                     */
                    console.log("title not needed + vertical")
                    this.offsetY -= 1;
                    this.offsetX = -2;
                }
            }
        });
        console.log(`offsetX = ${this.offsetX} offsetY = ${this.offsetY}`);
        const supportBoxHeight = Math.abs(this.offsetY) + hgroupCount;
        const supportBoxTopY = 2 + supportBoxHeight / 2;

        let supportBox = MeshBuilder.CreateBox("supportBox", {
            width: 5,
            height: supportBoxHeight,
            depth: 1
        }, this.scene);
        supportBox.position = new Vector3(0, 2.5 - supportBoxTopY / 2, 0.55);
        supportBox.material = this.supportBoxMaterial;
    }

    /**
     * Generates a TextBlock with the specified label.
     *
     * @param label  - The text to be displayed in the TextBlock.
     * @returns The generated TextBlock.
     */
    private generateTextBlock(label: string): TextBlock {
        let textBlock = new TextBlock();
        textBlock.text = label;
        textBlock.color = "white";
        textBlock.fontSize = "20%";
        return textBlock;
    }

    /**
     * Processes a group of components.
     * @param group - The group of components to be processed, creating them and adding them to the scene.
     * @param parentAnchor - The parent anchor of the group.
     */
    private processGroup(group: any, parentAnchor: TransformNode) {

        /**
         * If a group label is needed (if the group has components), create a TextBlock with the label.
         */

        if (this.isTitleNeeded) {
            let groupName = this.generateTextBlock(group.label);
            let groupNamePlane = MeshBuilder.CreatePlane("groupNamePlane", {width: 1.5, height: 1.5}, this.scene);
            let currentAnchor = new TransformNode("currentAnchor" + group.label);
            currentAnchor.position = groupNamePlane.position.clone();
            groupNamePlane.position = new Vector3(0, this.offsetYForGroupName, 0);
            this.offsetYForGroupName -= 2;
            let advancedTexture = AdvancedDynamicTexture.CreateForMesh(groupNamePlane);
            advancedTexture.addControl(groupName);
        }
        let currentAnchor = new TransformNode("currentAnchor" + group.label);
        /**
         * Loop through the components in the group and process them.
         */
        if (group.components) {
            group.components.forEach((subComponent: any) => {
                if (subComponent instanceof HGroup || subComponent instanceof VGroup) {
                    this.processGroup(subComponent, currentAnchor);
                } else {
                    this.processComponent(subComponent, currentAnchor, this.scene, this.gui3DManager);
                }
            });
        } else {
            this.processComponent(group, currentAnchor, this.scene, this.gui3DManager);
        }
        if (this.isVertical) {
            this.offsetY -= 1;
            this.offsetX = -2;
        }
        //this.offsetX = -2;
    }

    /**
     * Processes a component from a group of components and adds it to the scene.
     * @param component - The component to be processed, creating it and adding it to the scene.
     * @param anchor - The anchor of the component.
     * @param scene - The scene where the component will be added.
     * @param gui3DManager - The BABYLON GUI3DManager instance.
     */
    private processComponent(component: any, anchor: TransformNode, scene: Scene, gui3DManager: GUI3DManager) {
        switch (Object.getPrototypeOf(component).constructor.name) {
            case "HSlider":
                this.createKnob(component, anchor, scene, gui3DManager);
                break;
            case "VSlider":
                this.createSlider(component, anchor, scene, gui3DManager);
                break;
            case "VGroup":
                this.createSlider(component, anchor, scene, gui3DManager);
                break;
            case "Checkbox":
                this.createCheckbox(component, anchor, scene, gui3DManager);
                break;
            default:
                console.log("Not implemented yet : " + component.type);
                break;
        }
    }

    /**
     * Process a HSlider or a VSlider(todo), check it's style and create the corresponding component.
     * @param subComponent component to be processed
     * @param anchor scene anchor for easier positioning
     * @param scene scene where the component will be added
     * @param gui3DManager BABYLON GUI3DManager instance
     */
    private createKnob(subComponent: any, anchor: TransformNode, scene: Scene, gui3DManager: GUI3DManager) {
        if (subComponent.style && subComponent.style == "knob") {
            let knob = MeshLoader.knobMesh.clone(subComponent.label, null);
            knob.isVisible = true;
            knob.position = new Vector3(this.offsetX, this.offsetY, 0);
            this.offsetX += 1;
            let textAnchor = new TransformNode("textAnchor" + subComponent.label);
            textAnchor.position = knob.position.clone();
            let knobPanel = new PlanePanel();
            gui3DManager.addControl(knobPanel);
            let knobSlider = new Slider3D("slider " + subComponent.label);
            knobPanel.addControl(knobSlider);
            this.setupKnobSlider(knobSlider, subComponent, textAnchor, scene);

            let textPlane = MeshBuilder.CreatePlane("textPlane", {width: 1, height: 1}, scene);
            textPlane.parent = textAnchor;
            textPlane.position = new Vector3(0, 0.5, 0);
            let texture = AdvancedDynamicTexture.CreateForMesh(textPlane);
            let textBlock = new TextBlock();
            textBlock.text = subComponent.label;
            textBlock.color = "white";
            textBlock.fontSize = "15%";

            texture.addControl(textBlock);

            /**
             * Behavior for the knob associated slider.
             * First line is to set the default knob rotation from the default value of the slider.
             * onValueChangedObservable : when the value of the slider changes, the knob rotation is updated.
             * Display the value if not at the minimum value.
             */
            knob.rotation.z = -((knobSlider.value * Math.PI) / knobSlider.maximum * 2);
            knobSlider.onValueChangedObservable.add(() => {
                if (knobSlider.value.toFixed(2) == knobSlider.minimum.toFixed(2)) {
                    textBlock.text = subComponent.label;
                } else {
                    textBlock.text = subComponent.label + "\nValue: " + knobSlider.value.toFixed(2);
                }
                knob.rotation.z = -((knobSlider.value * Math.PI) / knobSlider.maximum * 2);
            });
        } else {
            todo("Implémentation du slider, terminer la position ainsi que le behavior");
            this.createSlider(subComponent, anchor, scene, gui3DManager);
        }
    }

    /**
     * Process a slider, create the corresponding component.
     * @param subComponent component to be processed
     * @param anchor scene anchor for easier positioning
     * @param scene scene where the component will be added
     * @param gui3DManager BABYLON GUI3DManager instance
     */
    private createSlider(subComponent: any, anchor: TransformNode, scene: Scene, gui3DManager: GUI3DManager) {
        /**
         * Bad way to check if the slider have the knob style, but I didn't find another way.
         */
        if(subComponent.style && subComponent.style == "knob"){
            this.createKnob(subComponent, anchor, scene, gui3DManager);
            return;
        }
        let sliderPanel = new PlanePanel();
        gui3DManager.addControl(sliderPanel);
        let slider = new Slider3D("slider " + subComponent.label);
        sliderPanel.addControl(slider);
        slider.position = new Vector3(this.offsetX + 0.5, this.offsetY, 0);
        slider.minimum = subComponent.min;
        slider.maximum = subComponent.max;
        slider.value = subComponent.init;
        slider.step = subComponent.step;
        slider.scaling = new Vector3(2, 1, 1.5);
        //this.offsetX += 1;

        /**
         * TODO : setup the slider orientation, if vertical, rotate the slider and the text.
         * slider.rotation don't work, sliderPanel.rotation don't work either.
         */
        console.log("ORIENTATION DU SLIDER = " + this.currentOrientation)
        let rotation = false;
        if(this.currentOrientation == orientation.VERTICAL){
            console.log(slider)
            slider.node.rotation.z = Math.PI/2;
            rotation = true;
        }
        let textAnchor = new TransformNode("textAnchor" + subComponent.label);

        if(rotation){
            textAnchor.position = slider.position.clone().add(new Vector3(0, -1.1, 0));
        }
        else {
            textAnchor.position = slider.position.clone().add(new Vector3(0, 0.25, 0));
        }

        let textPlane = MeshBuilder.CreatePlane("textPlane", {width: 1, height: 1}, scene);
        textPlane.parent = textAnchor;
        let texture = AdvancedDynamicTexture.CreateForMesh(textPlane);
        let textBlock = new TextBlock();
        textBlock.text = subComponent.label;
        textBlock.color = "white";
        textBlock.fontSize = "15%";
        texture.addControl(textBlock);

        /**
         * Behavior for the slider.
         * Display the value if not at the minimum value.
         */
        slider.onValueChangedObservable.add(() => {
            if (slider.value.toFixed(2) == slider.minimum.toFixed(2)) {
                textBlock.text = subComponent.label;
            } else {
                textBlock.text = subComponent.label + "\nValue: " + slider.value.toFixed(2);
            }
        });

        this.offsetX += 2;
    }

    /**
     * Setup the knob slider.
     * @param knobSlider the slider mesh we need to setup
     * @param subComponent current component to get the min, max, init and step values
     * @param textAnchor the anchor for the text
     * @param scene the scene where the component will be added
     */
    private setupKnobSlider(knobSlider: Slider3D, subComponent: any, textAnchor: TransformNode, scene: Scene) {
        knobSlider.position = new Vector3(0, -0.5, -0.25);
        knobSlider.node.parent = textAnchor;
        knobSlider.minimum = subComponent.min;
        knobSlider.maximum = subComponent.max;
        knobSlider.value = subComponent.init;
        knobSlider.step = subComponent.step;
    }

    /**
     * Process a checkbox, create the corresponding component.
     * @param subComponent component to be processed
     * @param anchor scene anchor for easier positioning
     * @param scene scene where the component will be added
     * @param gui3DManager BABYLON GUI3DManager instance
     */
    private createCheckbox(subComponent: any, anchor: TransformNode, scene: Scene, gui3DManager: GUI3DManager) {

        let checkbox = MeshBuilder.CreateBox(subComponent._label, {width: 5, height: 1, depth: 0.1}, scene);
        let btn = new MeshButton3D(checkbox);

        /**
         * When using MeshButton3D the mesh get a scaling when overed by the mouse,
         * I tried to stop it, but I couldn't find a way to do it other than this.
         */

        btn.onPointerEnterObservable.add(() => {
            checkbox.scaling = new Vector3(0.9, 0.9, 0.9);
        });
        btn.onPointerOutObservable.add(() => {
            checkbox.scaling = new Vector3(1.1, 1.1, 1.1);
        });

        /* **************************************************** */

        checkbox.position = new Vector3(0, this.offsetY, 0);
        let pressed = false;
        btn.onPointerClickObservable.add(() => {
            pressed = !pressed;
            if (pressed) {
                checkbox.material = this.checkboxCheckedMaterial
            } else {
                checkbox.material = this.checkboxMaterial
            }
        });
        this.gui3DManager.addControl(btn);
        let textAnchor = new TransformNode("textAnchor" + subComponent._label);
        textAnchor.position = checkbox.position.clone().add(new Vector3(0, 0.6, 0));
        let textPlane = MeshBuilder.CreatePlane("textPlane", {width: 1, height: 1}, scene);
        textPlane.parent = textAnchor;
        let texture = AdvancedDynamicTexture.CreateForMesh(textPlane);
        let textBlock = new TextBlock();
        textBlock.text = subComponent._label;
        textBlock.color = "white";
        textBlock.fontSize = "15%";
        texture.addControl(textBlock);
        this.offsetX += 1;


    }

    /**
     * Get the orientation of the component.
     * @param component the component to get the orientation from
     * @returns the orientation of the component
     */
    private getOrientation(component: any): orientation {
        let type = Object.getPrototypeOf(component).constructor.name;
        switch (type) {
            case "HGroup":
                return orientation.HORIZONTAL;
            case "VGroup":
                return orientation.VERTICAL;
            case "HSlider":
                return orientation.HORIZONTAL;
            case "VSlider":
                return orientation.VERTICAL;
            default:
                return orientation.HORIZONTAL;
        }
    }
}
