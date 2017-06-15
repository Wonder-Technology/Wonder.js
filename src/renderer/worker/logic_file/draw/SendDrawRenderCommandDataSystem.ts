import curry from "wonder-lodash/curry";
import { EWorkerOperateType } from "../../both_file/EWorkerOperateType";
import { clearWorkerInfoList, hasNewPointData, isReallocate } from "../../../../component/geometry/GeometrySystem";
import { EGeometryWorkerDataOperateType } from "../../../enum/EGeometryWorkerDataOperateType";
import { clearWorkerInitList, hasNewInitedMaterial } from "../../../../component/material/MaterialSystem";
import { RenderCommandBufferWorkerData } from "../../../type/dataType";

export var sendDrawData = curry((DeviceManagerWorkerData: any, MaterialData: any, GeometryData: any, data: RenderCommandBufferWorkerData) => {
    var geometryData = null,
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

    if (hasNewInitedMaterial(MaterialData)) {
        materialData = {
            buffer: MaterialData.buffer,
            workerInitList: MaterialData.workerInitList
        };
    }

    DeviceManagerWorkerData.renderWorker.postMessage({
        operateType: EWorkerOperateType.DRAW,
        renderCommandBufferData: data,
        materialData: materialData,
        geometryData: geometryData
    });

    clearWorkerInfoList(GeometryData);
    clearWorkerInitList(MaterialData);
})

