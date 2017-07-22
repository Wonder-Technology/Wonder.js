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
import { create, getColor, getIntensity, getPosition, setColor, setIntensity } from "./DirectionLightSystem";
import { DirectionLightData } from "./DirectionLightData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { ThreeDTransformData } from "../transform/ThreeDTransformData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { getGameObject } from "./SpecifyLightSystem";
var DirectionLight = (function (_super) {
    __extends(DirectionLight, _super);
    function DirectionLight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DirectionLight = __decorate([
        registerClass("DirectionLight")
    ], DirectionLight);
    return DirectionLight;
}(Light));
export { DirectionLight };
export var createDirectionLight = function () {
    return create(DirectionLightData);
};
export var getDirectionLightGameObject = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (component) {
    return getGameObject(component.index, DirectionLightData);
});
export var getDirectionLightPosition = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (component) {
    return getPosition(component.index, ThreeDTransformData, GameObjectData, DirectionLightData);
});
export var getDirectionLightColor = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light) {
    return getColor(light.index, DirectionLightData);
});
export var setDirectionLightColor = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light, color) {
    setColor(light.index, color, DirectionLightData);
});
export var getDirectionLightIntensity = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light) {
    return getIntensity(light.index, DirectionLightData);
});
export var setDirectionLightIntensity = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (light, intensity) {
    setIntensity(light.index, intensity, DirectionLightData);
});
//# sourceMappingURL=DirectionLight.js.map