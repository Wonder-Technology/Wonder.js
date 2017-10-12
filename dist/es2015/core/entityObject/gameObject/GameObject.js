var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { addChild, addComponent, addRemovedChild, create, dispose, disposeComponent, getAliveChildren, getAllComponents, getComponent, getMaterial, getParent, getTransform, hasChild, hasComponent, initGameObject as initGameObjectSystem, isAlive, removeChild, setParent } from "./GameObjectSystem";
import { GameObjectData } from "./GameObjectData";
import { ThreeDTransformData } from "../../../component/transform/ThreeDTransformData";
import { create as createThreeDTransform } from "../../../component/transform/ThreeDTransformSystem";
import { requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { checkGameObjectShouldAlive } from "../../../utils/contractUtils";
import { getState } from "../../DirectorSystem";
import { DirectorData } from "../../DirectorData";
import { getComponentIdFromClass } from "../../../component/ComponentComponentIdManager";
import { MeshRendererData } from "../../../component/renderer/MeshRendererData";
var GameObject = (function () {
    function GameObject() {
        this.uid = null;
    }
    GameObject = __decorate([
        registerClass("GameObject")
    ], GameObject);
    return GameObject;
}());
export { GameObject };
export var createGameObject = function () { return create(createThreeDTransform(ThreeDTransformData), GameObjectData); };
export var addGameObjectComponent = requireCheckFunc(function (gameObject, component) {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, function (gameObject, component) {
    addComponent(gameObject, component, GameObjectData);
});
export var disposeGameObject = requireCheckFunc(function (gameObject) {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, function (gameObject) {
    dispose(gameObject, ThreeDTransformData, GameObjectData);
});
export var initGameObject = requireCheckFunc(function (gameObject) {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, function (gameObject) {
    initGameObjectSystem(gameObject, getState(DirectorData), GameObjectData);
});
export var disposeGameObjectComponent = requireCheckFunc(function (gameObject, component) {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, function (gameObject, component) {
    disposeComponent(gameObject.uid, component, GameObjectData);
});
export var getGameObjectComponent = requireCheckFunc(function (gameObject, _class) {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, function (gameObject, _class) {
    return getComponent(gameObject.uid, getComponentIdFromClass(_class), GameObjectData);
});
export var getGameObjectTransform = requireCheckFunc(function (gameObject) {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, function (gameObject) {
    return getTransform(gameObject.uid, GameObjectData);
});
export var getGameObjectMaterial = requireCheckFunc(function (gameObject) {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, function (gameObject) {
    return getMaterial(gameObject.uid, GameObjectData);
});
export var getGameObjectAllComponents = requireCheckFunc(function (gameObject) {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, function (gameObject) {
    return getAllComponents(gameObject.uid, GameObjectData);
});
export var hasGameObjectComponent = requireCheckFunc(function (gameObject, _class) {
}, function (gameObject, _class) {
    return hasComponent(gameObject, getComponentIdFromClass(_class), GameObjectData);
});
export var isGameObjectAlive = function (gameObject) {
    return isAlive(gameObject, GameObjectData);
};
export var addGameObject = requireCheckFunc(function (gameObject, child) {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, function (gameObject, child) {
    addChild(gameObject, child, ThreeDTransformData, GameObjectData);
});
export var addRemovedGameObject = requireCheckFunc(function (gameObject, child) {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, function (gameObject, child) {
    addRemovedChild(gameObject, child, MeshRendererData, ThreeDTransformData, GameObjectData);
});
export var removeGameObject = requireCheckFunc(function (gameObject, child) {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, function (gameObject, child) {
    removeChild(gameObject.uid, child.uid, ThreeDTransformData, GameObjectData);
});
export var hasGameObject = requireCheckFunc(function (gameObject, child) {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, function (gameObject, child) {
    return hasChild(gameObject, child, GameObjectData);
});
export var getGameObjectChildren = requireCheckFunc(function (gameObject) {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, function (gameObject) {
    return getAliveChildren(gameObject.uid, GameObjectData);
});
export var getGameObjectParent = requireCheckFunc(function (gameObject) {
    checkGameObjectShouldAlive(gameObject, GameObjectData);
}, function (gameObject) {
    return getParent(gameObject.uid, GameObjectData);
});
export var setGameObjectParent = requireCheckFunc(function (parent, child) {
    checkGameObjectShouldAlive(parent, GameObjectData);
}, function (parent, child) {
    return setParent(parent, child, ThreeDTransformData, GameObjectData);
});
//# sourceMappingURL=GameObject.js.map