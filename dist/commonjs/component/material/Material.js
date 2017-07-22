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
var MaterialSystem_1 = require("./MaterialSystem");
var MaterialData_1 = require("./MaterialData");
var Component_1 = require("../Component");
var contract_1 = require("../../definition/typescript/decorator/contract");
var ComponentSystem_1 = require("../ComponentSystem");
var Material = (function (_super) {
    __extends(Material, _super);
    function Material() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Material = __decorate([
        registerClass_1.registerClass("Material")
    ], Material);
    return Material;
}(Component_1.Component));
exports.Material = Material;
exports.getMaterialGameObject = contract_1.requireCheckFunc(function (material) {
    exports.checkShouldAlive(material);
}, function (component) {
    return MaterialSystem_1.getGameObject(component.index, MaterialData_1.MaterialData);
});
exports.checkShouldAlive = function (material) {
    ComponentSystem_1.checkComponentShouldAlive(material, null, function (material) {
        return ComponentSystem_1.isComponentIndexNotRemoved(material);
    });
};
//# sourceMappingURL=Material.js.map