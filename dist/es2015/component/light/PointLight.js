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
import { checkLightShouldAlive, Light } from "./Light";
import { create, getColor, getConstant, getIntensity, getLinear, getPosition, getQuadratic, getRange, setColor, setConstant, setIntensity, setLinear, setQuadratic, setRange, setRangeLevel } from "./PointLightSystem";
import { PointLightData } from "./PointLightData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { ThreeDTransformData } from "../transform/ThreeDTransformData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { getGameObject } from "./SpecifyLightSystem";
var PointLight = (function (_super) {
    __extends(PointLight, _super);
    function PointLight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointLight = __decorate([
        registerClass("PointLight")
    ], PointLight);
    return PointLight;
}(Light));
export { PointLight };
export var createPointLight = function () {
    return create(PointLightData);
};
export var getPointLightGameObject = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (component) {
    return getGameObject(component.index, PointLightData);
});
export var getPointLightPosition = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (component) {
    return getPosition(component.index, ThreeDTransformData, GameObjectData, PointLightData);
});
export var getPointLightColor = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light) {
    return getColor(light.index, PointLightData);
});
export var setPointLightColor = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light, color) {
    setColor(light.index, color, PointLightData);
});
export var getPointLightIntensity = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light) {
    return getIntensity(light.index, PointLightData);
});
export var setPointLightIntensity = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light, value) {
    setIntensity(light.index, value, PointLightData);
});
export var getPointLightConstant = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light) {
    return getConstant(light.index, PointLightData);
});
export var setPointLightConstant = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light, value) {
    setConstant(light.index, value, PointLightData);
});
export var getPointLightLinear = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light) {
    return getLinear(light.index, PointLightData);
});
export var setPointLightLinear = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light, value) {
    setLinear(light.index, value, PointLightData);
});
export var getPointLightQuadratic = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light) {
    return getQuadratic(light.index, PointLightData);
});
export var setPointLightQuadratic = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light, value) {
    setQuadratic(light.index, value, PointLightData);
});
export var getPointLightRange = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light) {
    return getRange(light.index, PointLightData);
});
export var setPointLightRange = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light, value) {
    setRange(light.index, value, PointLightData);
});
export var setPointLightRangeLevel = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light, value) {
    setRangeLevel(light.index, value, PointLightData);
});
//# sourceMappingURL=PointLight.js.map