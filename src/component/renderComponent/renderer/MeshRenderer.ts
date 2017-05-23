import { RenderComponent } from "../RenderComponent";
import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { create, getGameObject } from "./MeshRendererSystem";
import { MeshRendererData } from "./MeshRendererData";
import { GameObject } from "../../../core/entityObject/gameObject/GameObject";

@registerClass("MeshRenderer")
export class MeshRenderer extends RenderComponent{
    public index:number = null;
}

export var createMeshRenderer = () => {
    return create(MeshRendererData);
}

export var getMeshRendererGameObject = (component:MeshRenderer) => {
    return getGameObject(component.index, MeshRendererData);
}
