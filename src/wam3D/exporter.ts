import {Scene, SceneSerializer} from "@babylonjs/core";
import {AdvancedDynamicTexture, StackPanel, Control,Button} from "@babylonjs/gui";

/**
 * Represents an Exporter that exports the scene to a .babylon file.
 * @method getInstance() - Returns the current instance of the Exporter.
 * @method setupButton() - Sets up the button that exports the scene.
 */
export class Exporter{
    private static instance : Exporter;
    private guiManager : AdvancedDynamicTexture;
    private objectURL : string;
    private constructor(guiManager : AdvancedDynamicTexture) {
        this.guiManager = guiManager;
    }

    public static getInstance(guiManager : AdvancedDynamicTexture): Exporter {
        if (!Exporter.instance) {
            Exporter.instance = new Exporter(guiManager);
        }
        return Exporter.instance;
    }


    /**
     * Exports the scene to a .babylon file.
     * @param filename
     * @param scene
     * @see https://playground.babylonjs.com/#1AGCWP#1
     *
     * PROBLEME : Lorsqu'on exporte on perd toute la GUI 3D, plus de slider sous les knobs, plus d'intéraction possible
     * avec les meshes, plus de boutons, plus rien. Il faut donc trouver un moyen de garder la GUI 3D.
     */
    private doDownload(filename: string,scene : Scene) {
        if(this.objectURL){
            window.URL.revokeObjectURL(this.objectURL);
        }

        const serializedScene = SceneSerializer.Serialize(scene);
        const strScene = JSON.stringify(serializedScene);

        if(filename.toLowerCase().lastIndexOf(".babylon") != filename.length - 8 || filename.length < 9){
            filename += ".babylon";
        }

        const blob = new Blob([strScene], {type: "octet/stream"});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        //this.objectURL = (window.webkitURL || window.URL).createObjectURL(blob);

        //console.log(this.objectURL);


    }

    /**
     * Sets up the button that exports the scene.
     * @param scene
     */
    public setupButton(scene : Scene){

        //Create an UI button with BabylonJS GUI using the stack panel
        var stackPanel = new StackPanel();
        stackPanel.width = "220px";
        stackPanel.fontSize = "14px";
        stackPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        stackPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        this.guiManager.addControl(stackPanel);

        var button = Button.CreateSimpleButton("but1", "Export");
        button.width = "100px"
        button.height = "50px";
        button.color = "white";
        button.background = "green";
        button.onPointerUpObservable.add(() => {
            this.doDownload("test",scene);
        });
        stackPanel.addControl(button);



    }
}