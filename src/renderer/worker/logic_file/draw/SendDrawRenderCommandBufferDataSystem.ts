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

export const sendDrawData = curry((DomQuery: any, WorkerInstanceData: any, MapManagerData: any, TextureData: any, MaterialData: any, GeometryData: any, ThreeDTransformData: any, GameObjectData: any, AmbientLightData: any, DirectionLightData: any, PointLightData: any, data: RenderCommandBufferForDrawData) => {
    var geometryData = null,
        geometryDisposeData = null,
        textureDisposeData = null,
        materialData = null,
        lightData = null,
        textureData = null,
        transferList: Array<ArrayBuffer> = [];

    geometryData = _buildSendGeometryData(GeometryData);

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

    lightData = _buildSendLightData(ThreeDTransformData, GameObjectData, DirectionLightData, PointLightData);

    if (hasNeedInitTextureDataArr(TextureData)) {
        textureData = _buildSendTextureData(DomQuery, MapManagerData, TextureData);

        transferList = transferList.concat(textureData.needAddedImageDataArr.map(({ arrayBuffer }) => {
            return arrayBuffer as ArrayBuffer;
        }));
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

    _clearData(GeometryData, MaterialData, TextureData);
})

const _buildSendGeometryData = (GeometryData: any) => {
    if (hasNewPointData(GeometryData)) {
        return {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType.ADD,
            verticesInfoList: GeometryData.verticesWorkerInfoList,
            normalsInfoList: GeometryData.normalsWorkerInfoList,
            texCoordsInfoList: GeometryData.texCoordsWorkerInfoList,
            indicesInfoList: GeometryData.indicesWorkerInfoList
        };
    }
    else if (isReallocate(GeometryData)) {
        return {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType.RESET,
            verticesInfoList: GeometryData.verticesInfoList,
            normalsInfoList: GeometryData.normalsInfoList,
            texCoordsInfoList: GeometryData.texCoordsInfoList,
            indicesInfoList: GeometryData.indicesInfoList
        };
    }

    return null;
}

const _buildSendLightData = (ThreeDTransformData: any, GameObjectData: any, DirectionLightData: any, PointLightData: any) => {
    return {
        directionLightData: {
            positionArr: getAllDirectionLightPositionData(ThreeDTransformData, GameObjectData, DirectionLightData)
        },
        pointLightData: {
            positionArr: getPointLightAllPositionData(ThreeDTransformData, GameObjectData, PointLightData)
        }
    }
}

const _buildSendTextureData = (DomQuery: any, MapManagerData: any, TextureData: any) => {
    let needInitedTextureDataArr = getNeedInitedTextureDataArr(TextureData),
        needAddedImageDataArr = convertNeedInitedSourceMapToImageDataArr(getNeedAddedSourceArr(TextureData), needInitedTextureDataArr, DomQuery);

    return {
        index: TextureData.index,

        needAddedImageDataArr: needAddedImageDataArr,
        uniformSamplerNameMap: getUniformSamplerNameMap(TextureData),
        materialTextureList: getMaterialTextureList(MapManagerData),

        needInitedTextureIndexArr: needInitedTextureDataArr
    };
}

const _clearData = (GeometryData: any, MaterialData: any, TextureData: any) => {
    clearWorkerInfoList(GeometryData);
    clearDisposedGeometryIndexArray(GeometryData);
    clearDisposedTextureDataMap(TextureData);
    clearNeedInitTextureDataArr(TextureData);
    clearNeedAddedSourceArr(TextureData);
    clearWorkerInitList(MaterialData);
}

export const initData = (SendDrawRenderCommandBufferData: any) => {
    SendDrawRenderCommandBufferData.isInitComplete = false;
    SendDrawRenderCommandBufferData.state = ERenderWorkerState.DEFAULT;
}
