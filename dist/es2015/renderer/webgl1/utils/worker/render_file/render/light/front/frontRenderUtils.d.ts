import { InitShaderDataMap } from "../../../../../../../type/utilsType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../../../../data/material_config_interface";
import { IRenderConfig } from "../../../../../../../worker/both_file/data/render_config";
import { IWebGL1DrawFuncDataMap } from "../../../../../../interface/Idraw";
import { LightRenderCommandBufferForDrawData } from "../../../../../../../utils/worker/render_file/type/dataType";
import { CameraRenderCommandBufferForDrawData } from "../../../../../../../utils/worker/render_file/type/dataType";
import { IWebGL1DrawDataMap, IWebGL1LightSendUniformDataDataMap } from "../../../interface/IUtils";
export declare var render: (gl: any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawFuncDataMap: IWebGL1DrawFuncDataMap, drawDataMap: IWebGL1DrawDataMap, sendDataMap: IWebGL1LightSendUniformDataDataMap, initShaderDataMap: InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData, cameraData: CameraRenderCommandBufferForDrawData) => void;
export declare var buildSendUniformDataDataMap: (sendFloat1: any, sendFloat3: any, sendMatrix4: any, sendVector3: any, sendInt: any, sendMatrix3: any, getAmbientLightColorArr3: any, isAmbientLightColorDirty: any, cleanAmbientLightColorDirty: any, getDirectionLightPosition: any, getDirectionLightColorArr3: any, getDirectionLightIntensity: any, isDirectionLightPositionDirty: any, isDirectionLightColorDirty: any, isDirectionLightIntensityDirty: any, cleanDirectionLightPositionDirty: any, cleanDirectionLightColorDirty: any, cleanDirectionLightIntensityDirty: any, getPointLightPosition: any, getPointLightColorArr3: any, getConstant: any, getPointLightIntensity: any, getLinear: any, getQuadratic: any, getRange: any, isPointLightPositionDirty: any, isPointLightColorDirty: any, isPointLightIntensityDirty: any, isPointLightAttenuationDirty: any, cleanPointLightPositionDirty: any, cleanPointLightColorDirty: any, cleanPointLightIntensityDirty: any, cleanPointLightAttenuationDirty: any, drawDataMap: IWebGL1DrawDataMap) => {
    glslSenderData: {
        sendMatrix3: any;
        sendMatrix4: any;
        sendVector3: any;
        sendInt: any;
        sendFloat1: any;
        sendFloat3: any;
        GLSLSenderDataFromSystem: any;
    };
    ambientLightData: {
        getColorArr3: any;
        isColorDirty: any;
        cleanColorDirty: any;
        AmbientLightDataFromSystem: any;
    };
    directionLightData: {
        getPosition: any;
        getColorArr3: any;
        getIntensity: any;
        isPositionDirty: any;
        isColorDirty: any;
        isIntensityDirty: any;
        cleanPositionDirty: any;
        cleanColorDirty: any;
        cleanIntensityDirty: any;
        DirectionLightDataFromSystem: any;
    };
    pointLightData: {
        getPosition: any;
        getColorArr3: any;
        getIntensity: any;
        getConstant: any;
        getLinear: any;
        getQuadratic: any;
        getRange: any;
        isPositionDirty: any;
        isColorDirty: any;
        isIntensityDirty: any;
        isAttenuationDirty: any;
        cleanPositionDirty: any;
        cleanColorDirty: any;
        cleanIntensityDirty: any;
        cleanAttenuationDirty: any;
        PointLightDataFromSystem: any;
    };
};
