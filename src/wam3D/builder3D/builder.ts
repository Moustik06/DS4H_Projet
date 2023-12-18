import {groups, parser} from "../parsing";
import {todo} from "../../utils/utils";
import {AdvancedDynamicTexture, GUI3DManager, PlanePanel, Slider3D, TextBlock, TouchButton3D} from "@babylonjs/gui";
import {Color3, MeshBuilder, Scene, StandardMaterial, TransformNode, Vector3} from "@babylonjs/core";
import {HGroup} from "../factory/components/hgroup";
import {MeshLoader} from "../meshLoader";
import {VGroup} from "../factory/components/vgroup";

export class Builder3D {
    json: any;
    gui3DManager: GUI3DManager;
    scene: Scene;
    private offsetY = 1;
    private offsetX = -2;
    private offsetYForGroupName = 1.75;
    private isTitleNeeded = true;
    constructor(scene: Scene, gui3DManager: GUI3DManager) {
        this.json = parser();
        this.gui3DManager = gui3DManager;
        this.scene = scene;
    }

    public buildFromJson() {
        const {hgroupCount, vgroupCount} = groups;
        let supportBox = MeshBuilder.CreateBox("supportBox", {width: 5, height: 5, depth: 1}, this.scene);
        supportBox.position = new Vector3(0, 0, 0.55);
        supportBox.material = new StandardMaterial("supportBoxMaterial", this.scene);
        const mainTitle = MeshBuilder.CreatePlane("holder", {width: 2, height: 2}, this.scene);
        mainTitle.position = new Vector3(0, 2.2, 0);
        let holderName = new TextBlock();
        holderName.text = this.json.label;
        holderName.fontSize = "20%";
        holderName.color = "white";
        let advancedTexture = AdvancedDynamicTexture.CreateForMesh(mainTitle);
        advancedTexture.addControl(holderName);
        this.json.components.forEach((group: any) => {
                this.isTitleNeeded = !!group.components; // group.components ? true : false
                this.processGroup(group, mainTitle)
                if(this.isTitleNeeded){
                    this.offsetX = -2;
                    this.offsetY -=2;
                }

        });

    }

    private generateTextBlock(label: string): TextBlock {
        let textBlock = new TextBlock();
        textBlock.text = label;
        textBlock.color = "white";
        textBlock.fontSize = "20%";
        return textBlock;
    }

    // Fonction qui va gérer la création des groupes de façon récursive
    private processGroup(group: any, parentAnchor: TransformNode) {
        if (this.isTitleNeeded){
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
        let type;
        if (group.components) {
            group.components.forEach((subComponent: any) => {
                if (subComponent instanceof HGroup || subComponent instanceof VGroup) {
                    this.processGroup(subComponent, currentAnchor);
                } else {
                    switch (type = Object.getPrototypeOf(subComponent).constructor.name) {
                        case "HSlider":
                            this.createKnob(subComponent, currentAnchor, this.scene, this.gui3DManager);
                            break;
                        case "Checkbox":
                            this.createCheckbox(subComponent, currentAnchor, this.scene, this.gui3DManager);
                            break;
                        default:
                            console.log("Not implemented yet : " + type);
                            break;
                    }
                }
            });
        } else {
            switch (type = Object.getPrototypeOf(group).constructor.name) {
                case "HSlider":
                    this.createKnob(group, currentAnchor, this.scene, this.gui3DManager);
                    break;
                case "VGroup":
                    this.createSlider(group, currentAnchor, this.scene, this.gui3DManager);
                    break;
                case "Checkbox":
                    this.createCheckbox(group, currentAnchor, this.scene, this.gui3DManager);
                    break;
                default:
                    console.log("Not implemented yet : " + group.type);
                    break;
            }
        }

        //this.offsetX = -2;
    }

    private createKnob(subComponent: any, anchor: TransformNode, scene: Scene, gui3DManager: GUI3DManager) {
        if(subComponent.style && subComponent.style == "knob") {
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
            //Rotation de base en fonction de la valeur initiale
            knob.rotation.z = -((knobSlider.value * Math.PI) / knobSlider.maximum * 2);
            knobSlider.onValueChangedObservable.add(() => {
                if (knobSlider.value.toFixed(2) == knobSlider.minimum.toFixed(2)) {
                    textBlock.text = subComponent.label;
                } else {
                    textBlock.text = subComponent.label + "\nValue: " + knobSlider.value.toFixed(2);
                }
                knob.rotation.z = -((knobSlider.value * Math.PI) / knobSlider.maximum * 2);
            });
        }else{
            todo();
            //this.createSlider(subComponent, anchor, scene, gui3DManager);
        }
    }

    private createSlider(subComponent: any, anchor: TransformNode, scene: Scene, gui3DManager: GUI3DManager) {
        todo();
        let sliderPanel = new PlanePanel();
        gui3DManager.addControl(sliderPanel);
        let slider = new Slider3D("slider " + subComponent.label);
        sliderPanel.addControl(slider);
        slider.position = new Vector3(this.offsetX, this.offsetY, 0);
        slider.minimum = subComponent.min;
        slider.maximum = subComponent.max;
        slider.value = subComponent.init;
        slider.step = subComponent.step;
        slider.scaling = new Vector3(2, 1, 1.5);
        //this.offsetX += 1;
        let textAnchor = new TransformNode("textAnchor" + subComponent.label);
        textAnchor.position = new Vector3(this.offsetX, this.offsetY, 0);
        let textPlane = MeshBuilder.CreatePlane("textPlane", {width: 1, height: 1}, scene);
        textPlane.parent = textAnchor;
        textPlane.position = slider.position.clone();
        let texture = AdvancedDynamicTexture.CreateForMesh(textPlane);
        let textBlock = new TextBlock();
        textBlock.text = subComponent.label;
        textBlock.color = "white";
        textBlock.fontSize = "15%";
        texture.addControl(textBlock);

        this.offsetY -= 1;
    }
    private setupKnobSlider(knobSlider: Slider3D, subComponent: any, textAnchor: TransformNode, scene: Scene) {
        knobSlider.position = new Vector3(0, -0.5, -0.25);
        knobSlider.node.parent = textAnchor;
        knobSlider.minimum = subComponent.min;
        knobSlider.maximum = subComponent.max;
        knobSlider.value = subComponent.init;
        knobSlider.step = subComponent.step;
    }
    private createCheckbox(subComponent: any, anchor: TransformNode, scene: Scene, gui3DManager: GUI3DManager) {
        let checkboxPanel = new PlanePanel();
        gui3DManager.addControl(checkboxPanel);
        let checkbox = new TouchButton3D("checkbox " + subComponent._label);
        checkbox.isToggleButton = true;
        checkboxPanel.addControl(checkbox);
        checkbox.position = new Vector3(this.offsetX, this.offsetY, 0);
        let checkedMaterial = new StandardMaterial("checkedMaterial", scene);
        checkedMaterial.diffuseColor = new Color3(0, 1, 0);
        checkbox.onPointerClickObservable.add(() => {
            console.log(checkbox.isToggled);
            if (checkbox.isToggled) {
                checkbox.mesh.material = checkedMaterial;
            } else {
                checkbox.mesh.material = null;
            }
        });
        let textAnchor = new TransformNode("textAnchor" + subComponent._label);
        textAnchor.position = checkbox.position.clone();
        let textPlane = MeshBuilder.CreatePlane("textPlane", {width: 1, height: 1}, scene);
        textPlane.parent = textAnchor;
        textPlane.position = new Vector3(0, 1, 0);
        let texture = AdvancedDynamicTexture.CreateForMesh(textPlane);
        let textBlock = new TextBlock();
        textBlock.text = subComponent._label;
        textBlock.color = "white";
        textBlock.fontSize = "15%";
        texture.addControl(textBlock);
        this.offsetX += 1;


    }
}
