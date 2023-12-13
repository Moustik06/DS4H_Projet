
// MeshLoader.ts

import { Mesh, Scene, SceneLoader } from "@babylonjs/core";

export class MeshLoader {
    static knobMesh: Mesh;
    static async loadMeshes(scene: Scene) {
        let result = await SceneLoader.ImportMeshAsync("Knob", "assets/", "knob.gltf", scene)
        this.knobMesh = result.meshes[0].getChildMeshes()[0].clone("knobMesh",null) as Mesh;
        result.meshes[0].dispose(true,true);
        result.meshes[1].dispose(true,true);
        this.knobMesh.isVisible = false;
        this.knobMesh.rotationQuaternion = null;
        this.knobMesh.rotation.y = Math.PI;
        this.knobMesh.rotation.x = Math.PI;
        //this.knobMesh.bakeCurrentTransformIntoVertices();
        this.knobMesh.scaling.x = 0.5;
        this.knobMesh.scaling.y = 0.5;
        this.knobMesh.scaling.z = 0.5;
    }
}