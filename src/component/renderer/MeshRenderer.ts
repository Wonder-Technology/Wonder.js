import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { create, getGameObject, getRenderList } from "./MeshRendererSystem";
import { MeshRendererData } from "./MeshRendererData";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Component } from "../Component";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { checkComponentShouldAlive, isComponentIndexNotRemoved } from "../ComponentSystem";

@registerClass("MeshRenderer")
export class MeshRenderer extends Component {
}

export var createMeshRenderer = () => {
    return create(MeshRendererData);
}

export var getMeshRendererGameObject = requireCheckFunc((component: MeshRenderer) => {
    _checkShouldAlive(component, MeshRendererData);
}, (component: MeshRenderer) => {
    return getGameObject(component.index, MeshRendererData);
})

export var getMeshRendererRenderList = () => {
    return getRenderList(null, MeshRendererData);
}

var _checkShouldAlive = (component:MeshRenderer, MeshRendererData: any) => {
    checkComponentShouldAlive(component, MeshRendererData, (component:MeshRenderer, MeshRendererData: any) => {
        return isComponentIndexNotRemoved(component);
    })
}
