"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var MeshRendererSystem_1 = require("./MeshRendererSystem");
var MeshRendererData_1 = require("./MeshRendererData");
var Component_1 = require("../Component");
var contract_1 = require("../../definition/typescript/decorator/contract");
var ComponentSystem_1 = require("../ComponentSystem");
var MeshRenderer = (function (_super) {
    __extends(MeshRenderer, _super);
    function MeshRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeshRenderer = __decorate([
        registerClass_1.registerClass("MeshRenderer")
    ], MeshRenderer);
    return MeshRenderer;
}(Component_1.Component));
exports.MeshRenderer = MeshRenderer;
exports.createMeshRenderer = function () {
    return MeshRendererSystem_1.create(MeshRendererData_1.MeshRendererData);
};
exports.getMeshRendererGameObject = contract_1.requireCheckFunc(function (component) {
    _checkShouldAlive(component, MeshRendererData_1.MeshRendererData);
}, function (component) {
    return MeshRendererSystem_1.getGameObject(component.index, MeshRendererData_1.MeshRendererData);
});
exports.getMeshRendererRenderList = function () {
    return MeshRendererSystem_1.getRenderList(null, MeshRendererData_1.MeshRendererData);
};
var _checkShouldAlive = function (component, MeshRendererData) {
    ComponentSystem_1.checkComponentShouldAlive(component, MeshRendererData, function (component, MeshRendererData) {
        return ComponentSystem_1.isComponentIndexNotRemoved(component);
    });
};
//# sourceMappingURL=MeshRenderer.js.map