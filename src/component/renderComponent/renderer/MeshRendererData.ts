import { GameObject } from "../../../core/entityObject/gameObject/GameObject";
import { ComponentGameObjectMap } from "../../ComponentData";
import { MeshRenderer } from "./MeshRenderer";

export class MeshRendererData{
    public static renderGameObjectArray:Array<GameObject> = null;
    public static gameObjectMap:ComponentGameObjectMap = null;
    public static meshRendererMap:MeshRendererMap = null;

    public static index:number = null;
    public static count:number = null;
}

export type MeshRendererMap = {
    [index:number]: MeshRenderer;
}

