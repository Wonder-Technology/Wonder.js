import { GameObject } from "../../../core/entityObject/gameObject/GameObject";
import { ComponentGameObjectMap } from "../../ComponentData";

export class MeshRendererData{
    public static renderGameObjectArray:Array<GameObject> = null;
    public static gameObjectMap:ComponentGameObjectMap = null;

    public static index:number = null;
    public static count:number = null;
}

