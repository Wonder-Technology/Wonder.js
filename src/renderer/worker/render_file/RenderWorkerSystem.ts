import { EWorkerOperateType } from "../both_file/EWorkerOperateType";
import { Log } from "../../../utils/Log";
import { ERenderWorkerState } from "../both_file/ERenderWorkerState";
import {
    initData as initGeometryWorkerData, resetPointCacheDatas, setPointCacheDatas,
    updatePointCacheDatas
} from "./geometry/GeometryWorkerSystem";
import { GeometryWorkerData } from "./geometry/GeometryWorkerData";
import { DataBufferConfig } from "../../../config/DataBufferConfig";
import { EGeometryWorkerDataOperateType } from "../../enum/EGeometryWorkerDataOperateType";
import {
    initData as initMaterialData, initMaterials,
    initNewInitedMaterials
} from "./material/MaterialWorkerSystem";
import { MaterialInitWorkerData, MaterialWorkerData } from "./material/MaterialWorkerData";
import { DeviceManagerWorkerData } from "../both_file/device/DeviceManagerWorkerData";
import { IndexBufferWorkerData } from "./buffer/IndexBufferWorkerData";
import { ArrayBufferWorkerData } from "./buffer/ArrayBufferWorkerData";
import { initGL } from "./initGL";
import { getState, setState } from "./state/StateWorkerSytem";
import { StateWorkerData } from "./state/StateWorkerData";
import { disposeBuffer as disposeArrayBuffer } from "./buffer/ArrayBufferWorkerSystem";
import { disposeBuffer as disposeIndexBuffer } from "./buffer/IndexBufferWorkerSystem";
import { initData as initProgramData } from "./shader/program/ProgramWorkerSystem";
import { initData as initArrayBufferData } from "./buffer/ArrayBufferWorkerSystem";
import { initData as initIndexBufferData } from "./buffer/IndexBufferWorkerSystem";
import {
    clearColor,
    commitGL,
    initData as initDrawRenderCommandBufferForDrawData
} from "./draw/DrawRenderCommandBufferWorkerSystem";
import { BasicMaterialWorkerData } from "./material/BasicMaterialWorkerData";
import { LightMaterialWorkerData } from "./material/LightMaterialWorkerData";
import { initState } from "../../utils/worker/render_file/state/stateUtils";
import {
    getGL, initData as initDeviceManagerData, setClearColor, setSide,
    setViewportOfGL
} from "../both_file/device/DeviceManagerWorkerSystem";
import { AmbientLightWorkerData } from "./light/AmbientLightWorkerData";
import {
    setPositionArr as setDirectionLightPositionArr
} from "./light/DirectionLightWorkerSystem";
import {
    GeometryInitWorkerData, GeometryResetWorkerData,
    GeometryUpdateWorkerData, LightDrawWorkerData, TextureInitWorkerData
} from "../../type/messageDataType";
import { setIsTest } from "./config/InitConfigWorkerSystem";
import { InitConfigWorkerData } from "./config/InitConfigWorkerData";
import { setPositionArr as setPointLightPositionArr } from "./light/PointLightWorkerSystem";
import { TextureWorkerData } from "./texture/TextureWorkerData";
import { TextureCacheWorkerData } from "./texture/TextureCacheWorkerData";
import { MapManagerWorkerData } from "./texture/MapManagerWorkerData";
import {
    disposeSourceAndGLTexture, setIndex,
    setSourceMapByImageSrcArrStream, setUniformSamplerNameMap
} from "./texture/TextureWorkerSystem";
import { callFunc, empty, fromArray } from "wonder-frp/dist/es2015/global/Operator";
import { IRenderConfig, render_config } from "../both_file/data/render_config";
import { webgl1_material_config } from "../webgl1/both_file/data/material_config";
import { webgl1_shaderLib_generator } from "../webgl1/both_file/data/shaderLib_generator";
import { Map } from "immutable";
import { IMaterialConfig } from "../../data/material_config_interface";
import { IShaderLibGenerator } from "../../data/shaderLib_generator_interface";
import {
    initData as initWebGL1ShaderData,
    initMaterialShader as initMaterialShaderWebGL1,
    initNoMaterialShader as initNoMaterialShaderWebGL1
} from "../webgl1/render_file/shader/ShaderWorkerSystem";
import { isWebgl1, setVersion } from "./device/WebGLDetectWorkerSystem";
import { WebGLDetectWorkerData } from "./device/WebGLDetectWorkerData";
import { buildInitShaderDataMap } from "../../utils/worker/render_file/material/materialUtils";
import { GBufferWorkerData } from "../webgl2/render_file/render/light/defer/gbuffer/GBufferWorkerData";
import { webgl2_material_config } from "../webgl2/both_file/data/material_config";
import { webgl2_shaderLib_generator } from "../webgl2/both_file/data/shaderLib_generator";
import {
    initData as initWebGL2ShaderData,
    initMaterialShader as initMaterialShaderWebGL2,
    initNoMaterialShader as initNoMaterialShaderWebGL2
} from "../webgl2/render_file/shader/ShaderWorkerSystem";
import { buildDrawDataMap as buildDeferDrawDataMap } from "../../webgl2/utils/worker/render_file/draw/light/defer/deferDrawRenderCommandBufferUtils";
import { initData as initLightWorkerDataWebGL2 } from "../webgl2/render_file/light/LightWorkerSystem";
import { initData as initLightWorkerDataWebGL1 } from "../webgl1/render_file/light/LightWorkerSystem";
import { WebGL2RenderInitWorkerData, WebGL2LightInitWorkerData } from "../../webgl2/type/messageDataType";
import { WebGL1LightInitWorkerData } from "../../webgl1/type/messageDataType";
import { WebGL1PointLightWorkerData } from "../webgl1/render_file/light/PointLightWorkerData";
import { WebGL2PointLightWorkerData } from "../webgl2/render_file/light/PointLightWorkerData";
import { RenderCommandBufferForDrawData } from "../../utils/worker/render_file/type/dataType";
import { detect as detectWebGL1, initData as initWebGL1GPUDetectWorkerData } from "../webgl1/render_file/device/GPUDetectWorkerSystem";
import {
    detect as detectWebGL2, initData as initWebGL2GPUDetectWorkerData
} from "../webgl2/render_file/device/GPUDetectWorkerSystem";
import { GPUDetectWorkerData } from "./device/GPUDetectWorkerData";
import { render as renderWebGL1 } from "../webgl1/render_file/render/RenderWorkerSystem";
import { BasicDrawRenderCommandBufferWorkerData } from "./draw/basic/BasicDrawRenderCommandBufferWorkerData";
import { LightDrawRenderCommandBufferWorkerData } from "./draw/light/LightDrawRenderCommandBufferWorkerData";
import { createTypeArraysOnlyOnce } from "./command_buffer/RenderCommandBufferWorkerSystem";
import { BasicRenderCommandBufferWorkerData } from "./command_buffer/BasicRenderCommandBufferWorkerData";
import { LightRenderCommandBufferWorkerData } from "./command_buffer/LightRenderCommandBufferWorkerData";
import {
    init as initWebGL2Render,
    render as renderWebGL2
} from "../webgl2/render_file/render/RenderWorkerSystem";
import { initData as initWebGL2GLSLSenderData } from "../webgl2/render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { WebGL2GLSLSenderWorkerData } from "../webgl2/render_file/shader/glslSender/GLSLSenderWorkerData";
import { initData as initWebGL1GLSLSenderData } from "../webgl1/render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { WebGL1GLSLSenderWorkerData } from "../webgl1/render_file/shader/glslSender/GLSLSenderWorkerData";
import { VaoWorkerData } from "./vao/VaoWorkerData";
import { WebGL1ProgramWorkerData } from "../webgl1/render_file/shader/program/ProgramWorkerData";
import { WebGL2ProgramWorkerData } from "../webgl2/render_file/shader/program/ProgramWorkerData";
import { buildDrawDataMap as buildWebGL1DrawDataMap } from "../../webgl1/utils/worker/render_file/render/renderUtils";
import { buildDrawDataMap as buildWebGL2DrawDataMap } from "../../webgl2/utils/worker/render_file/render/renderUtils";
import { initData as initVaoData } from "./vao/VaoWorkerSystem";
import { disposeBuffers as disposeWebGL1GeometryBuffers } from "../../webgl1/utils/worker/both_file/buffer/bufferUtils";
import { disposeBuffers as disposeWebGL2GeometryBuffers } from "../../webgl2/utils/worker/both_file/buffer/bufferUtils";
import { WebGL1LocationWorkerData } from "../webgl1/render_file/shader/location/LocationWorkerData";
import { WebGL2LocationWorkerData } from "../webgl2/render_file/shader/location/LocationWorkerData";
import { initData as initWebGL1LocationData } from "../webgl1/render_file/shader/location/LocationWorkerSystem";
import { initData as initWebGL2LocationData } from "../webgl2/render_file/shader/location/LocationWorkerSystem";
import { WebGL1ShaderWorkerData } from "../webgl1/render_file/shader/ShaderWorkerData";
import { WebGL2ShaderWorkerData } from "../webgl2/render_file/shader/ShaderWorkerData";
import { initData as initDeferLightPassData } from "../webgl2/render_file/render/light/defer/light/DeferLightPassWorkerSystem";
import { WebGL1DirectionLightWorkerData } from "../webgl1/render_file/light/DirectionLightWorkerData";
import { WebGL2DirectionLightWorkerData } from "../webgl2/render_file/light/DirectionLightWorkerData";
import { DeferDirectionLightPassWorkerData } from "../webgl2/render_file/render/light/defer/light/DeferDirectionLightPassWorkerData";
import { DeferPointLightPassWorkerData } from "../webgl2/render_file/render/light/defer/light/DeferPointLightPassWorkerData";
import { DeferAmbientLightPassWorkerData } from "../webgl2/render_file/render/light/defer/light/DeferAmbientLightPassWorkerData";

declare var self: any;

export var onerrorHandler = (msg: string, fileName: string, lineno: number) => {
    Log.error(true, `message:${msg}\nfileName:${fileName}\nlineno:${lineno}`)
}

export var onmessageHandler = (e) => {
    var data = e.data,
        operateType = data.operateType,
        state: Map<any, any> = null;

    switch (operateType) {
        case EWorkerOperateType.INIT_CONFIG:
            setIsTest(data.isTest, InitConfigWorkerData).run();
            break;
        case EWorkerOperateType.INIT_DATA:
            setVersion(data.webglVersion, WebGLDetectWorkerData);
            break;
        case EWorkerOperateType.INIT_GL:
            initDataWhenInitGL();

            if (isWebgl1(WebGLDetectWorkerData)) {
                state = _initWebGL1GL(data, WebGLDetectWorkerData, GPUDetectWorkerData);
            }
            else {
                state = _initWebGL2GL(data, WebGLDetectWorkerData, GPUDetectWorkerData);
            }

            setState(state, StateWorkerData);

            initState(state, getGL, setSide, DeviceManagerWorkerData);
            break;
        case EWorkerOperateType.INIT_VIEWPORT:
            setState(setViewportOfGL(DeviceManagerWorkerData, data.viewportData, getState(StateWorkerData)).run(), StateWorkerData);
            break;
        case EWorkerOperateType.INIT_CLEARCOLOR:
            setClearColor(getGL(DeviceManagerWorkerData, getState(StateWorkerData)), data.clearColorArr4, DeviceManagerWorkerData);
            break;
        case EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE:
            if (isWebgl1(WebGLDetectWorkerData)) {
                _handleWebGL1InitRenderData(data, AmbientLightWorkerData, WebGL1DirectionLightWorkerData, WebGL1PointLightWorkerData, WebGL1GLSLSenderWorkerData);
            }
            else {
                _handleWebGL2InitRenderData(data, render_config, AmbientLightWorkerData, WebGL2DirectionLightWorkerData, WebGL2PointLightWorkerData, GPUDetectWorkerData, WebGL2GLSLSenderWorkerData);
            }
            break;
        case EWorkerOperateType.DRAW:
            if (isWebgl1(WebGLDetectWorkerData)) {
                _handleWebGL1Draw(data, AmbientLightWorkerData, WebGL1DirectionLightWorkerData, WebGL1PointLightWorkerData, WebGL1GLSLSenderWorkerData, GPUDetectWorkerData, StateWorkerData);
            }
            else {
                _handleWebGL2Draw(data, AmbientLightWorkerData, WebGL2DirectionLightWorkerData, WebGL2PointLightWorkerData, WebGL2GLSLSenderWorkerData, GPUDetectWorkerData, StateWorkerData);
            }
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW(`operateType:${operateType}`));
            break;
    }
};

var _initWebGL1GL = (data: any, WebGLDetectWorkerData: any, GPUDetectWorkerData: any) => {
    return initGL(data, detectWebGL1, WebGLDetectWorkerData, GPUDetectWorkerData).run();
}

var _initWebGL2GL = (data: any, WebGLDetectWorkerData: any, GPUDetectWorkerData: any) => {
    return initGL(data, detectWebGL2, WebGLDetectWorkerData, GPUDetectWorkerData).run();
}

var _handleWebGL1Draw = (data: any, AmbientLightWorkerData: any, DirectionLightWorkerData: any, PointLightWorkerData: any, GLSLSenderWorkerData, GPUDetectWorkerData: any, StateWorkerData: any) => {
    var state = getState(StateWorkerData);

    _initWebGL1DrawData(data, DirectionLightWorkerData, PointLightWorkerData);

    let drawDataMap = buildWebGL1DrawDataMap(DeviceManagerWorkerData, TextureWorkerData, TextureCacheWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, WebGL1ProgramWorkerData, WebGL1LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, ArrayBufferWorkerData, IndexBufferWorkerData, BasicDrawRenderCommandBufferWorkerData, LightDrawRenderCommandBufferWorkerData),
        gl = getGL(drawDataMap.DeviceManagerDataFromSystem, state),
        bufferData = data.renderCommandBufferData;

    clearColor(state, render_config, drawDataMap.DeviceManagerDataFromSystem);

    if (_isBufferDataExist(bufferData)) {
        bufferData = createTypeArraysOnlyOnce(bufferData, DataBufferConfig, BasicRenderCommandBufferWorkerData, LightRenderCommandBufferWorkerData);

        renderWebGL1(gl, state, render_config, webgl1_material_config, webgl1_shaderLib_generator, DataBufferConfig, initMaterialShaderWebGL1, drawDataMap, buildInitShaderDataMap(DeviceManagerWorkerData, WebGL1ProgramWorkerData, WebGL1LocationWorkerData, GLSLSenderWorkerData, WebGL1ShaderWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, GPUDetectWorkerData, VaoWorkerData), bufferData);
    }

    commitGL(gl, state);

    self.postMessage({
        state: ERenderWorkerState.DRAW_COMPLETE
    });
}

var _handleWebGL2Draw = (data: any, AmbientLightWorkerData: any, DirectionLightWorkerData: any, PointLightWorkerData: any, GLSLSenderWorkerData, GPUDetectWorkerData: any, StateWorkerData: any) => {
    var state = getState(StateWorkerData);

    _initWebGL2DrawData(data, DirectionLightWorkerData, PointLightWorkerData);

    let drawDataMap = buildWebGL2DrawDataMap(DeviceManagerWorkerData, TextureWorkerData, TextureCacheWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, WebGL2ProgramWorkerData, WebGL2LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, BasicDrawRenderCommandBufferWorkerData, LightDrawRenderCommandBufferWorkerData),
        gl = getGL(drawDataMap.DeviceManagerDataFromSystem, state),
        bufferData = data.renderCommandBufferData;

    clearColor(state, render_config, drawDataMap.DeviceManagerDataFromSystem);

    if (_isBufferDataExist(bufferData)) {
        bufferData = createTypeArraysOnlyOnce(bufferData, DataBufferConfig, BasicRenderCommandBufferWorkerData, LightRenderCommandBufferWorkerData);

        renderWebGL2(gl, state, render_config, webgl2_material_config, webgl2_shaderLib_generator, DataBufferConfig, initMaterialShaderWebGL2, drawDataMap, buildDeferDrawDataMap(GBufferWorkerData, DeferAmbientLightPassWorkerData, DeferDirectionLightPassWorkerData, DeferPointLightPassWorkerData), buildInitShaderDataMap(DeviceManagerWorkerData, WebGL2ProgramWorkerData, WebGL2LocationWorkerData, GLSLSenderWorkerData, WebGL2ShaderWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, GPUDetectWorkerData, VaoWorkerData), bufferData);
    }

    commitGL(gl, state);

    self.postMessage({
        state: ERenderWorkerState.DRAW_COMPLETE
    });
}

var _initWebGL1DrawData = (data: any, DirectionLightWorkerData: any, PointLightWorkerData: any, ) => {
    _initOtherDrawData(data, DirectionLightWorkerData, PointLightWorkerData);
    _initWebGL1DisposeDrawData(data);
}

var _initWebGL2DrawData = (data: any, DirectionLightWorkerData: any, PointLightWorkerData: any, ) => {
    _initOtherDrawData(data, DirectionLightWorkerData, PointLightWorkerData);
    _initWebGL2DisposeDrawData(data);
}

var _initOtherDrawData = (data: any, DirectionLightWorkerData: any, PointLightWorkerData: any, ) => {
    var state = null,
        geometryData = data.geometryData,
        materialData = data.materialData,
        lightData = data.lightData;

    if (geometryData !== null) {
        if (_needUpdateGeometryWorkerData(geometryData)) {
            updatePointCacheDatas(geometryData.verticesInfoList, geometryData.normalsInfoList, geometryData.texCoordsInfoList, geometryData.indicesInfoList, GeometryWorkerData);
        }
        else if (_needResetGeometryWorkerData(geometryData)) {
            resetPointCacheDatas(geometryData.verticesInfoList, geometryData.normalsInfoList, geometryData.texCoordsInfoList, geometryData.indicesInfoList, GeometryWorkerData);
        }
    }

    if (materialData !== null) {
        initNewInitedMaterials(materialData.workerInitList);
    }

    if (lightData !== null) {
        _setLightDrawData(lightData, DirectionLightWorkerData, PointLightWorkerData);
    }
}

var _initWebGL1DisposeDrawData = (data: any) => {
    var state = null,
        disposeData = data.disposeData;

    if (disposeData !== null) {
        if (disposeData.geometryDisposeData !== null) {
            disposeWebGL1GeometryBuffers(disposeData.geometryDisposeData.disposedGeometryIndexArray, disposeArrayBuffer, disposeIndexBuffer, GPUDetectWorkerData, VaoWorkerData, ArrayBufferWorkerData, IndexBufferWorkerData, DeviceManagerWorkerData);
        }

        if (disposeData.textureDisposeData !== null) {
            disposeSourceAndGLTexture(disposeData.textureDisposeData, getGL(DeviceManagerWorkerData, getState(StateWorkerData)), TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData);
        }
    }
}

var _initWebGL2DisposeDrawData = (data: any) => {
    var state = null,
        disposeData = data.disposeData;

    if (disposeData !== null) {
        if (disposeData.geometryDisposeData !== null) {
            disposeWebGL2GeometryBuffers(disposeData.geometryDisposeData.disposedGeometryIndexArray, DeviceManagerWorkerData, VaoWorkerData);
        }

        if (disposeData.textureDisposeData !== null) {
            disposeSourceAndGLTexture(disposeData.textureDisposeData, getGL(DeviceManagerWorkerData, getState(StateWorkerData)), TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData);
        }
    }
}

var _isBufferDataExist = (bufferData: RenderCommandBufferForDrawData) => !!bufferData;

var _handleWebGL1InitRenderData = (data: any, AmbientLightWorkerData: any, DirectionLightWorkerData, PointLightWorkerData: any, GLSLSenderWorkerData: any) => {
    var state = getState(StateWorkerData),
        gl = getGL(DeviceManagerWorkerData, state);

    fromArray([
        _initWebGL1Lights(data.lightData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData),
        _initMaterialData(getGL(DeviceManagerWorkerData, state), data.materialData, data.textureData, MapManagerWorkerData, TextureCacheWorkerData, TextureWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData),
        _initGeometrys(data.geometryData, DataBufferConfig, GeometryWorkerData)
    ]).mergeAll()
        .concat(
        _initTextures(data.textureData, TextureWorkerData),
        _initMaterials(state, getGL(DeviceManagerWorkerData, state), webgl1_material_config, webgl1_shaderLib_generator, initNoMaterialShaderWebGL1, data.materialData, data.textureData, TextureWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, GPUDetectWorkerData, GLSLSenderWorkerData, WebGL1ProgramWorkerData, VaoWorkerData, WebGL1LocationWorkerData, WebGL1ShaderWorkerData)
        )
        .subscribe(null, null, () => {
            self.postMessage({
                state: ERenderWorkerState.INIT_COMPLETE
            });
        })
}

var _handleWebGL2InitRenderData = (data: any, render_config: IRenderConfig, AmbientLightWorkerData: any, DirectionLightWorkerData, PointLightWorkerData: any, GPUDetectWorkerData: any, GLSLSenderWorkerData: any) => {
    var state = getState(StateWorkerData),
        gl = getGL(DeviceManagerWorkerData, state),
        renderData = data.renderData;

    fromArray([
        _initWebGL2Lights(data.lightData, DirectionLightWorkerData, PointLightWorkerData),
        _initMaterialData(getGL(DeviceManagerWorkerData, state), data.materialData, data.textureData, MapManagerWorkerData, TextureCacheWorkerData, TextureWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData),
        _initGeometrys(data.geometryData, DataBufferConfig, GeometryWorkerData)
    ]).mergeAll()
        .concat(
        _initTextures(data.textureData, TextureWorkerData),
        _initMaterials(state, getGL(DeviceManagerWorkerData, state), webgl2_material_config, webgl2_shaderLib_generator, initNoMaterialShaderWebGL2, data.materialData, data.textureData, TextureWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, GPUDetectWorkerData, GLSLSenderWorkerData, WebGL2ProgramWorkerData, VaoWorkerData, WebGL2LocationWorkerData, WebGL2ShaderWorkerData),
        _initWebGL2Render(gl, render_config, renderData, DataBufferConfig, GBufferWorkerData, DeferAmbientLightPassWorkerData, DeferDirectionLightPassWorkerData, DeferPointLightPassWorkerData, WebGL2ShaderWorkerData, WebGL2ProgramWorkerData, WebGL2LocationWorkerData, GLSLSenderWorkerData, GPUDetectWorkerData)
        )
        .subscribe(null, null, () => {
            self.postMessage({
                state: ERenderWorkerState.INIT_COMPLETE
            });
        })
}

var _initWebGL2Render = (gl: any, render_config: IRenderConfig, renderData: WebGL2RenderInitWorkerData, DataBufferConfig: any, GBufferWorkerData: any, DeferAmbientLightPassWorkerData: any, DeferDirectionLightPassWorkerData: any, DeferPointLightPassWorkerData: any, ShaderWorkerData: any, ProgramWorkerData: any, LocationWorkerData: any, GLSLSenderWorkerData: any, GPUDetectWorkerData: any) => {
    return callFunc(() => {
        if (_isDataNotExist(renderData) || _isDataNotExist(renderData.deferShading) || renderData.deferShading.isInit === false) {
            return;
        }

        initWebGL2Render(gl, render_config, DataBufferConfig, GBufferWorkerData, DeferAmbientLightPassWorkerData, DeferDirectionLightPassWorkerData, DeferPointLightPassWorkerData, ShaderWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GPUDetectWorkerData);
    })
}

var _isDataNotExist = (data: any) => data === null || data === void 0;

export var initDataWhenInitGL = () => {
    _initData();

    if (isWebgl1(WebGLDetectWorkerData)) {
        _initWebGL1Data();
    }
    else {
        _initWebGL2Data();
    }
}



var _initData = () => {
    initDrawRenderCommandBufferForDrawData(BasicDrawRenderCommandBufferWorkerData, LightDrawRenderCommandBufferWorkerData);

    initVaoData(VaoWorkerData);

    initDeviceManagerData(DeviceManagerWorkerData);
}

var _initWebGL1Data = () => {
    initProgramData(WebGL1ProgramWorkerData);

    initWebGL1LocationData(WebGL1LocationWorkerData);

    initWebGL1GLSLSenderData(WebGL1GLSLSenderWorkerData);

    initArrayBufferData(ArrayBufferWorkerData);

    initIndexBufferData(IndexBufferWorkerData);

    initWebGL1ShaderData(WebGL1ShaderWorkerData);

    initWebGL1GPUDetectWorkerData(GPUDetectWorkerData);
}

var _initWebGL2Data = () => {
    initProgramData(WebGL2ProgramWorkerData);

    initWebGL2LocationData(WebGL2LocationWorkerData);

    initWebGL2GLSLSenderData(WebGL2GLSLSenderWorkerData);

    initWebGL2ShaderData(WebGL2ShaderWorkerData);

    initDeferLightPassData(DeferAmbientLightPassWorkerData, DeferDirectionLightPassWorkerData, DeferPointLightPassWorkerData);

    initWebGL2GPUDetectWorkerData(GPUDetectWorkerData);
}

var _needUpdateGeometryWorkerData = (geometryData: GeometryUpdateWorkerData) => {
    return geometryData.type === EGeometryWorkerDataOperateType.ADD;
}

var _needResetGeometryWorkerData = (geometryData: GeometryResetWorkerData) => {
    return geometryData.type === EGeometryWorkerDataOperateType.RESET;
}

var _initMaterials = (state: Map<any, any>, gl: WebGLRenderingContext, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initNoMaterialShader: Function, materialData: MaterialInitWorkerData, textureData: TextureInitWorkerData, TextureWorkerData: any, AmbientLightWorkerData: any, DirectionLightWorkerData, PointLightWorkerData: any, GPUDetectWorkerData: any, GLSLSenderWorkerData: any, ProgramWorkerData: any, VaoWorkerData: any, LocationWorkerData: any, ShaderWorkerData: any) => {
    return callFunc(() => {
        if (_isDataNotExist(materialData)) {
            return;
        }

        if (textureData !== null) {
            setIndex(textureData.index, TextureWorkerData);
        }

        initMaterials(state, gl, material_config, shaderLib_generator, initNoMaterialShader, materialData.basicMaterialData, materialData.lightMaterialData, TextureWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, GPUDetectWorkerData, GLSLSenderWorkerData, ProgramWorkerData, VaoWorkerData, LocationWorkerData, ShaderWorkerData);
    })
}

var _initMaterialData = (gl: WebGLRenderingContext, materialData: MaterialInitWorkerData, textureData: TextureInitWorkerData, MapManagerWorkerData: any, TextureCacheWorkerData: any, TextureWorkerData: any, MaterialWorkerData: any, BasicMaterialWorkerData: any, LightMaterialWorkerData: any) => {
    return callFunc(() => {
        if (_isDataNotExist(materialData)) {
            return;
        }

        initMaterialData(materialData, textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData);
    })
}

var _initGeometrys = (geometryData: GeometryInitWorkerData, DataBufferConfig: any, GeometryWorkerData: any) => {
    return callFunc(() => {
        if (_isDataNotExist(geometryData)) {
            return;
        }

        initGeometryWorkerData(geometryData.buffer, geometryData.indexType, geometryData.indexTypeSize, DataBufferConfig, GeometryWorkerData);

        setPointCacheDatas(geometryData.verticesInfoList, geometryData.normalsInfoList, geometryData.texCoordsInfoList, geometryData.indicesInfoList, GeometryWorkerData);
    })
}

var _initWebGL1Lights = (lightData: WebGL1LightInitWorkerData, AmbientLightWorkerData: any, DirectionLightWorkerData: any, PointLightWorkerData: any) => {
    return callFunc(() => {
        if (_isDataNotExist(lightData)) {
            return;
        }

        initLightWorkerDataWebGL1(lightData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData);
    })
}

var _initWebGL2Lights = (lightData: WebGL2LightInitWorkerData, DirectionLightWorkerData: any, PointLightWorkerData: any) => {
    return callFunc(() => {
        if (_isDataNotExist(lightData)) {
            return;
        }

        initLightWorkerDataWebGL2(lightData, DirectionLightWorkerData, PointLightWorkerData);
    })
}

var _setLightDrawData = (lightData: LightDrawWorkerData, DirectionLightWorkerData: any, PointLightWorkerData: any) => {
    var directionLightData = lightData.directionLightData,
        pointLightData = lightData.pointLightData;

    setDirectionLightPositionArr(directionLightData.positionArr, DirectionLightWorkerData);
    setPointLightPositionArr(pointLightData.positionArr, PointLightWorkerData);
}

var _initTextures = (textureData: TextureInitWorkerData, TextureWorkerData: any) => {
    if (_isDataNotExist(textureData)) {
        return empty();
    }

    setUniformSamplerNameMap(textureData.uniformSamplerNameMap, TextureWorkerData);

    return setSourceMapByImageSrcArrStream(textureData.imageSrcIndexArr, TextureWorkerData);
}
