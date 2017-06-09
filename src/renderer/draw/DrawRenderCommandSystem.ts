import curry from "wonder-lodash/curry";
import { EWorkerOperateType } from "../worker/EWorkerOperateType";
import { RenderCommandBufferWorkerData } from "../command/RenderCommandBufferData";
import { hasNewPointData } from "../worker/geometry/GeometryWorkerSystem";
import { clearWorkerInfoList } from "../../component/geometry/GeometrySystem";

export var draw = curry((RenderWorkerData:any, GeometryData:any, data:RenderCommandBufferWorkerData) => {
    var geometryData = null;

    if(hasNewPointData(GeometryData)){
        geometryData = {
            buffer:GeometryData.buffer,
            verticesWorkerInfoList:GeometryData.verticesWorkerInfoList,
            indicesWorkerInfoList:GeometryData.indicesWorkerInfoList
        };
    }

    RenderWorkerData.renderWorker.postMessage({
        operateType:EWorkerOperateType.DRAW,
        renderCommandBufferData:data,
        geometryData:geometryData
    });

    clearWorkerInfoList(GeometryData);
})

