import curry from "wonder-lodash/curry";
import { EWorkerOperateType } from "../../both_file/EWorkerOperateType";
import {
    clearDisposedGeometryIndexArray,
    clearWorkerInfoList, hasDisposedGeometryIndexArrayData, hasNewPointData,
    isReallocate
} from "../../../../component/geometry/GeometrySystem";
import { EGeometryWorkerDataOperateType } from "../../../enum/EGeometryWorkerDataOperateType";
import { clearWorkerInitList, hasNewInitedMaterial } from "../../../../component/material/MaterialSystem";
import { RenderCommandBufferWorkerData } from "../../../type/dataType";
import { EDisposeDataOperateType } from "../../../enum/EDisposeDataOperateType";
import { getRenderWorker } from "../worker_instance/WorkerInstanceSystem";

export var sendDrawData = curry((WorkerInstanceData:any, MaterialData: any, GeometryData: any, data: RenderCommandBufferWorkerData) => {
    var geometryData = null,
        disposeData = null,
        materialData = null;

    if (hasNewPointData(GeometryData)) {
        geometryData = {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType.ADD,
            verticesInfoList: GeometryData.verticesWorkerInfoList,
            indicesInfoList: GeometryData.indicesWorkerInfoList
        };
    }
    else if (isReallocate(GeometryData)) {
        geometryData = {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType.RESET,
            verticesInfoList: GeometryData.verticesInfoList,
            indicesInfoList: GeometryData.indicesInfoList
        };
    }

    if(hasDisposedGeometryIndexArrayData(GeometryData)){
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

