"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MaterialSystem_1 = require("../../../../component/material/MaterialSystem");
var LightMaterialSystem_1 = require("../../../../component/material/LightMaterialSystem");
var lightRenderUtils_1 = require("../../../utils/worker/render_file/render/light/lightRenderUtils");
exports.sendUniformData = function (gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap) {
    lightRenderUtils_1.sendUniformData(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, lightRenderUtils_1.buildMaterialDataForGetUniformData(MaterialSystem_1.getColorArr3, MaterialSystem_1.getOpacity, drawDataMap.MaterialDataFromSystem), lightRenderUtils_1.buildLightMaterialDataForGetUniformData(LightMaterialSystem_1.getEmissionColorArr3, LightMaterialSystem_1.getSpecularColorArr3, LightMaterialSystem_1.getLightModel, LightMaterialSystem_1.getShininess, drawDataMap.LightMaterialDataFromSystem));
};
//# sourceMappingURL=LightRenderSystem.js.map