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
import { create, getColor, setColor } from "./AmbientLightSystem";
import { AmbientLightData } from "./AmbientLightData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { getGameObject } from "./SpecifyLightSystem";
var AmbientLight = (function (_super) {
    __extends(AmbientLight, _super);
    function AmbientLight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AmbientLight = __decorate([
        registerClass("AmbientLight")
    ], AmbientLight);
    return AmbientLight;
}(Light));
export { AmbientLight };
export var createAmbientLight = function () {
    return create(AmbientLightData);
};
export var getAmbientLightGameObject = requireCheckFunc(function (component) {
    checkLightShouldAlive(component);
}, function (component) {
    return getGameObject(component.index, AmbientLightData);
});
export var getAmbientLightColor = function (light) {
    return getColor(light.index, AmbientLightData);
};
export var setAmbientLightColor = function (light, color) {
    setColor(light.index, color, AmbientLightData);
};
//# sourceMappingURL=AmbientLight.js.map