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
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { create, getGameObject, getRenderList } from "./MeshRendererSystem";
import { MeshRendererData } from "./MeshRendererData";
import { Component } from "../Component";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { checkComponentShouldAlive, isComponentIndexNotRemoved } from "../ComponentSystem";
var MeshRenderer = (function (_super) {
    __extends(MeshRenderer, _super);
    function MeshRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MeshRenderer;
}(Component));
MeshRenderer = __decorate([
    registerClass("MeshRenderer")
], MeshRenderer);
export { MeshRenderer };
export var createMeshRenderer = function () {
    return create(MeshRendererData);
};
export var getMeshRendererGameObject = requireCheckFunc(function (component) {
    _checkShouldAlive(component, MeshRendererData);
}, function (component) {
    return getGameObject(component.index, MeshRendererData);
});
export var getMeshRendererRenderList = function () {
    return getRenderList(null, MeshRendererData);
};
var _checkShouldAlive = function (component, MeshRendererData) {
    checkComponentShouldAlive(component, MeshRendererData, function (component, MeshRendererData) {
        return isComponentIndexNotRemoved(component);
    });
};
//# sourceMappingURL=MeshRenderer.js.map