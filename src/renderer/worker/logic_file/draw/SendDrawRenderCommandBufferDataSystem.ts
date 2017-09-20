import curry from "wonder-lodash/curry";
import { EWorkerOperateType } from "../../both_file/EWorkerOperateType";
import {
    clearDisposedGeometryIndexArray,
    clearWorkerInfoList, getDisposedGeometryIndexArrayData, hasDisposedGeometryIndexArrayData, hasNewPointData,
    isReallocate
} from "../../../../component/geometry/GeometrySystem";
import { EGeometryWorkerDataOperateType } from "../../../enum/EGeometryWorkerDataOperateType";
import { clearWorkerInitList, hasNewInitedMaterial } from "../../../../component/material/MaterialSystem";
import { RenderCommandBufferForDrawData } from "../../../utils/worker/render_file/type/dataType";
import { getRenderWorker } from "../../../../worker/WorkerInstanceSystem";
import { getAllPositionData as getAllDirectionLightPositionData } from "../../../../component/light/DirectionLightSystem";
import { getAllPositionData as getPointLightAllPositionData } from "../../../../component/light/PointLightSystem";
import {
    clearDisposedTextureDataMap, clearNeedAddedSourceArr, clearNeedInitTextureDataArr,
    convertNeedInitedSourceMapToImageDataArr,
    getDisposedTextureDataMap,
    getNeedAddedSourceArr,
    getNeedInitedTextureDataArr,
    getUniformSamplerNameMap,
    hasDisposedTextureDataMap, hasNeedInitTextureDataArr
} from "../../../texture/TextureSystem";
import { ERenderWorkerState } from "../../both_file/ERenderWorkerState";
import { getMaterialTextureList } from "../../../texture/MapManagerSystem";

//todo refactor
export const sendDrawData = curry((DomQuery:any, WorkerInstanceData: any, MapManagerData:any, TextureData: any, MaterialData: any, GeometryData: any, ThreeDTransformData: any, GameObjectData: any, AmbientLightData: any, DirectionLightData: any, PointLightData: any, data: RenderCommandBufferForDrawData) => {
    var geometryData = null,
        geometryDisposeData = null,
        textureDisposeData = null,
        materialData = null,
        lightData = null,
        textureData = null,
        transferList:Array<ArrayBuffer> = [];

    if (hasNewPointData(GeometryData)) {
        geometryData = {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType.ADD,
            verticesInfoList: GeometryData.verticesWorkerInfoList,
            normalsInfoList: GeometryData.normalsWorkerInfoList,
            texCoordsInfoList: GeometryData.texCoordsWorkerInfoList,
            indicesInfoList: GeometryData.indicesWorkerInfoList
        };
    }
    else if (isReallocate(GeometryData)) {
        geometryData = {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType.RESET,
            verticesInfoList: GeometryData.verticesInfoList,
            normalsInfoList: GeometryData.normalsInfoList,
            texCoordsInfoList: GeometryData.texCoordsInfoList,
            indicesInfoList: GeometryData.indicesInfoList
        };
    }

    if (hasDisposedGeometryIndexArrayData(GeometryData)) {
        geometryDisposeData = {
            disposedGeometryIndexArray: getDisposedGeometryIndexArrayData(GeometryData)
        };
    }

    if (hasDisposedTextureDataMap(TextureData)) {
        textureDisposeData = {
            disposedTextureDataMap: getDisposedTextureDataMap(TextureData)
        };
    }

    if (hasNewInitedMaterial(MaterialData)) {
        materialData = {
            buffer: MaterialData.buffer,
            workerInitList: MaterialData.workerInitList
        };
    }

    lightData = {
        directionLightData: {
            positionArr: getAllDirectionLightPositionData(ThreeDTransformData, GameObjectData, DirectionLightData)
        },
        pointLightData: {
            positionArr: getPointLightAllPositionData(ThreeDTransformData, GameObjectData, PointLightData)
        }
    }

    if(hasNeedInitTextureDataArr(TextureData)){
        let needInitedTextureDataArr = getNeedInitedTextureDataArr(TextureData),
            needAddedImageDataArr = convertNeedInitedSourceMapToImageDataArr(getNeedAddedSourceArr(TextureData), needInitedTextureDataArr, DomQuery);

        transferList = transferList.concat(needAddedImageDataArr.map(({arrayBuffer}) => {
            return arrayBuffer as ArrayBuffer;
        }));

        textureData = {
            index: TextureData.index,

            needAddedImageDataArr: needAddedImageDataArr,
            uniformSamplerNameMap: getUniformSamplerNameMap(TextureData),
            materialTextureList: getMaterialTextureList(MapManagerData),

            needInitedTextureIndexArr: needInitedTextureDataArr
        };
    }

    getRenderWorker(WorkerInstanceData).postMessage({
        operateType: EWorkerOperateType.DRAW,
        renderCommandBufferData: data,
        materialData: materialData,
        geometryData: geometryData,
        lightData: lightData,
        textureData: textureData,
        disposeData: {
            geometryDisposeData: geometryDisposeData,
            textureDisposeData: textureDisposeData
        }
    }, transferList);

    clearWorkerInfoList(GeometryData);
    clearDisposedGeometryIndexArray(GeometryData);
    clearDisposedTextureDataMap(TextureData);
    clearNeedInitTextureDataArr(TextureData);
    clearNeedAddedSourceArr(TextureData);
    clearWorkerInitList(MaterialData);
})

export const initData = (SendDrawRenderCommandBufferData: any) => {
    SendDrawRenderCommandBufferData.isInitComplete = false;
    SendDrawRenderCommandBufferData.state = ERenderWorkerState.DEFAULT;
}
