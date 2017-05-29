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
var Material_1 = require("./Material");
var BasicMaterialSystem_1 = require("./BasicMaterialSystem");
var ShaderData_1 = require("../../renderer/shader/ShaderData");
var MaterialData_1 = require("./MaterialData");
var BasicMaterial = (function (_super) {
    __extends(BasicMaterial, _super);
    function BasicMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BasicMaterial;
}(Material_1.Material));
BasicMaterial = __decorate([
    registerClass_1.registerClass("BasicMaterial")
], BasicMaterial);
exports.BasicMaterial = BasicMaterial;
exports.createBasicMaterial = function () {
    return BasicMaterialSystem_1.create(ShaderData_1.ShaderData, MaterialData_1.MaterialData);
};
//# sourceMappingURL=BasicMaterial.js.map