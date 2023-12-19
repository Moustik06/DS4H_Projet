
// MeshLoader.ts

import { Mesh, Scene, SceneLoader,Vector3 } from "@babylonjs/core";

/**
 * Class responsible for loading meshes.
 */
export class MeshLoader {
    static knobMesh: Mesh;

    /**
     * Loads the meshes into the scene.
     * @param scene The scene to load the meshes into.
     */
    public static async loadMeshes(scene: Scene) {
        let result = await SceneLoader.ImportMeshAsync("Knob", "assets/", "knob.gltf", scene);
        let mainMesh = result.meshes[0];
        this.knobMesh = mainMesh.getChildMeshes()[0].clone("knobMesh",null) as Mesh;
        mainMesh.dispose(true,true);
        result.meshes[1].dispose(true,true);
        this.setKnobMeshProperties();
    }

    /**
     * Sets the properties of the mesh.
     */
    private static setKnobMeshProperties() {
        this.knobMesh.isVisible = false;
        this.knobMesh.rotationQuaternion = null;
        this.knobMesh.rotation.y = Math.PI;
        this.knobMesh.rotation.x = Math.PI;
        this.knobMesh.scaling = new Vector3(0.5, 0.5, 0.5);
    }
}