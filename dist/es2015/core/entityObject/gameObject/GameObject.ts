import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import {
    addChild,
    addComponent, addRemovedChild, create, dispose, disposeComponent, getAliveChildren, getAllComponents, getComponent,
    getMaterial,
    getParent,
    getTransform,
    hasChild,
    hasComponent, initGameObject as initGameObjectSystem,
    isAlive, removeChild, setParent
} from "./GameObjectSystem";
import { GameObjectData } from "./GameObjectData";
import { Component } from "../../../component/Component";
import { ThreeDTransformData } from "../../../component/transform/ThreeDTransformData";
import { create as createThreeDTransform } from "../../../component/transform/ThreeDTransformSystem";
import { requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { checkGameObjectShouldAlive } from "../../../utils/contractUtils";
import { getState } from "../../DirectorSystem";
import { DirectorData } from "../../DirectorData";
import { getComponentIdFromClass } from "../../../component/ComponentComponentIdManager";
import { IUIdEntity } from "./IUIdEntity";
import { MeshRendererData } from "../../../component/renderer/MeshRendererData";

@registerClass("GameObject")
export class GameObject implements IUIdEntity {
    public uid: number = null;
}

export const createGameObject = () => create(createThreeDTransform(ThreeDTransformData), GameObjectData);

export const addGameObjectComponent = requireCheckFunc((gameObject: GameObject, component: Component) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject, component: Component) => {
    addComponent(gameObject, component, GameObjectData);
})

export const disposeGameObject = requireCheckFunc((gameObject: GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject) => {
    dispose(gameObject, ThreeDTransformData, GameObjectData);
})

// export const disposeBatchGameObjectChildren = requireCheckFunc((children: Array<GameObject>, parent:GameObject) => {
//     for(let child of children){
//         checkGameObjectShouldAlive(child, GameObjectData);
//     }
// }, (children: Array<GameObject>, parent:GameObject) => {
//     disposeBatchChildren(children, parent, ThreeDTransformData, GameObjectData);
// })

export const initGameObject = requireCheckFunc((gameObject: GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject) => {
    initGameObjectSystem(gameObject, getState(DirectorData), GameObjectData);
})

export const disposeGameObjectComponent = requireCheckFunc((gameObject: GameObject, component: Component) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject, component: Component) => {
    disposeComponent(gameObject.uid, component, GameObjectData);
})

export const getGameObjectComponent = requireCheckFunc((gameObject: GameObject, _class: any) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject, _class: any) => {
    return getComponent(gameObject.uid, getComponentIdFromClass(_class), GameObjectData);
})

export const getGameObjectTransform = requireCheckFunc((gameObject: GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject) => {
    return getTransform(gameObject.uid, GameObjectData);
})

export const getGameObjectMaterial = requireCheckFunc((gameObject: GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject) => {
    return getMaterial(gameObject.uid, GameObjectData);
})

export const getGameObjectAllComponents = requireCheckFunc((gameObject: GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject) => {
    return getAllComponents(gameObject.uid, GameObjectData);
})

export const hasGameObjectComponent = requireCheckFunc((gameObject: GameObject, _class: any) => {
    // checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject, _class: any) => {
    return hasComponent(gameObject, getComponentIdFromClass(_class), GameObjectData);
})

export const isGameObjectAlive = (gameObject: GameObject) => {
    return isAlive(gameObject, GameObjectData);
}

export const addGameObject = requireCheckFunc((gameObject: GameObject, child: GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject, child: GameObject) => {
    addChild(gameObject, child, ThreeDTransformData, GameObjectData);
})

export const addRemovedGameObject = requireCheckFunc((gameObject: GameObject, child: GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject, child: GameObject) => {
    addRemovedChild(gameObject, child, MeshRendererData, ThreeDTransformData, GameObjectData);
})

export const removeGameObject = requireCheckFunc((gameObject: GameObject, child: GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject, child: GameObject) => {
    removeChild(gameObject.uid, child.uid, ThreeDTransformData, GameObjectData);
})

export const hasGameObject = requireCheckFunc((gameObject: GameObject, child: GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject, child: GameObject) => {
    return hasChild(gameObject, child, GameObjectData);
})

export const getGameObjectChildren = requireCheckFunc((gameObject: GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject) => {
    return getAliveChildren(gameObject.uid, GameObjectData);
})

export const getGameObjectParent = requireCheckFunc((gameObject: GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, (gameObject: GameObject) => {
    return getParent(gameObject.uid, GameObjectData);
})

export const setGameObjectParent = requireCheckFunc((parent: GameObject, child: GameObject) => {
    checkGameObjectShouldAlive(parent, GameObjectData);
}, (parent: GameObject, child: GameObject) => {
    return setParent(parent, child, ThreeDTransformData, GameObjectData);
})
