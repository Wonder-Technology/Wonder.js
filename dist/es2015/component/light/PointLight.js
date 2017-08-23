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
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { ThreeDTransformData } from "../transform/ThreeDTransformData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { getGameObject } from "./SpecifyLightSystem";
import { isWebgl1 } from "../../renderer/device/WebGLDetectSystem";
import { WebGL1PointLightData } from "../../renderer/webgl1/light/PointLightData";
import { WebGL2PointLightData } from "../../renderer/webgl2/light/PointLightData";
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
export var createPointLight = null;
export var getPointLightGameObject = null;
export var getPointLightPosition = null;
export var getPointLightColor = null;
export var setPointLightColor = null;
export var getPointLightIntensity = null;
export var setPointLightIntensity = null;
export var getPointLightConstant = null;
export var setPointLightConstant = null;
export var getPointLightLinear = null;
export var setPointLightLinear = null;
export var getPointLightQuadratic = null;
export var setPointLightQuadratic = null;
export var getPointLightRange = null;
export var setPointLightRange = null;
export var setPointLightRangeLevel = null;
if (isWebgl1()) {
    createPointLight = function () {
        return create(WebGL1PointLightData);
    };
    getPointLightGameObject = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (component) {
        return getGameObject(component.index, WebGL1PointLightData);
    });
    getPointLightPosition = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (component) {
        return getPosition(component.index, ThreeDTransformData, GameObjectData, WebGL1PointLightData);
    });
    getPointLightColor = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light) {
        return getColor(light.index, WebGL1PointLightData);
    });
    setPointLightColor = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light, color) {
        setColor(light.index, color, WebGL1PointLightData);
    });
    getPointLightIntensity = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light) {
        return getIntensity(light.index, WebGL1PointLightData);
    });
    setPointLightIntensity = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light, value) {
        setIntensity(light.index, value, WebGL1PointLightData);
    });
    getPointLightConstant = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light) {
        return getConstant(light.index, WebGL1PointLightData);
    });
    setPointLightConstant = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light, value) {
        setConstant(light.index, value, WebGL1PointLightData);
    });
    getPointLightLinear = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light) {
        return getLinear(light.index, WebGL1PointLightData);
    });
    setPointLightLinear = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light, value) {
        setLinear(light.index, value, WebGL1PointLightData);
    });
    getPointLightQuadratic = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light) {
        return getQuadratic(light.index, WebGL1PointLightData);
    });
    setPointLightQuadratic = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light, value) {
        setQuadratic(light.index, value, WebGL1PointLightData);
    });
    getPointLightRange = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light) {
        return getRange(light.index, WebGL1PointLightData);
    });
    setPointLightRange = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light, value) {
        setRange(light.index, value, WebGL1PointLightData);
    });
    setPointLightRangeLevel = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light, value) {
        setRangeLevel(light.index, value, WebGL1PointLightData);
    });
}
else {
    createPointLight = function () {
        return create(WebGL2PointLightData);
    };
    getPointLightGameObject = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (component) {
        return getGameObject(component.index, WebGL2PointLightData);
    });
    getPointLightPosition = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (component) {
        return getPosition(component.index, ThreeDTransformData, GameObjectData, WebGL2PointLightData);
    });
    getPointLightColor = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light) {
        return getColor(light.index, WebGL2PointLightData);
    });
    setPointLightColor = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light, color) {
        setColor(light.index, color, WebGL2PointLightData);
    });
    getPointLightIntensity = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light) {
        return getIntensity(light.index, WebGL2PointLightData);
    });
    setPointLightIntensity = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light, value) {
        setIntensity(light.index, value, WebGL2PointLightData);
    });
    getPointLightConstant = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light) {
        return getConstant(light.index, WebGL2PointLightData);
    });
    setPointLightConstant = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light, value) {
        setConstant(light.index, value, WebGL2PointLightData);
    });
    getPointLightLinear = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light) {
        return getLinear(light.index, WebGL2PointLightData);
    });
    setPointLightLinear = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light, value) {
        setLinear(light.index, value, WebGL2PointLightData);
    });
    getPointLightQuadratic = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light) {
        return getQuadratic(light.index, WebGL2PointLightData);
    });
    setPointLightQuadratic = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light, value) {
        setQuadratic(light.index, value, WebGL2PointLightData);
    });
    getPointLightRange = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light) {
        return getRange(light.index, WebGL2PointLightData);
    });
    setPointLightRange = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light, value) {
        setRange(light.index, value, WebGL2PointLightData);
    });
    setPointLightRangeLevel = requireCheckFunc(function (component) {
        checkLightShouldAlive(component);
    }, function (light, value) {
        setRangeLevel(light.index, value, WebGL2PointLightData);
    });
}
//# sourceMappingURL=PointLight.js.map