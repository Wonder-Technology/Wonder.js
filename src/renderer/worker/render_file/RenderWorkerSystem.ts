import { EWorkerOperateType } from "../both_file/EWorkerOperateType";
import { Log } from "../../../utils/Log";
import { DrawRenderCommandBufferWorkerData } from "./draw/DrawRenderCommandBufferWorkerData";
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
import { ProgramWorkerData } from "./shader/program/ProgramWorkerData";
import { LocationWorkerData } from "./shader/location/LocationWorkerData";
import { GLSLSenderWorkerData } from "./shader/glslSender/GLSLSenderWorkerData";
import { IndexBufferWorkerData } from "./buffer/IndexBufferWorkerData";
import { ArrayBufferWorkerData } from "./buffer/ArrayBufferWorkerData";
import { buildDrawDataMap } from "../../utils/draw/drawRenderCommandBufferUtils";
import { initGL } from "./initGL";
import { getState, setState } from "./state/StateSytem";
import { StateData } from "./state/StateData";
import { disposeGeometryBuffers } from "../both_file/buffer/BufferSystem";
import { disposeBuffer as disposeArrayBuffer } from "./buffer/ArrayBufferWorkerSystem";
import { disposeBuffer as disposeIndexBuffer } from "./buffer/IndexBufferWorkerSystem";
import { initData as initProgramWorkerData } from "./shader/program/ProgramWorkerSystem";
import { initData as initLocationWorkerData } from "./shader/location/LocationWorkerSystem";
import { initData as initGLSLSenderWorkerData } from "./shader/glslSender/GLSLSenderWorkerSystem";
import { initData as initArrayBufferData } from "./buffer/ArrayBufferWorkerSystem";
import { initData as initIndexBufferData } from "./buffer/IndexBufferWorkerSystem";
import {
    clearColor,
    commitGL,
    initData as initDrawRenderCommandBufferForDrawData
} from "./draw/DrawRenderCommandBufferWorkerSystem";
import { BasicMaterialWorkerData } from "./material/BasicMaterialWorkerData";
import { LightMaterialWorkerData } from "./material/LightMaterialWorkerData";
import { initState } from "../../utils/state/stateUtils";
import { getGL, setSide } from "../both_file/device/DeviceManagerWorkerSystem";
import { AmbientLightWorkerData } from "./light/AmbientLightWorkerData";
import {
    setPositionArr as setDirectionLightPositionArr
} from "./light/DirectionLightWorkerSystem";
import { DirectionLightWorkerData } from "./light/DirectionLightWorkerData";
import {
    GeometryInitWorkerData, GeometryResetWorkerData,
    GeometryUpdateWorkerData, LightDrawWorkerData, TextureInitWorkerData
} from "../../type/messageDataType";
// import { PointLightWorkerData } from "./light/PointLightWorkerData";
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
import { initData as initShaderData } from "./shader/ShaderWorkerSystem";
import { ShaderWorkerData } from "./shader/ShaderWorkerData";
import { draw as frontDraw } from "../webgl1/render_file/front/FrontRenderWorkerSystem";
import { render_config } from "../both_file/data/render_config";
import { webgl1_material_config } from "../webgl1/both_file/data/material_config";
import { webgl1_shaderLib_generator } from "../webgl1/both_file/data/shaderLib_generator";
import { Map } from "immutable";
import { IMaterialConfig } from "../../data/material_config";
import { IShaderLibGenerator } from "../../data/shaderLib_generator";
import { initMaterialShader as initMaterialShaderWebGL1, initNoMaterialShader as initNoMaterialShaderWebGL1  } from "../webgl1/render_file/shader/ShaderWorkerSystem";
import { isWebgl1, setVersion } from "./device/WebGLDetectWorkerSystem";
import { WebGLDetectWorkerData } from "./device/WebGLDetectWorkerData";
import { buildInitShaderDataMap } from "../../utils/material/materialUtils";
import { init as initDeferUtils } from "../../webgl2/utils/render/light/defer/deferShadingUtils";
import { GBufferWorkerData } from "../webgl2/render_file/defer/gbuffer/GBufferWorkerData";
import { DeferLightPassWorkerData } from "../webgl2/render_file/defer/light/DeferLightPassWorkerData";
import { draw as deferDraw } from "../webgl2/render_file/defer/DeferShadingWorkerSystem";
import { webgl2_material_config } from "../webgl2/both_file/data/material_config";
import { webgl2_shaderLib_generator } from "../webgl2/both_file/data/shaderLib_generator";
import {
    initMaterialShader as initMaterialShaderWebGL2,
    initNoMaterialShader as initNoMaterialShaderWebGL2
} from "../webgl2/render_file/shader/ShaderWorkerSystem";
import { buildDrawDataMap as buildDeferDrawDataMap } from "../../webgl2/utils/draw/light/defer/deferDrawRenderCommandBufferUtils";
import { initData as initLightWorkerDataWebGL2 } from "../webgl2/render_file/light/LightWorkerSystem";
import { initData as initLightWorkerDataWebGL1 } from "../webgl1/render_file/light/LightWorkerSystem";
import { WebGL2RenderInitWorkerData, WebGL2LightInitWorkerData } from "../../webgl2/type/messageDataType";
import { WebGL1LightInitWorkerData } from "../../webgl1/type/messageDataType";
import { WebGL1PointLightWorkerData } from "../webgl1/render_file/light/PointLightWorkerData";
import { WebGL2PointLightWorkerData } from "../webgl2/render_file/light/PointLightWorkerData";
import { RenderCommandBufferForDrawData } from "../../type/dataType";
import { detect as detectWebGL1 } from "../webgl1/render_file/device/GPUDetectWorkerSystem";
import {
    detect as detectWebGL2,
    hasExtensionColorBufferFloat
} from "../webgl2/render_file/device/GPUDetectWorkerSystem";
import { GPUDetectWorkerData } from "./device/GPUDetectWorkerData";

export var onerrorHandler = (msg: string, fileName: string, lineno: number) => {
    Log.error(true, `message:${msg}\nfileName:${fileName}\nlineno:${lineno}`)
}

export var onmessageHandler = (e) => {
    var data = e.data,
        operateType = data.operateType,
        state:Map<any, any> = null;

    switch (operateType) {
        case EWorkerOperateType.INIT_CONFIG:
            setIsTest(data.isTest, InitConfigWorkerData).run();
            break;
        case EWorkerOperateType.INIT_DATA:
            setVersion(data.webglVersion, WebGLDetectWorkerData);
            break;
        case EWorkerOperateType.INIT_GL:
            _initData();

            if(isWebgl1(WebGLDetectWorkerData)) {
                state = _initWebGL1GL(data, WebGLDetectWorkerData, GPUDetectWorkerData);
            }
            else{
                state = _initWebGL2GL(data, WebGLDetectWorkerData, GPUDetectWorkerData);
            }

            setState(state, StateData);

            initState(state, getGL, setSide, DeviceManagerWorkerData);
            break;
        case EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE:
            if(isWebgl1(WebGLDetectWorkerData)) {
                _handleWebGL1InitRenderData(data, WebGL1PointLightWorkerData);
            }
            else{
                _handleWebGL2InitRenderData(data, WebGL2PointLightWorkerData, GPUDetectWorkerData);
            }
            break;
        case EWorkerOperateType.DRAW:
            if(isWebgl1(WebGLDetectWorkerData)) {
                _handleDraw(data, WebGL1PointLightWorkerData, GPUDetectWorkerData);
            }
            else{
                _handleDraw(data, WebGL2PointLightWorkerData, GPUDetectWorkerData);
            }
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW(`operateType:${operateType}`));
            break;
    }
};

var _initWebGL1GL = (data:any, WebGLDetectWorkerData:any, GPUDetectWorkerData:any) => {
    return initGL(data, detectWebGL1, WebGLDetectWorkerData, GPUDetectWorkerData).run();
}

var _initWebGL2GL = (data:any, WebGLDetectWorkerData:any, GPUDetectWorkerData:any) => {
    return initGL(data, detectWebGL2, WebGLDetectWorkerData, GPUDetectWorkerData).run();
}

var _handleDraw = (data:any, PointLightWorkerData:any, GPUDetectWorkerData:any) => {
    var state = null,
        geometryData = data.geometryData,
        disposeData = data.disposeData,
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

    if (disposeData !== null) {
        if (disposeData.geometryDisposeData !== null) {
            disposeGeometryBuffers(disposeData.geometryDisposeData.disposedGeometryIndexArray, ArrayBufferWorkerData, IndexBufferWorkerData, disposeArrayBuffer, disposeIndexBuffer);
        }

        if (disposeData.textureDisposeData !== null) {
            disposeSourceAndGLTexture(disposeData.textureDisposeData, getGL(DeviceManagerWorkerData, getState(StateData)), TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData);
        }
    }

    if (lightData !== null) {
        _setLightDrawData(lightData, DirectionLightWorkerData, PointLightWorkerData);
    }

    let drawDataMap = buildDrawDataMap(DeviceManagerWorkerData, TextureWorkerData, TextureCacheWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, ArrayBufferWorkerData, IndexBufferWorkerData, DrawRenderCommandBufferWorkerData),
        gl = getGL(drawDataMap.DeviceManagerDataFromSystem, state),
        bufferData = data.renderCommandBufferData;

    clearColor(state, render_config, drawDataMap.DeviceManagerDataFromSystem);

    if (_isBufferDataExist(bufferData)) {
        if (isWebgl1(WebGLDetectWorkerData)) {
            frontDraw(gl, state, render_config, webgl1_material_config, webgl1_shaderLib_generator, DataBufferConfig, initMaterialShaderWebGL1, drawDataMap, buildInitShaderDataMap(DeviceManagerWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, ShaderWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, DirectionLightWorkerData, PointLightWorkerData, GPUDetectWorkerData), bufferData);
        }
        else {
            deferDraw(state, render_config, webgl2_material_config, webgl2_shaderLib_generator, DataBufferConfig, initMaterialShaderWebGL2, buildDrawDataMap(DeviceManagerWorkerData, TextureWorkerData, TextureCacheWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, ArrayBufferWorkerData, IndexBufferWorkerData, DrawRenderCommandBufferWorkerData), buildDeferDrawDataMap(GBufferWorkerData, DeferLightPassWorkerData), buildInitShaderDataMap(DeviceManagerWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, ShaderWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, DirectionLightWorkerData, PointLightWorkerData, GPUDetectWorkerData), bufferData);
        }
    }

    commitGL(gl, state);

    self.postMessage({
        state: ERenderWorkerState.DRAW_COMPLETE
    });
}

var _isBufferDataExist = (bufferData: RenderCommandBufferForDrawData) => !!bufferData;

var _handleWebGL1InitRenderData = (data:any, PointLightWorkerData:any) => {
    var state = getState(StateData),
        gl = getGL(DeviceManagerWorkerData, state);

    fromArray([
        _initWebGL1Lights(data.lightData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData),
        _initMaterialData(getGL(DeviceManagerWorkerData, state), data.materialData, data.textureData, MapManagerWorkerData, TextureCacheWorkerData, TextureWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData),
        _initGeometrys(data.geometryData, DataBufferConfig, GeometryWorkerData)
    ]).mergeAll()
        .concat(
            _initTextures(data.textureData, TextureWorkerData),
            _initMaterials(state, getGL(DeviceManagerWorkerData, state), webgl1_material_config, webgl1_shaderLib_generator, initNoMaterialShaderWebGL1, data.materialData, data.textureData, TextureWorkerData, WebGL1PointLightWorkerData)
        )
        .subscribe(null, null, () => {
            self.postMessage({
                state: ERenderWorkerState.INIT_COMPLETE
            });
        })
}

var _handleWebGL2InitRenderData = (data:any, PointLightWorkerData:any, GPUDetectWorkerData:any) => {
    var state = getState(StateData),
        gl = getGL(DeviceManagerWorkerData, state),
        renderData = data.renderData;

    //todo refactor(repeat code)
    fromArray([
        _initWebGL2Lights(data.lightData, PointLightWorkerData),
        _initMaterialData(getGL(DeviceManagerWorkerData, state), data.materialData, data.textureData, MapManagerWorkerData, TextureCacheWorkerData, TextureWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData),
        _initGeometrys(data.geometryData, DataBufferConfig, GeometryWorkerData)
    ]).mergeAll()
        .concat(
            _initTextures(data.textureData, TextureWorkerData),
            _initMaterials(state, getGL(DeviceManagerWorkerData, state), webgl2_material_config, webgl2_shaderLib_generator, initNoMaterialShaderWebGL2, data.materialData, data.textureData, TextureWorkerData, PointLightWorkerData),
            _initDefer(gl, renderData, DataBufferConfig, GBufferWorkerData, DeferLightPassWorkerData, ShaderWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GPUDetectWorkerData)
        )
        .subscribe(null, null, () => {
            self.postMessage({
                state: ERenderWorkerState.INIT_COMPLETE
            });
        })
}

var _initDefer = (gl:any, renderData:WebGL2RenderInitWorkerData, DataBufferConfig:any, GBufferWorkerData: any, DeferLightPassWorkerData: any, ShaderWorkerData: any, ProgramWorkerData: any, LocationWorkerData: any, GLSLSenderWorkerData: any, GPUDetectWorkerData:any) => {
    return callFunc(() => {
        if (_isDataNotExist(renderData) || _isDataNotExist(renderData.deferShading) || renderData.deferShading.isInit === false) {
            return;
        }

        if(!hasExtensionColorBufferFloat(GPUDetectWorkerData)){
            Log.error(true, "defer shading need support extensionColorBufferFloat extension");
        }
        else{
            initDeferUtils(gl, DataBufferConfig, GBufferWorkerData, DeferLightPassWorkerData, ShaderWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData);
        }
    })
}

var _isDataNotExist = (data:any) => data === null || data === void 0;

var _initData = () => {
    initProgramWorkerData(ProgramWorkerData);

    initLocationWorkerData(LocationWorkerData);

    initGLSLSenderWorkerData(GLSLSenderWorkerData);

    initArrayBufferData(ArrayBufferWorkerData);

    initIndexBufferData(IndexBufferWorkerData);

    initDrawRenderCommandBufferForDrawData(DrawRenderCommandBufferWorkerData);

    initShaderData(ShaderWorkerData);
}

var _needUpdateGeometryWorkerData = (geometryData: GeometryUpdateWorkerData) => {
    return geometryData.type === EGeometryWorkerDataOperateType.ADD;
}

var _needResetGeometryWorkerData = (geometryData: GeometryResetWorkerData) => {
    return geometryData.type === EGeometryWorkerDataOperateType.RESET;
}

var _initMaterials = (state: Map<any, any>, gl: WebGLRenderingContext, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, initNoMaterialShader:Function, materialData: MaterialInitWorkerData, textureData: TextureInitWorkerData, TextureWorkerData: any, PointLightWorkerData:any) => {
    return callFunc(() => {
        if (_isDataNotExist(materialData)){
            return;
        }

        // initMaterialData(materialData, textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData);

        if (textureData !== null) {
            setIndex(textureData.index, TextureWorkerData);
        }

        initMaterials(state, gl, material_config, shaderLib_generator, initNoMaterialShader, materialData.basicMaterialData, materialData.lightMaterialData, TextureWorkerData, PointLightWorkerData);
    })
}

var _initMaterialData = (gl: WebGLRenderingContext, materialData: MaterialInitWorkerData, textureData: TextureInitWorkerData, MapManagerWorkerData: any, TextureCacheWorkerData: any, TextureWorkerData: any, MaterialWorkerData: any, BasicMaterialWorkerData: any, LightMaterialWorkerData: any) => {
    return callFunc(() => {
        if (_isDataNotExist(materialData)){
            return;
        }

        initMaterialData(materialData, textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData);
    })
}

var _initGeometrys = (geometryData: GeometryInitWorkerData, DataBufferConfig: any, GeometryWorkerData: any) => {
    return callFunc(() => {
        if (_isDataNotExist(geometryData)){
            return;
        }

        initGeometryWorkerData(geometryData.buffer, geometryData.indexType, geometryData.indexTypeSize, DataBufferConfig, GeometryWorkerData);

        setPointCacheDatas(geometryData.verticesInfoList, geometryData.normalsInfoList, geometryData.texCoordsInfoList, geometryData.indicesInfoList, GeometryWorkerData);
    })
}

var _initWebGL1Lights = (lightData: WebGL1LightInitWorkerData, AmbientLightWorkerData: any, DirectionLightWorkerData: any, PointLightWorkerData: any) => {
    return callFunc(() => {
        if (_isDataNotExist(lightData)){
            return;
        }

        initLightWorkerDataWebGL1(lightData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData);
    })
}

var _initWebGL2Lights = (lightData: WebGL2LightInitWorkerData, PointLightWorkerData: any) => {
    return callFunc(() => {
        if (_isDataNotExist(lightData)){
            return;
        }

        initLightWorkerDataWebGL2(lightData, PointLightWorkerData);
    })
}

var _setLightDrawData = (lightData: LightDrawWorkerData, DirectionLightWorkerData: any, PointLightWorkerData: any) => {
    var directionLightData = lightData.directionLightData,
        pointLightData = lightData.pointLightData;

    setDirectionLightPositionArr(directionLightData.positionArr, DirectionLightWorkerData);
    setPointLightPositionArr(pointLightData.positionArr, PointLightWorkerData);
}

var _initTextures = (textureData: TextureInitWorkerData, TextureWorkerData: any) => {
    if (_isDataNotExist(textureData)){
        return empty();
    }

    setUniformSamplerNameMap(textureData.uniformSamplerNameMap, TextureWorkerData);

    return setSourceMapByImageSrcArrStream(textureData.imageSrcIndexArr, TextureWorkerData);
}
