import { getColorArr3, getOpacity } from "../../../../component/material/MaterialSystem";
import { getEmissionColorArr3, getLightModel, getShininess, getSpecularColorArr3 } from "../../../../component/material/LightMaterialSystem";
import { buildLightMaterialDataForGetUniformData, buildMaterialDataForGetUniformData, sendUniformData as sendUniformDataUtils } from "../../../utils/worker/render_file/render/light/lightRenderUtils";
export var sendUniformData = function (gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap) {
    sendUniformDataUtils(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), buildLightMaterialDataForGetUniformData(getEmissionColorArr3, getSpecularColorArr3, getLightModel, getShininess, drawDataMap.LightMaterialDataFromSystem));
};
//# sourceMappingURL=LightRenderSystem.js.map