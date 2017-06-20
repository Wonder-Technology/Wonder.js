"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var EWorkerOperateType_1 = require("../../both_file/EWorkerOperateType");
var GeometrySystem_1 = require("../../../../component/geometry/GeometrySystem");
var EGeometryWorkerDataOperateType_1 = require("../../../enum/EGeometryWorkerDataOperateType");
var MaterialSystem_1 = require("../../../../component/material/MaterialSystem");
var EDisposeDataOperateType_1 = require("../../../enum/EDisposeDataOperateType");
var WorkerInstanceSystem_1 = require("../worker_instance/WorkerInstanceSystem");
exports.sendDrawData = curry_1.default(function (WorkerInstanceData, MaterialData, GeometryData, data) {
    var geometryData = null, disposeData = null, materialData = null;
    if (GeometrySystem_1.hasNewPointData(GeometryData)) {
        geometryData = {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType_1.EGeometryWorkerDataOperateType.ADD,
            verticesInfoList: GeometryData.verticesWorkerInfoList,
            indicesInfoList: GeometryData.indicesWorkerInfoList
        };
    }
    else if (GeometrySystem_1.isReallocate(GeometryData)) {
        geometryData = {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType_1.EGeometryWorkerDataOperateType.RESET,
            verticesInfoList: GeometryData.verticesInfoList,
            indicesInfoList: GeometryData.indicesInfoList
        };
    }
    if (GeometrySystem_1.hasDisposedGeometryIndexArrayData(GeometryData)) {
        disposeData = {
            type: EDisposeDataOperateType_1.EDisposeDataOperateType.DISPOSE_BUFFER,
            disposedGeometryIndexArray: GeometryData.disposedGeometryIndexArray
        };
    }
    if (MaterialSystem_1.hasNewInitedMaterial(MaterialData)) {
        materialData = {
            buffer: MaterialData.buffer,
            workerInitList: MaterialData.workerInitList
        };
    }
    WorkerInstanceSystem_1.getRenderWorker(WorkerInstanceData).postMessage({
        operateType: EWorkerOperateType_1.EWorkerOperateType.DRAW,
        renderCommandBufferData: data,
        materialData: materialData,
        geometryData: geometryData,
        disposeData: disposeData
    });
    GeometrySystem_1.clearWorkerInfoList(GeometryData);
    GeometrySystem_1.clearDisposedGeometryIndexArray(GeometryData);
    MaterialSystem_1.clearWorkerInitList(MaterialData);
});
//# sourceMappingURL=SendDrawRenderCommandBufferDataSystem.js.map