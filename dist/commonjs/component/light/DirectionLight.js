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
var DirectionLightSystem_1 = require("./DirectionLightSystem");
var contract_1 = require("../../definition/typescript/decorator/contract");
var ThreeDTransformData_1 = require("../transform/ThreeDTransformData");
var GameObjectData_1 = require("../../core/entityObject/gameObject/GameObjectData");
var SpecifyLightSystem_1 = require("./SpecifyLightSystem");
var DirectionLightData_1 = require("../../renderer/webgl2/light/DirectionLightData");
var DirectionLightData_2 = require("../../renderer/webgl1/light/DirectionLightData");
var WebGLDetectSystem_1 = require("../../renderer/device/WebGLDetectSystem");
var DirectionLight = (function (_super) {
    __extends(DirectionLight, _super);
    function DirectionLight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DirectionLight = __decorate([
        registerClass_1.registerClass("DirectionLight")
    ], DirectionLight);
    return DirectionLight;
}(Light_1.Light));
exports.DirectionLight = DirectionLight;
exports.createDirectionLight = null;
exports.getDirectionLightGameObject = null;
exports.getDirectionLightPosition = null;
exports.getDirectionLightColor = null;
exports.setDirectionLightColor = null;
exports.getDirectionLightIntensity = null;
exports.setDirectionLightIntensity = null;
if (WebGLDetectSystem_1.isWebgl1()) {
    exports.createDirectionLight = function () {
        return DirectionLightSystem_1.create(DirectionLightData_2.WebGL1DirectionLightData);
    };
    exports.getDirectionLightGameObject = contract_1.requireCheckFunc(function (component) {
        Light_1.checkLightShouldAlive(component);
    }, function (component) {
        return SpecifyLightSystem_1.getGameObject(component.index, DirectionLightData_2.WebGL1DirectionLightData);
    });
    exports.getDirectionLightPosition = contract_1.requireCheckFunc(function (component) {
        Light_1.checkLightShouldAlive(component);
    }, function (component) {
        return DirectionLightSystem_1.getPosition(component.index, ThreeDTransformData_1.ThreeDTransformData, GameObjectData_1.GameObjectData, DirectionLightData_2.WebGL1DirectionLightData);
    });
    exports.getDirectionLightColor = contract_1.requireCheckFunc(function (component) {
        Light_1.checkLightShouldAlive(component);
    }, function (light) {
        return DirectionLightSystem_1.getColor(light.index, DirectionLightData_2.WebGL1DirectionLightData);
    });
    exports.setDirectionLightColor = contract_1.requireCheckFunc(function (component) {
        Light_1.checkLightShouldAlive(component);
    }, function (light, color) {
        DirectionLightSystem_1.setColor(light.index, color, DirectionLightData_2.WebGL1DirectionLightData);
    });
    exports.getDirectionLightIntensity = contract_1.requireCheckFunc(function (component) {
        Light_1.checkLightShouldAlive(component);
    }, function (light) {
        return DirectionLightSystem_1.getIntensity(light.index, DirectionLightData_2.WebGL1DirectionLightData);
    });
    exports.setDirectionLightIntensity = contract_1.requireCheckFunc(function (component) {
        Light_1.checkLightShouldAlive(component);
    }, function (light, value) {
        DirectionLightSystem_1.setIntensity(light.index, value, DirectionLightData_2.WebGL1DirectionLightData);
    });
}
else {
    exports.createDirectionLight = function () {
        return DirectionLightSystem_1.create(DirectionLightData_1.WebGL2DirectionLightData);
    };
    exports.getDirectionLightGameObject = contract_1.requireCheckFunc(function (component) {
        Light_1.checkLightShouldAlive(component);
    }, function (component) {
        return SpecifyLightSystem_1.getGameObject(component.index, DirectionLightData_1.WebGL2DirectionLightData);
    });
    exports.getDirectionLightPosition = contract_1.requireCheckFunc(function (component) {
        Light_1.checkLightShouldAlive(component);
    }, function (component) {
        return DirectionLightSystem_1.getPosition(component.index, ThreeDTransformData_1.ThreeDTransformData, GameObjectData_1.GameObjectData, DirectionLightData_1.WebGL2DirectionLightData);
    });
    exports.getDirectionLightColor = contract_1.requireCheckFunc(function (component) {
        Light_1.checkLightShouldAlive(component);
    }, function (light) {
        return DirectionLightSystem_1.getColor(light.index, DirectionLightData_1.WebGL2DirectionLightData);
    });
    exports.setDirectionLightColor = contract_1.requireCheckFunc(function (component) {
        Light_1.checkLightShouldAlive(component);
    }, function (light, color) {
        DirectionLightSystem_1.setColor(light.index, color, DirectionLightData_1.WebGL2DirectionLightData);
    });
    exports.getDirectionLightIntensity = contract_1.requireCheckFunc(function (component) {
        Light_1.checkLightShouldAlive(component);
    }, function (light) {
        return DirectionLightSystem_1.getIntensity(light.index, DirectionLightData_1.WebGL2DirectionLightData);
    });
    exports.setDirectionLightIntensity = contract_1.requireCheckFunc(function (component) {
        Light_1.checkLightShouldAlive(component);
    }, function (light, value) {
        DirectionLightSystem_1.setIntensity(light.index, value, DirectionLightData_1.WebGL2DirectionLightData);
    });
}
//# sourceMappingURL=DirectionLight.js.map