"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentSystem_1 = require("../ComponentSystem");
var AmbientLightSystem_1 = require("./AmbientLightSystem");
var DirectionLightSystem_1 = require("./DirectionLightSystem");
var PointLightSystem_1 = require("./PointLightSystem");
var PointLight_1 = require("./PointLight");
exports.addAddComponentHandle = function (AmbientLight, DirectionLight) {
    ComponentSystem_1.addAddComponentHandle(AmbientLight, AmbientLightSystem_1.addComponent);
    ComponentSystem_1.addAddComponentHandle(DirectionLight, DirectionLightSystem_1.addComponent);
    ComponentSystem_1.addAddComponentHandle(PointLight_1.PointLight, PointLightSystem_1.addComponent);
};
exports.addDisposeHandle = function (AmbientLight, DirectionLight) {
    ComponentSystem_1.addDisposeHandle(AmbientLight, AmbientLightSystem_1.disposeComponent);
    ComponentSystem_1.addDisposeHandle(DirectionLight, DirectionLightSystem_1.disposeComponent);
    ComponentSystem_1.addDisposeHandle(PointLight_1.PointLight, PointLightSystem_1.disposeComponent);
};
exports.initData = function (AmbientLightData, DirectionLightData, PointLightData) {
    AmbientLightSystem_1.initData(AmbientLightData);
    DirectionLightSystem_1.initData(DirectionLightData);
    PointLightSystem_1.initData(PointLightData);
};
//# sourceMappingURL=LightSystem.js.map