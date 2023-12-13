import {groups, parser} from "../parsing";
import {
    AdvancedDynamicTexture,
    GUI3DManager,
    PlanePanel,
    Slider3D,
    TextBlock,
    TouchButton3D
} from "@babylonjs/gui";
import {
    Color3,
    Mesh,
    MeshBuilder,
    Scene,
    StandardMaterial, TransformNode,
    Vector3
} from "@babylonjs/core";
import {HGroup} from "../factory/components/hgroup";
import {MeshLoader} from "../meshLoader";
import {VGroup} from "../factory/components/vgroup";

export class Builder3D {
    json: any;
    gui3DManager: GUI3DManager;
    scene: Scene;
    root : Mesh;
    constructor(scene: Scene, gui3DManager: GUI3DManager) {
        this.json = parser();
        this.gui3DManager = gui3DManager;
        this.scene = scene;

    }

    buildFromJson() {
        const { hgroupCount, vgroupCount } = groups;
        const { components } = this.json;
        const holder = MeshBuilder.CreatePlane("holder", { width: 2, height: 2 }, this.scene);
        holder.position = new Vector3(2, 2, 0);
        let holderName = new TextBlock();
        holderName.text = this.json.label;
        holderName.fontSize = "20%";
        holderName.color = "white";
        let advancedTexture = AdvancedDynamicTexture.CreateForMesh(holder);
        advancedTexture.addControl(holderName);
        let offsety = 1.5; // Décalage Y

        //Pour chaque composant du module
        this.json.components.forEach((component: any, index: number) => {
            if(component instanceof HGroup || component instanceof VGroup){
                let GroupAnchor = new TransformNode(component.label);
                GroupAnchor.position = new Vector3(0, 0, 0);
                let GroupName = new TextBlock();
                GroupName.text = component.label;
                GroupName.fontSize = "20%";
                GroupName.color = "white";
                let groupNamePlane = MeshBuilder.CreatePlane("groupNamePlane", { width: 1, height: 1 }, this.scene);
                let currentAnchor = new TransformNode("currentAnchor");
                currentAnchor.position = groupNamePlane.position.clone();
                groupNamePlane.parent = GroupAnchor;
                groupNamePlane.position = new Vector3(0, offsety, 0);
                offsety -= 1.5;
                let advancedTexture = AdvancedDynamicTexture.CreateForMesh(groupNamePlane);
                advancedTexture.addControl(GroupName);

                component.components.forEach((subComponent: any) => {
                    let type = Object.getPrototypeOf(subComponent).constructor.name;
                    console.log(type);
                    switch (type) {
                        case "HSlider":
                            this.createKnob(subComponent, currentAnchor, this.scene, this.gui3DManager);
                            break;
                        case "Slider":
                            this.createSlider(subComponent, currentAnchor, this.scene, this.gui3DManager);
                            break;
                        case "Checkbox":
                            this.createCheckbox(subComponent, currentAnchor, this.scene, this.gui3DManager);
                            break;
                        default:
                            console.log("Not implemented yet : " + type);
                            break;
                    }
                });
                this.offsetY -=1.5;
                this.offsetX = 0;
            }
            else{
                let anchor = new TransformNode(component.label);
                anchor.position = new Vector3(0, 0, 0);
                this.createKnob(component, anchor, this.scene, this.gui3DManager)
                this.offsetY -= 1.5;
                this.offsetX = 0;
            }
        });
        let supportBox = MeshBuilder.CreateBox("supportBox", { width: 5, height: 5, depth: 1 }, this.scene);
        supportBox.position = new Vector3(holder.position.x, 0, 0.6);
        supportBox.material = new StandardMaterial("supportBoxMaterial", this.scene);

    }
    private offsetY = 0.7;
    private offsetX = 0;
    createKnob(subComponent: any, anchor: TransformNode, scene: Scene, gui3DManager: GUI3DManager) {
        console.log(subComponent);
        let knob = MeshLoader.knobMesh.clone(subComponent.label, anchor);
        knob.isVisible = true;
        knob.position = new Vector3(this.offsetX, this.offsetY, 0);
        this.offsetX += 1;
        let textAnchor = new TransformNode("textAnchor" + subComponent._label);
        textAnchor.position = knob.position.clone();

        let knobPanel = new PlanePanel();
        gui3DManager.addControl(knobPanel);

        let knobSlider = new Slider3D("slider " + subComponent._label);
        knobPanel.addControl(knobSlider);
        knobSlider.position = new Vector3(0, -0.5, -0.25);

        knobSlider.node.parent = textAnchor;
        knobSlider.minimum = subComponent.min;
        knobSlider.maximum = subComponent.max;
        knobSlider.value = subComponent.init;
        knobSlider.step = subComponent.step;

        let textPlane = MeshBuilder.CreatePlane("textPlane", { width: 1, height: 1 }, scene);
        textPlane.parent = textAnchor;
        textPlane.position = new Vector3(0, 0.5, 0);
        let texture = AdvancedDynamicTexture.CreateForMesh(textPlane);
        let textBlock = new TextBlock();
        textBlock.text = subComponent._label;
        textBlock.color = "white";
        textBlock.fontSize = "15%";

        texture.addControl(textBlock);
        //Rotation de base en fonction de la valeur initiale
        knob.rotation.z = -((knobSlider.value * Math.PI) / knobSlider.maximum * 2);

        knobSlider.onValueChangedObservable.add(() => {
            if (knobSlider.value.toFixed(2) == "0.00") {
                textBlock.text = subComponent._label;
            }else {
                textBlock.text = subComponent._label + "\nValue: " + knobSlider.value.toFixed(2);
            }
            knob.rotation.z = -((knobSlider.value * Math.PI) / knobSlider.maximum * 2);

        });

    }
    createSlider(subComponent: any, anchor: TransformNode, scene: Scene, gui3DManager: GUI3DManager) {
        let sliderHolder = MeshBuilder.CreatePlane("sliderHolder", { width: 1, height: 1 }, scene);
        sliderHolder.parent = anchor;
        sliderHolder.position = new Vector3(this.offsetX, this.offsetY, 0);
    }
    createCheckbox(subComponent: any, anchor: TransformNode, scene: Scene, gui3DManager: GUI3DManager) {
        let checkboxPanel = new PlanePanel();
        gui3DManager.addControl(checkboxPanel);
        let checkbox = new TouchButton3D("checkbox " + subComponent._label);
        checkbox.isToggleButton = true;
        checkbox.isToggled = false;
        checkboxPanel.addControl(checkbox);
        checkbox.position = new Vector3(this.offsetX, this.offsetY, 0);
        let checkedMaterial = new StandardMaterial("checkedMaterial", scene);
        checkedMaterial.diffuseColor = new Color3(0, 1, 0);
        checkbox.onPointerClickObservable.add(() => {
            console.log(checkbox.isToggled);
            if (checkbox.isToggled) {
                checkbox.mesh.material = checkedMaterial;
            }else {
                checkbox.mesh.material = null;
            }
        });
        let textAnchor = new TransformNode("textAnchor" + subComponent._label);
        textAnchor.position = checkbox.position.clone();
        let textPlane = MeshBuilder.CreatePlane("textPlane", { width: 1, height: 1 }, scene);
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
