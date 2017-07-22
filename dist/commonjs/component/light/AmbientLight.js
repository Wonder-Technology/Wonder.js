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
var Light_1 = require("./Light");
var AmbientLightSystem_1 = require("./AmbientLightSystem");
var AmbientLightData_1 = require("./AmbientLightData");
var contract_1 = require("../../definition/typescript/decorator/contract");
var SpecifyLightSystem_1 = require("./SpecifyLightSystem");
var AmbientLight = (function (_super) {
    __extends(AmbientLight, _super);
    function AmbientLight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AmbientLight = __decorate([
        registerClass_1.registerClass("AmbientLight")
    ], AmbientLight);
    return AmbientLight;
}(Light_1.Light));
exports.AmbientLight = AmbientLight;
exports.createAmbientLight = function () {
    return AmbientLightSystem_1.create(AmbientLightData_1.AmbientLightData);
};
exports.getAmbientLightGameObject = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (component) {
    return SpecifyLightSystem_1.getGameObject(component.index, AmbientLightData_1.AmbientLightData);
});
exports.getAmbientLightColor = function (light) {
    return AmbientLightSystem_1.getColor(light.index, AmbientLightData_1.AmbientLightData);
};
exports.setAmbientLightColor = function (light, color) {
    AmbientLightSystem_1.setColor(light.index, color, AmbientLightData_1.AmbientLightData);
};
//# sourceMappingURL=AmbientLight.js.map