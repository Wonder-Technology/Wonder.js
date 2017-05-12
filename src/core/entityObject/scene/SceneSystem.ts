import { create as createGameObject, addChild as addGameObject, removeChild as removeGameObject } from "../gameObject/GameObjectSystem";
import { GameObject } from "../gameObject/GameObject";

export var create = (GameObjectData:any) => {
    return createGameObject(null, GameObjectData);
}

export var addChild = (gameObject:GameObject, child:GameObject, GameObjectData:any) => {
    addGameObject(gameObject, child, null, GameObjectData);
}

export var removeChild = (gameObject:GameObject, child:GameObject, ThreeDTransformData:any, GameObjectData:any) => {
    removeGameObject(gameObject, child, ThreeDTransformData, GameObjectData);
}
