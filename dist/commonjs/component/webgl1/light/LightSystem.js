"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentSystem_1 = require("../../ComponentSystem");
var AmbientLightSystem_1 = require("../../light/AmbientLightSystem");
var PointLightSystem_1 = require("../../../renderer/webgl1/light/PointLightSystem");
var DirectionLightSystem_1 = require("../../../renderer/webgl1/light/DirectionLightSystem");
var DirectionLightSystem_2 = require("../../webgl1/light/DirectionLightSystem");
var PointLightSystem_2 = require("../../webgl1/light/PointLightSystem");
exports.addAddComponentHandle = function (AmbientLight, DirectionLight, PointLight) {
    ComponentSystem_1.addAddComponentHandle(AmbientLight, AmbientLightSystem_1.addComponent);
    ComponentSystem_1.addAddComponentHandle(DirectionLight, DirectionLightSystem_2.addComponent);
    ComponentSystem_1.addAddComponentHandle(PointLight, PointLightSystem_2.addComponent);
};
exports.addDisposeHandle = function (AmbientLight, DirectionLight, PointLight) {
    ComponentSystem_1.addDisposeHandle(AmbientLight, AmbientLightSystem_1.disposeComponent);
    ComponentSystem_1.addDisposeHandle(DirectionLight, DirectionLightSystem_2.disposeComponent);
    ComponentSystem_1.addDisposeHandle(PointLight, PointLightSystem_2.disposeComponent);
};
exports.initData = function (AmbientLightData, DirectionLightData, PointLightData) {
    AmbientLightSystem_1.initData(AmbientLightData);
    DirectionLightSystem_1.initData(DirectionLightData);
    PointLightSystem_1.initData(PointLightData);
};
//# sourceMappingURL=LightSystem.js.map