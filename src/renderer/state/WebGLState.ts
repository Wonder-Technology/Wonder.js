import { Material } from "../../material/Material";

export abstract class WebGLState {
    public abstract setState(material: Material): void;

    // protected getSide(material:Material){
    //     var scene:SceneDispatcher = Director.getInstance().scene;
    //
    //     return scene.side ? scene.side : material.side;
    // }
}