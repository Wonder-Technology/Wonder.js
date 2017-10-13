import curry from "wonder-lodash/curry";
import { EWorkerOperateType } from "../../both_file/EWorkerOperateType";
import { clearDisposedGeometryIndexArray, clearWorkerInfoList, getDisposedGeometryIndexArrayData, hasDisposedGeometryIndexArrayData, hasNewPointData, isReallocate } from "../../../../component/geometry/GeometrySystem";
import { EGeometryWorkerDataOperateType } from "../../../enum/EGeometryWorkerDataOperateType";
import { clearWorkerInitList, hasNewInitedMaterial } from "../../../../component/material/MaterialSystem";
import { getRenderWorker } from "../../../../worker/WorkerInstanceSystem";
import { getAllPositionData as getAllDirectionLightPositionData } from "../../../../component/light/DirectionLightSystem";
import { getAllPositionData as getPointLightAllPositionData } from "../../../../component/light/PointLightSystem";
import { clearDisposedTextureDataMap, clearNeedAddedSourceArr, clearNeedInitTextureDataArr, convertNeedInitedSourceMapToImageDataArr, getDisposedTextureDataMap, getNeedAddedSourceArr, getNeedInitedTextureDataArr, getUniformSamplerNameMap, hasDisposedTextureDataMap, hasNeedInitTextureDataArr } from "../../../texture/TextureSystem";
import { ERenderWorkerState } from "../../both_file/ERenderWorkerState";
import { getMaterialTextureList } from "../../../texture/MapManagerSystem";
export var sendDrawData = curry(function (DomQuery, WorkerInstanceData, MapManagerData, TextureData, MaterialData, GeometryData, ThreeDTransformData, GameObjectData, AmbientLightData, DirectionLightData, PointLightData, data) {
    var geometryData = null, geometryDisposeData = null, textureDisposeData = null, materialData = null, lightData = null, textureData = null, transferList = [];
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
        transferList = transferList.concat(textureData.needAddedImageDataArr.map(function (_a) {
            var arrayBuffer = _a.arrayBuffer;
            return arrayBuffer;
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
});
var _buildSendGeometryData = function (GeometryData) {
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
};
var _buildSendLightData = function (ThreeDTransformData, GameObjectData, DirectionLightData, PointLightData) {
    return {
        directionLightData: {
            positionArr: getAllDirectionLightPositionData(ThreeDTransformData, GameObjectData, DirectionLightData)
        },
        pointLightData: {
            positionArr: getPointLightAllPositionData(ThreeDTransformData, GameObjectData, PointLightData)
        }
    };
};
var _buildSendTextureData = function (DomQuery, MapManagerData, TextureData) {
    var needInitedTextureDataArr = getNeedInitedTextureDataArr(TextureData), needAddedImageDataArr = convertNeedInitedSourceMapToImageDataArr(getNeedAddedSourceArr(TextureData), needInitedTextureDataArr, DomQuery);
    return {
        index: TextureData.index,
        needAddedImageDataArr: needAddedImageDataArr,
        uniformSamplerNameMap: getUniformSamplerNameMap(TextureData),
        materialTextureList: getMaterialTextureList(MapManagerData),
        needInitedTextureIndexArr: needInitedTextureDataArr
    };
};
var _clearData = function (GeometryData, MaterialData, TextureData) {
    clearWorkerInfoList(GeometryData);
    clearDisposedGeometryIndexArray(GeometryData);
    clearDisposedTextureDataMap(TextureData);
    clearNeedInitTextureDataArr(TextureData);
    clearNeedAddedSourceArr(TextureData);
    clearWorkerInitList(MaterialData);
};
export var initData = function (SendDrawRenderCommandBufferData) {
    SendDrawRenderCommandBufferData.isInitComplete = false;
    SendDrawRenderCommandBufferData.state = ERenderWorkerState.DEFAULT;
};
//# sourceMappingURL=SendDrawRenderCommandBufferDataSystem.js.map