import { Map } from "immutable";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { getNoMaterialShaderIndex } from "../../../worker/render_file/shader/shaderUtils";
import { unbindVao } from "../../../worker/render_file/vao/vaoUtils";
import {
    drawFullScreenQuad, getScissorRegionArrayCache,
    sendAttributeData, setScissorRegionArrayCache
} from "../../../render/light/defer/light/deferLightPassUtils";
import {
    getViewport, setBlend, setBlendEquation, setBlendFunc, setDepthTest,
    setDepthWrite, setScissorTest
} from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
import { bindDirectionLightUboData, bindPointLightUboData, bindAmbientLightUboData } from "../../../worker/render_file/ubo/uboManagerUtils";
import {
    IWebGL2DrawDataMap, IWebGL2LightSendUniformDataDataMap, IWebGL2SendUniformDataAmbientLightDataMap,
    IWebGL2SendUniformDataDirectionLightDataMap
} from "../../../worker/render_file/interface/IUtils";
import { Vector4 } from "../../../../../../math/Vector4";
import { Vector2 } from "../../../../../../math/Vector2";
import { IWebGL2SendUniformDataPointLightDataMap } from "../../../worker/render_file/interface/IUtils";
import { EBlendEquation } from "../../../../../enum/EBlendEquation";
import { EBlendFunc } from "../../../../../enum/EBlendFunc";
import { drawPointLightPass } from "./pointLightPassDrawUtils";

export const drawLightPass = (gl: any, render_config: IRenderConfig, {
    use,
    unbindGBuffer
}, drawDataMap: IWebGL2DrawDataMap, {
                                DeferAmbientLightPassDataFromSystem,
        DeferDirectionLightPassDataFromSystem,
        DeferPointLightPassDataFromSystem
                            }, initShaderDataMap: InitShaderDataMap, sendDataMap: IWebGL2LightSendUniformDataDataMap, vMatrix: Float32Array, pMatrix: Float32Array, state: Map<any, any>) => {
    var {
            ShaderDataFromSystem
        } = initShaderDataMap,
        {
            DeviceManagerDataFromSystem,

            AmbientLightDataFromSystem,
            DirectionLightDataFromSystem,
            PointLightDataFromSystem,

            ProgramDataFromSystem,
            LocationDataFromSystem,
            GLSLSenderDataFromSystem
        } = drawDataMap,
        ambientLightCount = AmbientLightDataFromSystem.count,
        directionLightCount = DirectionLightDataFromSystem.count,
        pointLightCount = PointLightDataFromSystem.count;

    unbindGBuffer(gl);

    setDepthWrite(gl, false, DeviceManagerDataFromSystem);
    setDepthTest(gl, false, DeviceManagerDataFromSystem);
    setBlend(gl, true, DeviceManagerDataFromSystem);
    setBlendEquation(gl, EBlendEquation.ADD, DeviceManagerDataFromSystem);
    setBlendFunc(gl, EBlendFunc.ONE, EBlendFunc.ONE, DeviceManagerDataFromSystem);

    if (_hasLight(ambientLightCount)) {
        _drawAmbientLightPass(gl, use, drawDataMap, sendDataMap.ambientLightData, ambientLightCount, DeferAmbientLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }

    if (_hasLight(directionLightCount)) {
        _drawDirectionLightPass(gl, use, drawDataMap, sendDataMap.directionLightData, directionLightCount, DeferDirectionLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }

    if (_hasLight(pointLightCount)) {
        drawPointLightPass(gl, state, use, drawDataMap, sendDataMap.pointLightData, pointLightCount, vMatrix, pMatrix, DeferPointLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }

    unbindVao(gl);
}

const _hasLight =(count: number) => count > 0;

const _drawAmbientLightPass =(gl: any, use: Function, drawDataMap: IWebGL2DrawDataMap, ambientLightData: IWebGL2SendUniformDataAmbientLightDataMap, ambientLightCount: number, DeferAmbientLightPassDataFromSystem: any, ShaderDataFromSystem, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any) => {
    var shaderIndex: number = null;

    sendAttributeData(gl, ProgramDataFromSystem, DeferAmbientLightPassDataFromSystem);

    shaderIndex = getNoMaterialShaderIndex("DeferAmbientLightPass", ShaderDataFromSystem);

    use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

    let {
        getColorArr3,

        isColorDirty,

        AmbientLightDataFromSystem
    } = ambientLightData;

    for (let i = 0; i < ambientLightCount; i++) {
        let colorArr3: Array<number> = null,
            isColorDirtyFlag = isColorDirty(i, AmbientLightDataFromSystem);

        if (isColorDirtyFlag) {
            colorArr3 = getColorArr3(i, AmbientLightDataFromSystem);
        }

        bindAmbientLightUboData(gl, i, ambientLightData, _buildAmbientLightValueDataMap(colorArr3, isColorDirtyFlag), drawDataMap, GLSLSenderDataFromSystem);

        drawFullScreenQuad(gl, DeferAmbientLightPassDataFromSystem);
    }
}

const _buildAmbientLightValueDataMap =(colorArr3: Array<number>, isColorDirty: boolean) => {
    return {
        colorArr3: colorArr3,

        isColorDirty: isColorDirty
    }
}

const _drawDirectionLightPass =(gl: any, use: Function, drawDataMap: IWebGL2DrawDataMap, directionLightData: IWebGL2SendUniformDataDirectionLightDataMap, directionLightCount: number, DeferDirectionLightPassDataFromSystem: any, ShaderDataFromSystem, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any) => {
    var shaderIndex: number = null;

    sendAttributeData(gl, ProgramDataFromSystem, DeferDirectionLightPassDataFromSystem);

    shaderIndex = getNoMaterialShaderIndex("DeferDirectionLightPass", ShaderDataFromSystem);

    use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

    let {
        getPosition,

        getColorArr3,
        getIntensity,

        isPositionDirty,
        isColorDirty,
        isIntensityDirty,

        DirectionLightDataFromSystem
    } = directionLightData;

    for (let i = 0; i < directionLightCount; i++) {
        let position: Float32Array = null,
            colorArr3: Array<number> = null,
            intensity: number = null,
            isIntensityDirtyFlag = isIntensityDirty(i, DirectionLightDataFromSystem),
            isPositionDirtyFlag = isPositionDirty(i, DirectionLightDataFromSystem),
            isColorDirtyFlag = isColorDirty(i, DirectionLightDataFromSystem);

        if (isPositionDirtyFlag) {
            position = getPosition(i, DirectionLightDataFromSystem);
        }

        if (isColorDirtyFlag) {
            colorArr3 = getColorArr3(i, DirectionLightDataFromSystem);
        }

        if (isIntensityDirtyFlag) {
            intensity = getIntensity(i, DirectionLightDataFromSystem);
        }

        bindDirectionLightUboData(gl, i, directionLightData, _buildDirectionLightValueDataMap(position, colorArr3, intensity, isPositionDirtyFlag, isColorDirtyFlag, isIntensityDirtyFlag), drawDataMap, GLSLSenderDataFromSystem);

        drawFullScreenQuad(gl, DeferDirectionLightPassDataFromSystem);
    }
}

const _buildDirectionLightValueDataMap =(position: Float32Array, colorArr3: Array<number>, intensity: number, isPositionDirty: boolean, isColorDirty: boolean, isIntensityDirty: boolean) => {
    return {
        position: position,
        colorArr3: colorArr3,
        intensity: intensity,

        isPositionDirty: isPositionDirty,
        isColorDirty: isColorDirty,
        isIntensityDirty: isIntensityDirty
    }
}
