import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { bindIndexBuffer as bindIndexBufferUtils, init as initUtils, sendAttributeData as sendAttributeDataUtils, sendUniformData as sendUniformDataUtils, use as useUtils } from "../utils/shader/shaderUtils";
import { getIndices, getNormals, getTexCoords, getVertices } from "../../component/geometry/GeometrySystem";
import { getAttribLocation, isAttributeLocationNotExist } from "./location/LocationSystem";
import { getUniformData, sendBuffer, sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "./glslSender/GLSLSenderSystem";
import { buildGLSLSource } from "./shaderSourceBuildSystem";
import { getGL } from "../device/DeviceManagerSystem";
import { ThreeDTransformData } from "../../component/transform/ThreeDTransformData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { getColorArr3 as getAmbientLightColorArr3 } from "../../component/light/AmbientLightSystem";
import { getColorArr3 as getDirectionLightColorArr3, getIntensity, getPosition as getDirectionLightPosition, } from "../../component/light/DirectionLightSystem";
import { getPosition as getPointLightPosition, getColorArr3 as getPointLightColorArr3, getConstant, getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange } from "../../component/light/PointLightSystem";
import { getMapCount } from "../texture/MapManagerSystem";
import { createMap } from "../../utils/objectUtils";
import { hasDiffuseMap, hasSpecularMap } from "../utils/material/lightMaterialUtils";
export var create = function (ShaderData) {
    ShaderData.count += 1;
};
export var init = null;
export var sendAttributeData = null;
export var sendUniformData = null;
export var bindIndexBuffer = null;
export var use = null;
if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    init = function (state, materialIndex, materialClassName, material_config, shaderLib_generator, initShaderDataMap) {
        return initUtils(state, materialIndex, materialClassName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
    };
    var _buildInitShaderFuncDataMap = function () {
        return {
            buildGLSLSource: buildGLSLSource,
            getGL: getGL,
            getMapCount: getMapCount,
            hasSpecularMap: hasSpecularMap,
            hasDiffuseMap: hasDiffuseMap
        };
    };
    sendAttributeData = function (gl, shaderIndex, program, geometryIndex, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData) { return sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
        getVertices: getVertices,
        getNormals: getNormals,
        getTexCoords: getTexCoords
    }, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData); };
    sendUniformData = function (gl, shaderIndex, program, mapCount, drawDataMap, renderCommandUniformData) {
        sendUniformDataUtils(gl, shaderIndex, program, mapCount, _buildSendUniformDataDataMap(drawDataMap), drawDataMap, renderCommandUniformData);
    };
    var _buildSendUniformDataDataMap = function (drawDataMap) {
        return {
            glslSenderData: {
                getUniformData: getUniformData,
                sendMatrix3: sendMatrix3,
                sendMatrix4: sendMatrix4,
                sendVector3: sendVector3,
                sendInt: sendInt,
                sendFloat1: sendFloat1,
                sendFloat3: sendFloat3,
                GLSLSenderDataFromSystem: drawDataMap.GLSLSenderDataFromSystem
            },
            ambientLightData: {
                getColorArr3: getAmbientLightColorArr3,
                AmbientLightDataFromSystem: drawDataMap.AmbientLightDataFromSystem
            },
            directionLightData: {
                getPosition: function (index) {
                    return getDirectionLightPosition(index, ThreeDTransformData, GameObjectData, drawDataMap.DirectionLightDataFromSystem).values;
                },
                getColorArr3: getDirectionLightColorArr3,
                getIntensity: getIntensity,
                DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
            },
            pointLightData: {
                getPosition: function (index) {
                    return getPointLightPosition(index, ThreeDTransformData, GameObjectData, drawDataMap.PointLightDataFromSystem).values;
                },
                getColorArr3: getPointLightColorArr3,
                getIntensity: getPointLightIntensity,
                getConstant: getConstant,
                getLinear: getLinear,
                getQuadratic: getQuadratic,
                getRange: getRange,
                PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
            }
        };
    };
    bindIndexBuffer = function (gl, geometryIndex, ProgramData, GeometryData, IndexBufferData) {
        bindIndexBufferUtils(gl, geometryIndex, getIndices, ProgramData, GeometryData, IndexBufferData);
    };
    use = useUtils;
}
export var initData = function (ShaderData) {
    ShaderData.index = 0;
    ShaderData.count = 0;
    ShaderData.shaderLibWholeNameMap = createMap();
};
//# sourceMappingURL=ShaderSystem.js.map