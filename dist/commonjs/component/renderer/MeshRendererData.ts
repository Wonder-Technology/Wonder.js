import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { MeshRenderer } from "./MeshRenderer";

export class MeshRendererData {
    public static renderGameObjectArray: Array<GameObject> = null;
    public static gameObjectMap: Array<GameObject> = null;
    public static meshRendererMap: Array<MeshRenderer> = null;

    public static index: number = null;
    public static count: number = null;
}

