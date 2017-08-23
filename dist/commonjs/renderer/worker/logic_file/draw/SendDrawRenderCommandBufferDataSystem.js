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
exports.sendDrawData = curry_1.default(function (WorkerInstanceData, TextureData, MaterialData, GeometryData, ThreeDTransformData, GameObjectData, AmbientLightData, DirectionLightData, PointLightData, data) {
    var geometryData = null, geometryDisposeData = null, textureDisposeData = null, materialData = null, lightData = null;
    if (GeometrySystem_1.hasNewPointData(GeometryData)) {
        geometryData = {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType_1.EGeometryWorkerDataOperateType.ADD,
            verticesInfoList: GeometryData.verticesWorkerInfoList,
            normalsInfoList: GeometryData.normalsWorkerInfoList,
            texCoordsInfoList: GeometryData.texCoordsWorkerInfoList,
            indicesInfoList: GeometryData.indicesWorkerInfoList
        };
    }
    else if (GeometrySystem_1.isReallocate(GeometryData)) {
        geometryData = {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType_1.EGeometryWorkerDataOperateType.RESET,
            verticesInfoList: GeometryData.verticesInfoList,
            normalsInfoList: GeometryData.normalsInfoList,
            texCoordsInfoList: GeometryData.texCoordsInfoList,
            indicesInfoList: GeometryData.indicesInfoList
        };
    }
    if (GeometrySystem_1.hasDisposedGeometryIndexArrayData(GeometryData)) {
        geometryDisposeData = {
            disposedGeometryIndexArray: GeometryData.disposedGeometryIndexArray
        };
    }
    if (TextureSystem_1.hasDisposedTextureDataMap(TextureData)) {
        textureDisposeData = {
            disposedTextureDataMap: TextureData.disposedTextureDataMap
        };
    }
    if (MaterialSystem_1.hasNewInitedMaterial(MaterialData)) {
        materialData = {
            buffer: MaterialData.buffer,
            workerInitList: MaterialData.workerInitList
        };
    }
    lightData = {
        directionLightData: {
            positionArr: DirectionLightSystem_1.getAllPositionData(ThreeDTransformData, GameObjectData, DirectionLightData)
        },
        pointLightData: {
            positionArr: PointLightSystem_1.getAllPositionData(ThreeDTransformData, GameObjectData, PointLightData)
        }
    };
    WorkerInstanceSystem_1.getRenderWorker(WorkerInstanceData).postMessage({
        operateType: EWorkerOperateType_1.EWorkerOperateType.DRAW,
        renderCommandBufferData: data,
        materialData: materialData,
        geometryData: geometryData,
        lightData: lightData,
        disposeData: {
            geometryDisposeData: geometryDisposeData,
            textureDisposeData: textureDisposeData
        }
    });
    GeometrySystem_1.clearWorkerInfoList(GeometryData);
    GeometrySystem_1.clearDisposedGeometryIndexArray(GeometryData);
    TextureSystem_1.clearDisposedTextureDataMap(TextureData);
    MaterialSystem_1.clearWorkerInitList(MaterialData);
});
exports.initData = function (SendDrawRenderCommandBufferData) {
    SendDrawRenderCommandBufferData.isInitComplete = false;
    SendDrawRenderCommandBufferData.state = ERenderWorkerState_1.ERenderWorkerState.DEFAULT;
};
//# sourceMappingURL=SendDrawRenderCommandBufferDataSystem.js.map