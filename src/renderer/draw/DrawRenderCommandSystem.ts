import curry from "wonder-lodash/curry";
import { EWorkerOperateType } from "../worker/EWorkerOperateType";
import { RenderCommandBufferWorkerData } from "../command/RenderCommandBufferData";
import { hasNewPointData } from "../worker/geometry/GeometryWorkerSystem";
import { clearWorkerInfoList, isReallocate } from "../../component/geometry/GeometrySystem";
import { EGeometryWorkerDataOperateType } from "../enum/EGeometryWorkerDataOperateType";

export var draw = curry((RenderWorkerData:any, GeometryData:any, data:RenderCommandBufferWorkerData) => {
    var geometryData = null;

    if(hasNewPointData(GeometryData)){
        geometryData = {
            buffer:GeometryData.buffer,
            type: EGeometryWorkerDataOperateType.ADD,
            verticesInfoList:GeometryData.verticesWorkerInfoList,
            indicesInfoList:GeometryData.indicesWorkerInfoList
        };
    }
    else if(isReallocate(GeometryData)){
        geometryData = {
            buffer:GeometryData.buffer,
            type: EGeometryWorkerDataOperateType.RESET,
            verticesInfoList:GeometryData.verticesInfoList,
            indicesInfoList:GeometryData.indicesInfoList
        };
    }

    RenderWorkerData.renderWorker.postMessage({
        operateType:EWorkerOperateType.DRAW,
        renderCommandBufferData:data,
        geometryData:geometryData
    });

    clearWorkerInfoList(GeometryData);
})

