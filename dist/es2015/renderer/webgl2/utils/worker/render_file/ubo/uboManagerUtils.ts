import { isValidMapValue } from "../../../../../../utils/objectUtils";
import { ensureFunc, it } from "../../../../../../definition/typescript/decorator/contract";
import { UboBindingPointMap, UboMultiBufferDataList, UboSingleBufferDataList } from "../../../../type/dataType";
import { expect } from "wonder-expect.js";
import { forEach, hasDuplicateItems, isValidVal } from "../../../../../../utils/arrayUtils";
import {
    IWebGL2ShaderLibConfig,
    IWebGL2UboConfig, IWebGL2UboTypeArrayConfig
} from "../../../../../worker/webgl2/both_file/data/shaderLib_generator";
import { Log } from "../../../../../../utils/Log";
import { isConfigDataExist } from "../../../../../utils/renderConfigUtils";
import {
    bindUniformBlock, bindUniformBufferBase, bufferDynamicData, bufferStaticData,
    bufferSubDynamicData
} from "./uboUtils";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import { set } from "../../../../../../utils/typeArrayUtils";
import { CameraRenderCommandBufferForDrawData } from "../../../../../utils/worker/render_file/type/dataType";
import {
    IWebGL2AmbientLightValueDataMap,
    IWebGL2DirectionLightValueDataMap, IWebGL2SendUniformDataAmbientLightDataMap,
    IWebGL2SendUniformDataDirectionLightDataMap,
    IWebGL2SendUniformDataPointLightDataMap
} from "../interface/IUtils";
import { getMaxUniformBufferBindings } from "../device/gpuDetectUtils";
import { IWebGL2DrawDataMap, IWebGL2PointLightValueDataMap } from "../interface/IUtils";

export var init = (gl:any, render_config:IRenderConfig, {
    oneUboDataList,
    uboBindingPointMap
}) => {
    _bindOneUboData(gl, render_config, oneUboDataList, uboBindingPointMap);
}

var _bindOneUboData = (gl:any, render_config:IRenderConfig, oneUboDataList:UboSingleBufferDataList, uboBindingPointMap:UboBindingPointMap) => {
    _bindSingleBufferUboData(gl, render_config, oneUboDataList, null, uboBindingPointMap);
}

var _buildUboDataMap = (uniformBlockBinding:number, buffer:WebGLBuffer, typeArray:Float32Array) => {
    return {
        uniformBlockBinding: uniformBlockBinding,
        buffer: buffer,
        typeArray: typeArray
    };
}

var _buildUboFuncMap = (bindUniformBufferBase:Function, bufferStaticData:Function, bufferDynamicData:Function, bufferSubDynamicData:Function, set:Function) => {
    return {
        bindUniformBufferBase: bindUniformBufferBase,
        bufferStaticData: bufferStaticData,
        bufferDynamicData: bufferDynamicData,
        bufferSubDynamicData: bufferSubDynamicData,
        set: set
    }
}

var _buildGlobalRenderDataMap = (render_config:IRenderConfig) => {
    return {
        render_config: render_config
    }
}

export var bindFrameUboData = (gl:any, render_config:IRenderConfig, cameraData:CameraRenderCommandBufferForDrawData, {
    frameUboDataList,
    uboBindingPointMap
}) => {
    _bindSingleBufferUboData(gl, render_config, frameUboDataList, cameraData, uboBindingPointMap);
}

export var bindAmbientLightUboData = (gl:any, ambientLightIndex:number, sendUniformDataAmbientLightDataMap:IWebGL2SendUniformDataAmbientLightDataMap, ambientLightValueMap:IWebGL2AmbientLightValueDataMap, drawDataMap:IWebGL2DrawDataMap, {
    ambientLightUboDataList,
    uboBindingPointMap
}) => {
    _bindLightUboData(gl, ambientLightIndex, sendUniformDataAmbientLightDataMap, ambientLightValueMap, drawDataMap, ambientLightUboDataList, uboBindingPointMap);
}

export var bindDirectionLightUboData = (gl:any, directionLightIndex:number, sendUniformDataDirectionLightDataMap:IWebGL2SendUniformDataDirectionLightDataMap, directionLightValueMap:IWebGL2DirectionLightValueDataMap, drawDataMap:IWebGL2DrawDataMap, {
    directionLightUboDataList,
    uboBindingPointMap
}) => {
    _bindLightUboData(gl, directionLightIndex, sendUniformDataDirectionLightDataMap, directionLightValueMap, drawDataMap, directionLightUboDataList, uboBindingPointMap);
}

export var bindPointLightUboData = (gl:any, pointLightIndex:number, sendUniformDataPointLightDataMap:IWebGL2SendUniformDataPointLightDataMap, pointLightValueMap:IWebGL2PointLightValueDataMap, drawDataMap:IWebGL2DrawDataMap, {
    pointLightUboDataList,
    uboBindingPointMap
}) => {
    _bindLightUboData(gl, pointLightIndex, sendUniformDataPointLightDataMap, pointLightValueMap, drawDataMap, pointLightUboDataList, uboBindingPointMap);
}

var _bindLightUboData = (gl:any, lightIndex:number, sendUniformDataLightDataMap: IWebGL2SendUniformDataAmbientLightDataMap | IWebGL2SendUniformDataDirectionLightDataMap | IWebGL2SendUniformDataPointLightDataMap, lightValueMap: IWebGL2AmbientLightValueDataMap | IWebGL2DirectionLightValueDataMap | IWebGL2PointLightValueDataMap, drawDataMap:IWebGL2DrawDataMap, lightUboDataList, uboBindingPointMap) => {
    var uboFuncMap = _buildUboFuncMap(bindUniformBufferBase, bufferStaticData, bufferDynamicData, bufferSubDynamicData, set);

    forEach(lightUboDataList, ({
                                   name,
                                   typeArrays,
                                   buffers,
                                   setBufferDataFunc
                               }) => {
        var bindingPoint = uboBindingPointMap[name],
            typeArray = typeArrays[lightIndex],
            buffer = buffers[lightIndex],
            uboDataMap = _buildUboDataMap(bindingPoint, buffer, typeArray);

        setBufferDataFunc(gl, lightIndex, uboDataMap, uboFuncMap, sendUniformDataLightDataMap, lightValueMap);
    });
}

var _bindSingleBufferUboData = (gl:any, render_config:IRenderConfig, singleBufferUboDataList:UboSingleBufferDataList, cameraData:CameraRenderCommandBufferForDrawData, uboBindingPointMap:UboBindingPointMap) => {
    var uboFuncMap = _buildUboFuncMap(bindUniformBufferBase, bufferStaticData, bufferDynamicData,  bufferSubDynamicData, set),
        globalRenderDataMap = _buildGlobalRenderDataMap(render_config);

    forEach(singleBufferUboDataList, ({
                                          name,
                                          typeArray,
                                          buffer,
                                          setBufferDataFunc
                                      }) => {
        var bindingPoint = uboBindingPointMap[name],
            uboDataMap = _buildUboDataMap(bindingPoint, buffer, typeArray);

        setBufferDataFunc(gl, uboDataMap, uboFuncMap, cameraData, globalRenderDataMap);
    });
}

export var handleUboConfig = (gl: any, shaderIndex: number, program: WebGLProgram, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibConfig, initShaderDataMap:InitShaderDataMap, GLSLSenderDataFromSystem: any, GPUDetectDataFromSystem:any) => {
    forEach(materialShaderLibNameArr, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send;

        if (isConfigDataExist(sendData)) {
            if (isConfigDataExist(sendData.uniformUbo)) {
                forEach(sendData.uniformUbo, (data: IWebGL2UboConfig) => {
                    var name = data.name,
                        bindingPoint:number = null,
                        uboBindingPointMap = GLSLSenderDataFromSystem.uboBindingPointMap,
                        uboBindingPoint = uboBindingPointMap[name];

                    if (isValidMapValue(uboBindingPoint)) {
                        return;
                    }

                    bindingPoint = _setUniqueBindingPoint(name, GLSLSenderDataFromSystem, GPUDetectDataFromSystem);

                    bindUniformBlock(gl, program, name, bindingPoint);

                    _addInitedUboFuncConfig(gl, data, initShaderDataMap, GLSLSenderDataFromSystem);
                })
            }
        }
    });
}

var _setUniqueBindingPoint = ensureFunc((uboBindingPoint:number, name: string, GLSLSenderDataFromSystem: any, GPUDetectDataFromSystem:any) => {
    it("uboBindingPoint shouldn't exceed maxUniformBufferBindings", () => {
        expect(uboBindingPoint).lte(getMaxUniformBufferBindings(GPUDetectDataFromSystem));
    });
},(name: string, GLSLSenderDataFromSystem: any, GPUDetectDataFromSystem:any) => {
    var uboBindingPointMap = GLSLSenderDataFromSystem.uboBindingPointMap,
        uboBindingPoint:number = GLSLSenderDataFromSystem.uboBindingPoint;

    uboBindingPointMap[name] = uboBindingPoint;

    GLSLSenderDataFromSystem.uboBindingPoint += 1;

    return uboBindingPoint;
})

var _addInitedUboFuncConfig = ensureFunc((list: UboSingleBufferDataList | UboMultiBufferDataList) => {
    it("list shouldn't has duplicate ubo data", () => {
        expect(hasDuplicateItems(list)).false;
    });
}, (gl:any, {
    name,
    typeArray,
    setBufferDataFunc,
    frequence
}, {
        AmbientLightDataFromSystem,
        DirectionLightDataFromSystem,
        PointLightDataFromSystem
    }, GLSLSenderDataFromSystem: any) => {
    var list = null;

    switch (frequence) {
        case "one":
            list = GLSLSenderDataFromSystem.oneUboDataList;

            list.push(_createSingleBufferData(gl, name, typeArray, setBufferDataFunc));
            break;
        case "frame":
            list = GLSLSenderDataFromSystem.frameUboDataList;

            list.push(_createSingleBufferData(gl, name, typeArray, setBufferDataFunc));
            break;
        case "ambientLight":
            list = _addLightInitedUboFuncConfig(gl, GLSLSenderDataFromSystem.ambientLightUboDataList, typeArray, AmbientLightDataFromSystem.count, name, setBufferDataFunc);
            break;
        case "directionLight":
            list = _addLightInitedUboFuncConfig(gl, GLSLSenderDataFromSystem.directionLightUboDataList, typeArray, DirectionLightDataFromSystem.count, name, setBufferDataFunc);
            break;
        case "pointLight":
            list = _addLightInitedUboFuncConfig(gl, GLSLSenderDataFromSystem.pointLightUboDataList, typeArray, PointLightDataFromSystem.count, name, setBufferDataFunc);
            break;
        default:
            Log.error(Log.info.FUNC_UNKNOW(`frequence: ${frequence}`));
            break;
    }

    return list;
})

var _addLightInitedUboFuncConfig = (gl:any, list:UboMultiBufferDataList, typeArray:IWebGL2UboTypeArrayConfig, lightCount:number, name:string, setBufferDataFunc:Function) => {
    var buffers:Array<WebGLBuffer> = [],
        typeArrays:Array<Float32Array> = [];

    for(let i = 0; i < lightCount; i++){
        typeArrays.push(_createTypeArray(typeArray));
        buffers.push(gl.createBuffer());
    }

    list.push({
        name: name,
        typeArrays: typeArrays,
        buffers: buffers,
        setBufferDataFunc: setBufferDataFunc
    });

    return list;
}

var _createSingleBufferData = (gl:any, name:string, typeArray:IWebGL2UboTypeArrayConfig, setBufferDataFunc:Function) => {
    return {
        name: name,
        typeArray: _createTypeArray(typeArray),
        buffer: gl.createBuffer(),
        setBufferDataFunc: setBufferDataFunc
    };
}

var _createTypeArray = ({
                            length
                        }) => {
    return new Float32Array(length);
}
