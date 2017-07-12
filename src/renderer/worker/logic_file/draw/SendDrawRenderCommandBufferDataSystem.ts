import curry from "wonder-lodash/curry";
import { EWorkerOperateType } from "../../both_file/EWorkerOperateType";
import {
    clearDisposedGeometryIndexArray,
    clearWorkerInfoList, hasDisposedGeometryIndexArrayData, hasNewPointData,
    isReallocate
} from "../../../../component/geometry/GeometrySystem";
import { EGeometryWorkerDataOperateType } from "../../../enum/EGeometryWorkerDataOperateType";
import { clearWorkerInitList, hasNewInitedMaterial } from "../../../../component/material/MaterialSystem";
import { RenderCommandBufferForDrawData } from "../../../type/dataType";
import { EDisposeDataOperateType } from "../../../enum/EDisposeDataOperateType";
import { getRenderWorker } from "../worker_instance/WorkerInstanceSystem";

export var sendDrawData = curry((WorkerInstanceData: any, MaterialData: any, GeometryData: any, data: RenderCommandBufferForDrawData) => {
    var geometryData = null,
        disposeData = null,
        materialData = null;

    if (hasNewPointData(GeometryData)) {
        geometryData = {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType.ADD,
            verticesInfoList: GeometryData.verticesWorkerInfoList,
            normalsInfoList: GeometryData.normalsWorkerInfoList,
            indicesInfoList: GeometryData.indicesWorkerInfoList
        };
    }
    else if (isReallocate(GeometryData)) {
        geometryData = {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType.RESET,
            verticesInfoList: GeometryData.verticesInfoList,
            normalsInfoList: GeometryData.normalsInfoList,
            indicesInfoList: GeometryData.indicesInfoList
        };
    }

    if (hasDisposedGeometryIndexArrayData(GeometryData)) {
        disposeData = {
            type: EDisposeDataOperateType.DISPOSE_BUFFER,
            disposedGeometryIndexArray: GeometryData.disposedGeometryIndexArray
        };
    }

    if (hasNewInitedMaterial(MaterialData)) {
        materialData = {
            buffer: MaterialData.buffer,
            workerInitList: MaterialData.workerInitList
        };
    }

    getRenderWorker(WorkerInstanceData).postMessage({
        operateType: EWorkerOperateType.DRAW,
        renderCommandBufferData: data,
        materialData: materialData,
        geometryData: geometryData,
        disposeData: disposeData
    });

    clearWorkerInfoList(GeometryData);
    clearDisposedGeometryIndexArray(GeometryData);
    clearWorkerInitList(MaterialData);
})
