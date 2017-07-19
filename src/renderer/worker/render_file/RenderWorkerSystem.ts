import "wonder-frp/dist/es2015/stream/ConcatStream";
import "wonder-frp/dist/es2015/stream/MergeAllStream";
import "wonder-frp/dist/es2015/stream/MergeStream";
import { EWorkerOperateType } from "../both_file/EWorkerOperateType";
import { Log } from "../../../utils/Log";
import {
    clear, draw
} from "./draw/DrawRenderCommandBufferWorkerSystem";
import { render_config } from "../../data/render_config";
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
    initData as initMaterialWorkerData, initMaterials,
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
import { initData as initDrawRenderCommandBufferForDrawData } from "./draw/DrawRenderCommandBufferWorkerSystem";
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
    GeometryUpdateWorkerData, LightDrawWorkerData, LightInitWorkerData, TextureInitWorkerData
} from "../../type/messageDataType";
import { PointLightWorkerData } from "./light/PointLightWorkerData";
import { initData as initLightData } from "./light/LightWorkerSystem";
import { setIsTest } from "./config/InitConfigWorkerSystem";
import { InitConfigWorkerData } from "./config/InitConfigWorkerData";
import { setPositionArr as setPointLightPositionArr } from "./light/PointLightWorkerSystem";
import { TextureWorkerData } from "./texture/TextureWorkerData";
import { TextureCacheWorkerData } from "./texture/TextureCacheWorkerData";
import { MapManagerWorkerData } from "./texture/MapManagerWorkerData";
import {
    disposeSourceAndGLTexture, setIndex,
    setSourceMapByImageSrcArrStream
} from "./texture/TextureWorkerSystem";
import { callFunc, empty, fromArray } from "wonder-frp/dist/es2015/global/Operator";
import { initData as initShaderData } from "./shader/ShaderWorkerSystem";
import { ShaderWorkerData } from "./shader/ShaderWorkerData";

export var onerrorHandler = (msg: string, fileName: string, lineno: number) => {
    Log.error(true, `message:${msg}\nfileName:${fileName}\nlineno:${lineno}`)
}

export var onmessageHandler = (e) => {
    var data = e.data,
        operateType = data.operateType;

    switch (operateType) {
        case EWorkerOperateType.INIT_CONFIG:
            setIsTest(data.isTest, InitConfigWorkerData).run();
            break;
        case EWorkerOperateType.INIT_GL:
            _initData();

            let state = initGL(data).run();

            setState(state, StateData);

            initState(state, getGL, setSide, DeviceManagerWorkerData);
            break;
        case EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE:
            fromArray([
                _initLights(data.lightData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData),
                _initMaterials(getGL(DeviceManagerWorkerData, getState(StateData)), data.materialData, data.textureData, MapManagerWorkerData, TextureCacheWorkerData, TextureWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData),
                _initGeometrys(data.geometryData, DataBufferConfig, GeometryWorkerData)
            ]).mergeAll()
                .concat(_initTextures(data.textureData, TextureWorkerData))
                .subscribe(null, null, () => {
                    self.postMessage({
                        state: ERenderWorkerState.INIT_COMPLETE
                    });
                })
            break;
        case EWorkerOperateType.DRAW:
            clear(null, render_config, DeviceManagerWorkerData);

            let geometryData = data.geometryData,
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
                if(disposeData.geometryDisposeData !== null){
                    disposeGeometryBuffers(disposeData.disposedGeometryIndexArray, ArrayBufferWorkerData, IndexBufferWorkerData, disposeArrayBuffer, disposeIndexBuffer);
                }

                if(disposeData.textureDisposeData !== null){
                    // disposeGeometryBuffers(disposeData.disposedGeometryIndexArray, ArrayBufferWorkerData, IndexBufferWorkerData, disposeArrayBuffer, disposeIndexBuffer);
                    disposeSourceAndGLTexture(disposeData.textureDisposeData, getGL(DeviceManagerWorkerData, getState(StateData)), TextureCacheWorkerData, TextureWorkerData);
                }
            }

            if(lightData !== null){
                _setLightDrawData(lightData, DirectionLightWorkerData, PointLightWorkerData);
            }

            draw(null, DataBufferConfig, buildDrawDataMap(DeviceManagerWorkerData, TextureWorkerData, TextureCacheWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, ArrayBufferWorkerData, IndexBufferWorkerData, DrawRenderCommandBufferWorkerData), data.renderCommandBufferData);

            self.postMessage({
                state: ERenderWorkerState.DRAW_COMPLETE
            });
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW(`operateType:${operateType}`));
            break;
    }
};

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

var _initMaterials = (gl:WebGLRenderingContext, materialData: MaterialInitWorkerData, textureData: TextureInitWorkerData, MapManagerWorkerData:any, TextureCacheWorkerData:any, TextureWorkerData:any, MaterialWorkerData: any, BasicMaterialWorkerData: any, LightMaterialWorkerData: any) => {
    return callFunc(() => {
        if(materialData === null){
            return;
        }

        initMaterialWorkerData(materialData, textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData);

        initMaterials(materialData.basicMaterialData, materialData.lightMaterialData, gl, TextureWorkerData);
    })
}

var _initGeometrys = (geometryData: GeometryInitWorkerData, DataBufferConfig: any, GeometryWorkerData: any) => {
    return callFunc(() => {
        if(geometryData === null){
            return;
        }

        initGeometryWorkerData(geometryData.buffer, geometryData.indexType, geometryData.indexTypeSize, DataBufferConfig, GeometryWorkerData);

        setPointCacheDatas(geometryData.verticesInfoList, geometryData.normalsInfoList, geometryData.texCoordsInfoList, geometryData.indicesInfoList, GeometryWorkerData);
    })
}

var _initLights = (lightData:LightInitWorkerData, AmbientLightWorkerData:any, DirectionLightWorkerData:any, PointLightWorkerData:any) => {
    return callFunc(() => {
        if (lightData === null) {
            return;
        }

        initLightData(lightData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData);

    })
}

var _setLightDrawData = (lightData:LightDrawWorkerData, DirectionLightWorkerData:any, PointLightWorkerData:any) => {
    var directionLightData = lightData.directionLightData,
        pointLightData = lightData.pointLightData;

    setDirectionLightPositionArr(directionLightData.positionArr, DirectionLightWorkerData);
    setPointLightPositionArr(pointLightData.positionArr, PointLightWorkerData);
}

var _initTextures = (textureData: TextureInitWorkerData, TextureWorkerData: any) => {
    if(textureData === null){
        return empty();
    }

    setIndex(textureData.index, TextureWorkerData);

    return setSourceMapByImageSrcArrStream(textureData.imageSrcArr, TextureWorkerData);
}
