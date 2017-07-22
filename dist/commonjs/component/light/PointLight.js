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
var PointLightSystem_1 = require("./PointLightSystem");
var PointLightData_1 = require("./PointLightData");
var contract_1 = require("../../definition/typescript/decorator/contract");
var ThreeDTransformData_1 = require("../transform/ThreeDTransformData");
var GameObjectData_1 = require("../../core/entityObject/gameObject/GameObjectData");
var SpecifyLightSystem_1 = require("./SpecifyLightSystem");
var PointLight = (function (_super) {
    __extends(PointLight, _super);
    function PointLight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointLight = __decorate([
        registerClass_1.registerClass("PointLight")
    ], PointLight);
    return PointLight;
}(Light_1.Light));
exports.PointLight = PointLight;
exports.createPointLight = function () {
    return PointLightSystem_1.create(PointLightData_1.PointLightData);
};
exports.getPointLightGameObject = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (component) {
    return SpecifyLightSystem_1.getGameObject(component.index, PointLightData_1.PointLightData);
});
exports.getPointLightPosition = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (component) {
    return PointLightSystem_1.getPosition(component.index, ThreeDTransformData_1.ThreeDTransformData, GameObjectData_1.GameObjectData, PointLightData_1.PointLightData);
});
exports.getPointLightColor = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (light) {
    return PointLightSystem_1.getColor(light.index, PointLightData_1.PointLightData);
});
exports.setPointLightColor = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (light, color) {
    PointLightSystem_1.setColor(light.index, color, PointLightData_1.PointLightData);
});
exports.getPointLightIntensity = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (light) {
    return PointLightSystem_1.getIntensity(light.index, PointLightData_1.PointLightData);
});
exports.setPointLightIntensity = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (light, value) {
    PointLightSystem_1.setIntensity(light.index, value, PointLightData_1.PointLightData);
});
exports.getPointLightConstant = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (light) {
    return PointLightSystem_1.getConstant(light.index, PointLightData_1.PointLightData);
});
exports.setPointLightConstant = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (light, value) {
    PointLightSystem_1.setConstant(light.index, value, PointLightData_1.PointLightData);
});
exports.getPointLightLinear = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (light) {
    return PointLightSystem_1.getLinear(light.index, PointLightData_1.PointLightData);
});
exports.setPointLightLinear = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (light, value) {
    PointLightSystem_1.setLinear(light.index, value, PointLightData_1.PointLightData);
});
exports.getPointLightQuadratic = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (light) {
    return PointLightSystem_1.getQuadratic(light.index, PointLightData_1.PointLightData);
});
exports.setPointLightQuadratic = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (light, value) {
    PointLightSystem_1.setQuadratic(light.index, value, PointLightData_1.PointLightData);
});
exports.getPointLightRange = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (light) {
    return PointLightSystem_1.getRange(light.index, PointLightData_1.PointLightData);
});
exports.setPointLightRange = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (light, value) {
    PointLightSystem_1.setRange(light.index, value, PointLightData_1.PointLightData);
});
exports.setPointLightRangeLevel = contract_1.requireCheckFunc(function (component) {
    Light_1.checkLightShouldAlive(component);
}, function (light, value) {
    PointLightSystem_1.setRangeLevel(light.index, value, PointLightData_1.PointLightData);
});
//# sourceMappingURL=PointLight.js.map