"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DirectionLightSystem_1 = require("../../../component/light/DirectionLightSystem");
exports.initData = function (DirectionLightData) {
    DirectionLightSystem_1.initDataHelper(DirectionLightData);
    DirectionLightData.lightGLSLDataStructureMemberNameArr = [
        {
            position: "u_directionLights[0].position",
            color: "u_directionLights[0].color",
            intensity: "u_directionLights[0].intensity"
        }, {
            position: "u_directionLights[1].position",
            color: "u_directionLights[1].color",
            intensity: "u_directionLights[1].intensity"
        }, {
            position: "u_directionLights[2].position",
            color: "u_directionLights[2].color",
            intensity: "u_directionLights[2].intensity"
        }, {
            position: "u_directionLights[3].position",
            color: "u_directionLights[3].color",
            intensity: "u_directionLights[3].intensity"
        }
    ];
};
//# sourceMappingURL=DirectionLightSystem.js.map