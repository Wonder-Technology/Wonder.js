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
import { requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { checkGameObjectShouldAlive } from "../../../utils/contractUtils";
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

export var addGameObjectComponent = requireCheckFunc((gameObject:GameObject, child:GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject, component: DataOrientedComponent) => {
    addComponent(gameObject, component, GameObjectData);
})

export var disposeGameObject = (gameObject:GameObject) => {
    dispose(gameObject, GameObjectData);
}

export var disposeGameObjectComponent = requireCheckFunc((gameObject:GameObject, child:GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject, component: DataOrientedComponent) => {
    disposeComponent(gameObject, component, GameObjectData);
})

export var getGameObjectComponent = requireCheckFunc((gameObject:GameObject, child:GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject, _class:any) => {
    return getComponent(gameObject, getTypeIdFromClass(_class), GameObjectData);
})

export var getGameObjectTransform = (gameObject:GameObject) => {
    return getTransform(gameObject, GameObjectData);
}

export var hasGameObjectComponent = requireCheckFunc((gameObject:GameObject, child:GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject, _class:any) => {
    return hasComponent(gameObject, getTypeIdFromClass(_class), GameObjectData);
})

export var isGameObjectAlive = (gameObject:GameObject) => {
    return isAlive(gameObject, GameObjectData);
}

export var addGameObject = requireCheckFunc((gameObject:GameObject, child:GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject, child:GameObject) => {
    addChild(gameObject, child, ThreeDTransformData, GameObjectData);
})

export var removeGameObject = requireCheckFunc((gameObject:GameObject, child:GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject, child:GameObject) => {
    removeChild(gameObject, child, ThreeDTransformData, GameObjectData);
})

export var hasGameObject = requireCheckFunc((gameObject:GameObject, child:GameObject) => {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
},(gameObject:GameObject, child:GameObject) => {
    return hasChild(gameObject, child, GameObjectData);
})

export interface IUIDEntity {
    uid:number;
}


