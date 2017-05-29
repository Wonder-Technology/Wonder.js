import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { ComponentGameObjectMap } from "../ComponentData";
import { ComponentMap } from "../ComponentSystem";
export declare class MeshRendererData {
    static renderGameObjectArray: Array<GameObject>;
    static gameObjectMap: ComponentGameObjectMap;
    static meshRendererMap: ComponentMap;
    static index: number;
    static count: number;
}
