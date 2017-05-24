import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { create, getGameObject, getRenderList } from "./MeshRendererSystem";
import { MeshRendererData } from "./MeshRendererData";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Component } from "../Component";

@registerClass("MeshRenderer")
export class MeshRenderer extends Component{
    public index:number = null;
}

export var createMeshRenderer = () => {
    return create(MeshRendererData);
}

export var getMeshRendererGameObject = (component:MeshRenderer) => {
    return getGameObject(component.index, MeshRendererData);
}

export var getMeshRendererRenderList = () => {
    return getRenderList(null, MeshRendererData);
}
