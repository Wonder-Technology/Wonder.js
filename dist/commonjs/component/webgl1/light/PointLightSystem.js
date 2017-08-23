"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpecifyLightSystem_1 = require("../../light/SpecifyLightSystem");
var PointLightData_1 = require("../../../renderer/webgl1/light/PointLightData");
var PointLightSystem_1 = require("../../light/PointLightSystem");
exports.addComponent = function (component, gameObject) {
    SpecifyLightSystem_1.addComponent(component, gameObject, PointLightData_1.WebGL1PointLightData);
};
exports.disposeComponent = function (component) {
    PointLightSystem_1.disposeComponent(component, PointLightData_1.WebGL1PointLightData);
};
//# sourceMappingURL=PointLightSystem.js.map