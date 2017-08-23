import {
    IBasicSendUniformDataDataMap,
    IDrawDataMap,
    ILightSendUniformDataDataMap
} from "../../../../../utils/worker/render_file/interface/IUtils";
import { SendUniformDataGLSLSenderDataMap } from "../../../../../type/utilsType";

export interface IWebGL2BasicSendUniformDataDataMap extends IBasicSendUniformDataDataMap {
}

export interface IWebGL2SendUniformDataAmbientLightDataMap {
    getColorArr3: Function;
    isColorDirty: Function;
    cleanColorDirty: Function;

    AmbientLightDataFromSystem: any;
}

export interface IWebGL2SendUniformDataDirectionLightDataMap {
    getColorArr3: Function;
    getIntensity: Function;
    getPosition: Function;
    isPositionDirty: Function;
    isColorDirty: Function;
    isIntensityDirty: Function;
    cleanPositionDirty: Function;
    cleanColorDirty: Function;
    cleanIntensityDirty: Function;

    DirectionLightDataFromSystem: any;
}

export interface IWebGL2SendUniformDataPointLightDataMap {
    getColorArr3: Function;
    getIntensity: Function;
    getConstant: Function;
    getLinear: Function;
    getQuadratic: Function;
    getPosition: Function;
    computeRadius: Function;
    isPositionDirty: Function;
    isColorDirty: Function;
    isIntensityDirty: Function;
    isAttenuationDirty: Function;
    cleanPositionDirty: Function;
    cleanColorDirty: Function;
    cleanIntensityDirty: Function;
    cleanAttenuationDirty: Function;

    PointLightDataFromSystem: any;
}

export interface IWebGL2InitShaderFuncDataMap {
    buildGLSLSource: Function;
    getGL: Function;
    getMapCount: Function;
    hasSpecularMap: Function;
    getVertices: Function;
    getNormals: Function;
    getTexCoords: Function;
    getIndices: Function;
}

export interface IWebGL2LightSendUniformDataDataMap extends ILightSendUniformDataDataMap {
    glslSenderData: SendUniformDataGLSLSenderDataMap;
    ambientLightData: IWebGL2SendUniformDataAmbientLightDataMap;
    directionLightData: IWebGL2SendUniformDataDirectionLightDataMap;
    pointLightData: IWebGL2SendUniformDataPointLightDataMap;
}

export interface IWebGL2DrawDataMap extends IDrawDataMap {
}

export interface IWebGL2AmbientLightValueDataMap {
    colorArr3: Array<number>;

    isColorDirty: boolean;
}

export interface IWebGL2DirectionLightValueDataMap {
    position: Float32Array;
    colorArr3: Array<number>;
    intensity: number;

    isPositionDirty: boolean;
    isColorDirty: boolean;
    isIntensityDirty: boolean;
}

export interface IWebGL2PointLightValueDataMap {
    position: Float32Array;
    colorArr3: Array<number>;
    intensity: number;
    constant: number;
    linear: number;
    quadratic: number;
    radius: number;

    isIntensityDirty: boolean;
    isOtherValueDirty: boolean;
}
