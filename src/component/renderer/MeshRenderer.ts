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

export const createMeshRenderer = () => {
    return create(MeshRendererData);
}

export const getMeshRendererGameObject = requireCheckFunc((component: MeshRenderer) => {
    _checkShouldAlive(component, MeshRendererData);
}, (component: MeshRenderer) => {
    return getGameObject(component.index, MeshRendererData);
})

export const getMeshRendererRenderList = () => {
    return getRenderList(null, MeshRendererData);
}

const _checkShouldAlive = (component: MeshRenderer, MeshRendererData: any) => {
    checkComponentShouldAlive(component, MeshRendererData, (component: MeshRenderer, MeshRendererData: any) => {
        return isComponentIndexNotRemoved(component);
    })
}
