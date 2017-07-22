var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "../Component";
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { create, getGameObject } from "./CameraControllerSystem";
import { CameraControllerData } from "./CameraControllerData";
var CameraController = (function (_super) {
    __extends(CameraController, _super);
    function CameraController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CameraController = __decorate([
        registerClass("CameraController")
    ], CameraController);
    return CameraController;
}(Component));
export { CameraController };
export var createCameraController = function () {
    return create(CameraControllerData);
};
export var getCameraControllerGameObject = function (component) {
    return getGameObject(component.index, CameraControllerData);
};
//# sourceMappingURL=CameraController.js.map