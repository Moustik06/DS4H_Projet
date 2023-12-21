import { AdvancedDynamicTexture, GUI3DManager, TextBlock } from "@babylonjs/gui";
import {
    Color3,
    CubeTexture,
    DynamicTexture,
    Engine,
    FreeCamera,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Vector3
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import { Builder3D } from "./wam3D/builder3D/builder";
import { MeshLoader } from "./wam3D/meshLoader";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

import {Exporter} from "./wam3D/exporter";

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);
        // initialize babylon scene and engine
        const engine = new Engine(canvas, true);
        const scene = new Scene(engine);

        /**
         * Cube texture taken from BabylonJS Playground, not needed it's just for the look
         */
        let cube = new CubeTexture("https://assets.babylonjs.com/environments/environmentSpecular.env", scene);
        cube.level = 0.35;
        scene.environmentTexture = cube;
        scene.createDefaultSkybox(scene.environmentTexture, true, 200, 0.3);

        var camera: FreeCamera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
        camera.attachControl(canvas, true);
        //setup ZQSD movement
        camera.keysUp.push(90); // Z
        camera.keysDown.push(83); // S
        camera.keysLeft.push(81); // Q
        camera.keysRight.push(68); // D
        camera.inertia = 0.9;
        camera.speed = 0.5;
        camera.checkCollisions = true;

        let globalLight = new HemisphericLight("globalLight", new Vector3(0, 1, 0), scene);
        globalLight.intensity = 1;

        var guiTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var fpsText = new TextBlock();

        fpsText.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_RIGHT;
        fpsText.textVerticalAlignment = TextBlock.VERTICAL_ALIGNMENT_TOP;
        fpsText.text = "FPS: 0";
        fpsText.color = "white";
        fpsText.fontSize = 24;
        guiTexture.addControl(fpsText);

        let currentPOS = new TextBlock();
        currentPOS.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_LEFT;
        currentPOS.textVerticalAlignment = TextBlock.VERTICAL_ALIGNMENT_TOP;
        currentPOS.color = "white";
        currentPOS.fontSize = 24;
        currentPOS.text = "Postion X Y Z =";
        guiTexture.addControl(currentPOS);

        const manager = new GUI3DManager(scene);

        engine.runRenderLoop(() => {
            scene.render();
            let fps = engine.getFps().toFixed();
            fpsText.text = `FPS: ${fps}`;
            currentPOS.text = `X : ${camera.position.x.toFixed(2)}\n Y : ${camera.position.y.toFixed(2)}\n Z : ${camera.position.z.toFixed(2)}`;
        });
        window.addEventListener("resize", function () {
            engine.resize();
        });

        window.addEventListener("keydown", (event) => {
            if (event.key == "f") {
                camera.position = new Vector3(0, 2, 10);
                camera.setTarget(Vector3.Zero());
            }
            if (event.key == "z" && event.altKey) {
                scene.forceWireframe = !scene.forceWireframe;
            }
        });
        /**
         * Function taken from BabylonJS Playground, used to show axis in the scene
         */
        const showAxis = function (size: number) {

            const makeTextPlane = function (text, color, size) {
                var dynamicTexture = new DynamicTexture("DynamicTexture", 50, scene, true);
                dynamicTexture.hasAlpha = true;
                dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
                var plane = Mesh.CreatePlane("TextPlane", size, scene, true);
                var material = new StandardMaterial("TextPlaneMaterial", scene);
                material.backFaceCulling = false;
                material.specularColor = new Color3(0, 0, 0);
                material.diffuseTexture = dynamicTexture;
                plane.material = material;
                return plane;
            }
            var axisX = MeshBuilder.CreateLines("axisX", {
                points: [Vector3.Zero(), new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0), new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)],
                updatable: true
            }, scene);
            axisX.color = new Color3(1, 0, 0);
            var xChar = makeTextPlane("X", "red", size / 10);
            xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);
            var axisY = MeshBuilder.CreateLines("axisY", {
                points: [Vector3.Zero(), new Vector3(0, size, 0), new Vector3(-0.05 * size, size * 0.95, 0), new Vector3(0, size, 0), new Vector3(0.05 * size, size * 0.95, 0)],
                updatable: true
            }, scene);
            axisY.color = new Color3(0, 1, 0);
            var yChar = makeTextPlane("Y", "green", size / 10);
            yChar.position = new Vector3(0, 0.9 * size, -0.05 * size);
            var axisZ = MeshBuilder.CreateLines("axisZ", {
                points: [Vector3.Zero(), new Vector3(0, 0, size), new Vector3(0, -0.05 * size, size * 0.95), new Vector3(0, 0, size), new Vector3(0, 0.05 * size, size * 0.95)],
                updatable: true
            }, scene);
            axisZ.color = new Color3(0, 0, 1);
            var zChar = makeTextPlane("Z", "blue", size / 10);
            zChar.position = new Vector3(0, 0.05 * size, 0.9 * size);

        };
        showAxis(15);

        /**
         * Load the meshes from the scene and build the 3D GUI
         */
        MeshLoader.loadMeshes(scene).then(r => {
            new Builder3D(scene, manager).buildFromJson();
        });
        let exporter = Exporter.getInstance(guiTexture);
        exporter.setupButton(scene);
        //scene.debugLayer.show();
    }
}

new App();