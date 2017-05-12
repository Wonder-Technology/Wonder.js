import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import {
    addChild,
    addComponent, create, dispose, disposeComponent, getComponent, getTransform, hasChild, hasComponent,
    isAlive, removeChild
} from "./GameObjectSystem";
import { GameObjectData } from "./GameObjectData";
import { DataOrientedComponent } from "../../../component/DataOrientedComponent";
import { getTypeIdFromClass } from "../../../component/DataOrientedComponentTypeIdManager";
import { ThreeDTransformData } from "../../../component/transform/ThreeDTransformData";
import { create as createThreeDTransform } from "../../../component/transform/ThreeDTransformSystem";
// import { EntityObject } from "../EntityObject";
// import { ThreeDTransform } from "../../../component/transform/ThreeDTransform";
// // import { cloneAttributeAsBasicType } from "../../../definition/typescript/decorator/clone";
// import { Collection } from "wonder-commonlib/dist/es2015/Collection";
// // import { RenderUtils } from "../../../utils/RenderUtils";

// @registerClass("GameObject")
// export class GameObject extends EntityObject {
//     public static create() {
//         var obj = new this();
//
//         obj.initWhenCreate();
//
//         return obj;
//     }
//
//     public transform: ThreeDTransform;
//     public parent: GameObject;
//
//     // @cloneAttributeAsBasicType()
//     // public renderGroup: number = 0;
//     // @cloneAttributeAsBasicType()
//     // public renderPriority: number = 0;
//     // @cloneAttributeAsBasicType()
//     // public isVisible: boolean = true;
//
//     protected children: Collection<GameObject>;
//
//     public initWhenCreate() {
//         super.initWhenCreate();
//
//         this.name = `gameObject${String(this.uid)}`;
//     }
//
//     protected createTransform() {
//         return ThreeDTransform.create();
//     }
//
//     // protected getRenderList() {
//     //     return RenderUtils.getGameObjectRenderList(this.getChildren());
//     // }
// }


@registerClass("GameObject")
export class GameObject implements IUIDEntity{
    public uid:number = null;
}

export var createGameObject = () => create(createThreeDTransform(ThreeDTransformData), GameObjectData);

export var addGameObjectComponent = (gameObject:GameObject, component: DataOrientedComponent) => {
    if(!isAlive(gameObject, GameObjectData)){
        return null;
    }

    addComponent(gameObject, component, GameObjectData);
}

export var disposeGameObject = (gameObject:GameObject) => {
    // if(!isAlive(gameObject, GameObjectData)){
    //     return false;
    // }

    dispose(gameObject, GameObjectData);
}

export var disposeGameObjectComponent = (gameObject:GameObject, component: DataOrientedComponent) => {
    if(!isAlive(gameObject, GameObjectData)){
        return false;
    }

    disposeComponent(gameObject, component, GameObjectData);
}

export var getGameObjectComponent = (gameObject:GameObject, _class:any) => {
    if(!isAlive(gameObject, GameObjectData)){
        return null;
    }

    return getComponent(gameObject, getTypeIdFromClass(_class), GameObjectData);
}

export var getGameObjectTransform = (gameObject:GameObject) => {
    if(!isAlive(gameObject, GameObjectData)){
        return null;
    }

    return getTransform(gameObject, GameObjectData);
}

export var hasGameObjectComponent = (gameObject:GameObject, _class:any) => {
    if(!isAlive(gameObject, GameObjectData)){
        return false;
    }

    return hasComponent(gameObject, getTypeIdFromClass(_class), GameObjectData);
}

export var isGameObjectAlive = (gameObject:GameObject) => {
    return isAlive(gameObject, GameObjectData);
}

export var addGameObject = (gameObject:GameObject, child:GameObject) => {
    if(!isAlive(gameObject, GameObjectData)){
        return null;
    }

    addChild(gameObject, child, ThreeDTransformData, GameObjectData);
}

export var removeGameObject = (gameObject:GameObject, child:GameObject) => {
    if(!isAlive(gameObject, GameObjectData)){
        return null;
    }

    removeChild(gameObject, child, ThreeDTransformData, GameObjectData);
}

export var hasGameObject = (gameObject:GameObject, child:GameObject) => {
    if(!isAlive(gameObject, GameObjectData)){
        return false;
    }

    return hasChild(gameObject, child, GameObjectData);
}

export interface IUIDEntity {
    uid:number;
}


