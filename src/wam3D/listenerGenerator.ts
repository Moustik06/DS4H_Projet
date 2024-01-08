import {Mesh, Scene} from "@babylonjs/core";

export class FunctionalListenerGenerator {
    private scene : Scene;
    constructor(scene : Scene) {
        this.scene = scene;
    }

    public generateTest() : any{
        console.log("----------------Generation-------------------")
        let tmp = this.scene.meshes
        tmp.forEach(item => {
            if (item.id.includes(".Knob")){
                console.log(item.metadata);
            }
        })
    }

}
