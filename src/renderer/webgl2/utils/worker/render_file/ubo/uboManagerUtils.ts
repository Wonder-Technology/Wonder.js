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
import { WebGL2SendUniformDataPointLightDataMap } from "../../../../type/utilsType";
import { getMaxUniformBufferBindings } from "../device/gpuDetectUtils";
import { WebGL2DrawDataMap } from "../type/utilsType";

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

export var bindPointLightUboData = (gl:any, pointLightIndex:number, sendUniformDataPointLightDataMap:WebGL2SendUniformDataPointLightDataMap, drawDataMap:WebGL2DrawDataMap,  {
    lightUboDataList,
    uboBindingPointMap
}) => {
    var uboFuncMap = _buildUboFuncMap(bindUniformBufferBase, bufferStaticData, bufferDynamicData, bufferSubDynamicData, set),
        firstUboData = lightUboDataList[0],
        bindingPoint:number = null;

    if(isValidVal(firstUboData)){
        bindingPoint = uboBindingPointMap[firstUboData.name];
    }

    forEach(lightUboDataList, ({
                                   // name,
                                   typeArrays,
                                   buffers,
                                   // initBufferDataFunc,
                                   setBufferDataFunc
                               }) => {
        var typeArray = typeArrays[pointLightIndex],
            buffer = buffers[pointLightIndex],
            uboDataMap = _buildUboDataMap(bindingPoint, buffer, typeArray);

        setBufferDataFunc(gl, pointLightIndex, uboDataMap, uboFuncMap, sendUniformDataPointLightDataMap);
    });
}

var _bindSingleBufferUboData = (gl:any, render_config:IRenderConfig, singleBufferUboDataList:UboSingleBufferDataList, cameraData:CameraRenderCommandBufferForDrawData, uboBindingPointMap:UboBindingPointMap) => {
    var uboFuncMap = _buildUboFuncMap(bindUniformBufferBase, bufferStaticData, bufferDynamicData,  bufferSubDynamicData, set),
        globalRenderDataMap = _buildGlobalRenderDataMap(render_config),
        firstUboData = singleBufferUboDataList[0],
        bindingPoint:number = null;

    if(isValidVal(firstUboData)){
        bindingPoint = uboBindingPointMap[firstUboData.name];
    }

    forEach(singleBufferUboDataList, ({
                                          typeArray,
                                          buffer,
                                          setBufferDataFunc
                                      }) => {
        var uboDataMap = _buildUboDataMap(bindingPoint, buffer, typeArray);

        setBufferDataFunc(gl, uboDataMap, uboFuncMap, cameraData, globalRenderDataMap);
    });
}

export var handleUboConfig = (gl: any, shaderIndex: number, program: WebGLProgram, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibConfig, initShaderDataMap:InitShaderDataMap, GLSLSenderDataFromSystem: any, GPUDetectDataFromSystem:any) => {
    // var uboDataArr: Array<IWebGL2UboConfig> = [];

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
        case "gameObject":
            list = GLSLSenderDataFromSystem.gameObjectUboDataList;

            list.push(_createSingleBufferData(gl, name, typeArray, setBufferDataFunc));
            break;
        case "pointLight":
            let buffers:Array<WebGLBuffer> = [],
                typeArrays:Array<Float32Array> = [];

            list = GLSLSenderDataFromSystem.lightUboDataList;

            for(let i = 0, count = PointLightDataFromSystem.count; i < count; i++){
                typeArrays.push(_createTypeArray(typeArray));
                buffers.push(gl.createBuffer());
            }

            list.push({
                name: name,
                typeArrays: typeArrays,
                buffers: buffers,
                setBufferDataFunc: setBufferDataFunc
            });
            break;
        default:
            Log.error(Log.info.FUNC_UNKNOW(`frequence: ${frequence}`));
            break;
    }

    return list;
})

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