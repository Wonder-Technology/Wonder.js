"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../../definition/typescript/decorator/registerClass");
var GameObjectSystem_1 = require("./GameObjectSystem");
var GameObjectData_1 = require("./GameObjectData");
var ThreeDTransformData_1 = require("../../../component/transform/ThreeDTransformData");
var ThreeDTransformSystem_1 = require("../../../component/transform/ThreeDTransformSystem");
var contract_1 = require("../../../definition/typescript/decorator/contract");
var contractUtils_1 = require("../../../utils/contractUtils");
var DirectorSystem_1 = require("../../DirectorSystem");
var DirectorData_1 = require("../../DirectorData");
var ComponentComponentIDManager_1 = require("../../../component/ComponentComponentIDManager");
var GameObject = (function () {
    function GameObject() {
        this.uid = null;
    }
    GameObject = __decorate([
        registerClass_1.registerClass("GameObject")
    ], GameObject);
    return GameObject;
}());
exports.GameObject = GameObject;
exports.createGameObject = function () { return GameObjectSystem_1.create(ThreeDTransformSystem_1.create(ThreeDTransformData_1.ThreeDTransformData), GameObjectData_1.GameObjectData); };
exports.addGameObjectComponent = contract_1.requireCheckFunc(function (gameObject, component) {
    contractUtils_1.checkGameObjectShouldAlive(gameObject, GameObjectData_1.GameObjectData);
}, function (gameObject, component) {
    GameObjectSystem_1.addComponent(gameObject, component, GameObjectData_1.GameObjectData);
});
exports.disposeGameObject = contract_1.requireCheckFunc(function (gameObject) {
    contractUtils_1.checkGameObjectShouldAlive(gameObject, GameObjectData_1.GameObjectData);
}, function (gameObject) {
    GameObjectSystem_1.dispose(gameObject, ThreeDTransformData_1.ThreeDTransformData, GameObjectData_1.GameObjectData);
});
exports.initGameObject = contract_1.requireCheckFunc(function (gameObject, component) {
    contractUtils_1.checkGameObjectShouldAlive(gameObject, GameObjectData_1.GameObjectData);
}, function (gameObject, component) {
    GameObjectSystem_1.initGameObject(gameObject, DirectorSystem_1.getState(DirectorData_1.DirectorData), GameObjectData_1.GameObjectData);
});
exports.disposeGameObjectComponent = contract_1.requireCheckFunc(function (gameObject, component) {
    contractUtils_1.checkGameObjectShouldAlive(gameObject, GameObjectData_1.GameObjectData);
}, function (gameObject, component) {
    GameObjectSystem_1.disposeComponent(gameObject, component, GameObjectData_1.GameObjectData);
});
exports.getGameObjectComponent = contract_1.requireCheckFunc(function (gameObject, _class) {
    contractUtils_1.checkGameObjectShouldAlive(gameObject, GameObjectData_1.GameObjectData);
}, function (gameObject, _class) {
    return GameObjectSystem_1.getComponent(gameObject, ComponentComponentIDManager_1.getComponentIDFromClass(_class), GameObjectData_1.GameObjectData);
});
exports.getGameObjectTransform = function (gameObject) {
    return GameObjectSystem_1.getTransform(gameObject, GameObjectData_1.GameObjectData);
};
exports.hasGameObjectComponent = contract_1.requireCheckFunc(function (gameObject, _class) {
}, function (gameObject, _class) {
    return GameObjectSystem_1.hasComponent(gameObject, ComponentComponentIDManager_1.getComponentIDFromClass(_class), GameObjectData_1.GameObjectData);
});
exports.isGameObjectAlive = function (gameObject) {
    return GameObjectSystem_1.isAlive(gameObject, GameObjectData_1.GameObjectData);
};
exports.addGameObject = contract_1.requireCheckFunc(function (gameObject, child) {
    contractUtils_1.checkGameObjectShouldAlive(gameObject, GameObjectData_1.GameObjectData);
}, function (gameObject, child) {
    GameObjectSystem_1.addChild(gameObject, child, ThreeDTransformData_1.ThreeDTransformData, GameObjectData_1.GameObjectData);
});
exports.removeGameObject = contract_1.requireCheckFunc(function (gameObject, child) {
    contractUtils_1.checkGameObjectShouldAlive(gameObject, GameObjectData_1.GameObjectData);
}, function (gameObject, child) {
    GameObjectSystem_1.removeChild(gameObject, child, ThreeDTransformData_1.ThreeDTransformData, GameObjectData_1.GameObjectData);
});
exports.hasGameObject = contract_1.requireCheckFunc(function (gameObject, child) {
    contractUtils_1.checkGameObjectShouldAlive(gameObject, GameObjectData_1.GameObjectData);
}, function (gameObject, child) {
    return GameObjectSystem_1.hasChild(gameObject, child, GameObjectData_1.GameObjectData);
});
exports.getGameObjectChildren = contract_1.requireCheckFunc(function (gameObject) {
    contractUtils_1.checkGameObjectShouldAlive(gameObject, GameObjectData_1.GameObjectData);
}, function (gameObject) {
    return GameObjectSystem_1.getAliveChildren(gameObject.uid, GameObjectData_1.GameObjectData);
});
exports.getGameObjectParent = contract_1.requireCheckFunc(function (gameObject) {
    contractUtils_1.checkGameObjectShouldAlive(gameObject, GameObjectData_1.GameObjectData);
}, function (gameObject) {
    return GameObjectSystem_1.getParent(gameObject.uid, GameObjectData_1.GameObjectData);
});
//# sourceMappingURL=GameObject.js.map