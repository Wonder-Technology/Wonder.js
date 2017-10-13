"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var EWorkerOperateType_1 = require("../../both_file/EWorkerOperateType");
var GeometrySystem_1 = require("../../../../component/geometry/GeometrySystem");
var EGeometryWorkerDataOperateType_1 = require("../../../enum/EGeometryWorkerDataOperateType");
var MaterialSystem_1 = require("../../../../component/material/MaterialSystem");
var WorkerInstanceSystem_1 = require("../../../../worker/WorkerInstanceSystem");
var DirectionLightSystem_1 = require("../../../../component/light/DirectionLightSystem");
var PointLightSystem_1 = require("../../../../component/light/PointLightSystem");
var TextureSystem_1 = require("../../../texture/TextureSystem");
var ERenderWorkerState_1 = require("../../both_file/ERenderWorkerState");
var MapManagerSystem_1 = require("../../../texture/MapManagerSystem");
exports.sendDrawData = curry_1.default(function (DomQuery, WorkerInstanceData, MapManagerData, TextureData, MaterialData, GeometryData, ThreeDTransformData, GameObjectData, AmbientLightData, DirectionLightData, PointLightData, data) {
    var geometryData = null, geometryDisposeData = null, textureDisposeData = null, materialData = null, lightData = null, textureData = null, transferList = [];
    geometryData = _buildSendGeometryData(GeometryData);
    if (GeometrySystem_1.hasDisposedGeometryIndexArrayData(GeometryData)) {
        geometryDisposeData = {
            disposedGeometryIndexArray: GeometrySystem_1.getDisposedGeometryIndexArrayData(GeometryData)
        };
    }
    if (TextureSystem_1.hasDisposedTextureDataMap(TextureData)) {
        textureDisposeData = {
            disposedTextureDataMap: TextureSystem_1.getDisposedTextureDataMap(TextureData)
        };
    }
    if (MaterialSystem_1.hasNewInitedMaterial(MaterialData)) {
        materialData = {
            buffer: MaterialData.buffer,
            workerInitList: MaterialData.workerInitList
        };
    }
    lightData = _buildSendLightData(ThreeDTransformData, GameObjectData, DirectionLightData, PointLightData);
    if (TextureSystem_1.hasNeedInitTextureDataArr(TextureData)) {
        textureData = _buildSendTextureData(DomQuery, MapManagerData, TextureData);
        transferList = transferList.concat(textureData.needAddedImageDataArr.map(function (_a) {
            var arrayBuffer = _a.arrayBuffer;
            return arrayBuffer;
        }));
    }
    WorkerInstanceSystem_1.getRenderWorker(WorkerInstanceData).postMessage({
        operateType: EWorkerOperateType_1.EWorkerOperateType.DRAW,
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
    if (GeometrySystem_1.hasNewPointData(GeometryData)) {
        return {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType_1.EGeometryWorkerDataOperateType.ADD,
            verticesInfoList: GeometryData.verticesWorkerInfoList,
            normalsInfoList: GeometryData.normalsWorkerInfoList,
            texCoordsInfoList: GeometryData.texCoordsWorkerInfoList,
            indicesInfoList: GeometryData.indicesWorkerInfoList
        };
    }
    else if (GeometrySystem_1.isReallocate(GeometryData)) {
        return {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType_1.EGeometryWorkerDataOperateType.RESET,
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
            positionArr: DirectionLightSystem_1.getAllPositionData(ThreeDTransformData, GameObjectData, DirectionLightData)
        },
        pointLightData: {
            positionArr: PointLightSystem_1.getAllPositionData(ThreeDTransformData, GameObjectData, PointLightData)
        }
    };
};
var _buildSendTextureData = function (DomQuery, MapManagerData, TextureData) {
    var needInitedTextureDataArr = TextureSystem_1.getNeedInitedTextureDataArr(TextureData), needAddedImageDataArr = TextureSystem_1.convertNeedInitedSourceMapToImageDataArr(TextureSystem_1.getNeedAddedSourceArr(TextureData), needInitedTextureDataArr, DomQuery);
    return {
        index: TextureData.index,
        needAddedImageDataArr: needAddedImageDataArr,
        uniformSamplerNameMap: TextureSystem_1.getUniformSamplerNameMap(TextureData),
        materialTextureList: MapManagerSystem_1.getMaterialTextureList(MapManagerData),
        needInitedTextureIndexArr: needInitedTextureDataArr
    };
};
var _clearData = function (GeometryData, MaterialData, TextureData) {
    GeometrySystem_1.clearWorkerInfoList(GeometryData);
    GeometrySystem_1.clearDisposedGeometryIndexArray(GeometryData);
    TextureSystem_1.clearDisposedTextureDataMap(TextureData);
    TextureSystem_1.clearNeedInitTextureDataArr(TextureData);
    TextureSystem_1.clearNeedAddedSourceArr(TextureData);
    MaterialSystem_1.clearWorkerInitList(MaterialData);
};
exports.initData = function (SendDrawRenderCommandBufferData) {
    SendDrawRenderCommandBufferData.isInitComplete = false;
    SendDrawRenderCommandBufferData.state = ERenderWorkerState_1.ERenderWorkerState.DEFAULT;
};
//# sourceMappingURL=SendDrawRenderCommandBufferDataSystem.js.map