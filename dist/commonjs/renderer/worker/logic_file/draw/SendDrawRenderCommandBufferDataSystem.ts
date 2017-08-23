import curry from "wonder-lodash/curry";
import { EWorkerOperateType } from "../../both_file/EWorkerOperateType";
import {
    clearDisposedGeometryIndexArray,
    clearWorkerInfoList, hasDisposedGeometryIndexArrayData, hasNewPointData,
    isReallocate
} from "../../../../component/geometry/GeometrySystem";
import { EGeometryWorkerDataOperateType } from "../../../enum/EGeometryWorkerDataOperateType";
import { clearWorkerInitList, hasNewInitedMaterial } from "../../../../component/material/MaterialSystem";
import { RenderCommandBufferForDrawData } from "../../../utils/worker/render_file/type/dataType";
import { getRenderWorker } from "../../../../worker/WorkerInstanceSystem";
import { getAllPositionData as getAllDirectionLightPositionData } from "../../../../component/light/DirectionLightSystem";
import { getAllPositionData as getPointLightAllPositionData } from "../../../../component/light/PointLightSystem";
import { clearDisposedTextureDataMap, hasDisposedTextureDataMap } from "../../../texture/TextureSystem";
import { ERenderWorkerState } from "../../both_file/ERenderWorkerState";

export var sendDrawData = curry((WorkerInstanceData: any, TextureData: any, MaterialData: any, GeometryData: any, ThreeDTransformData: any, GameObjectData: any, AmbientLightData: any, DirectionLightData: any, PointLightData: any, data: RenderCommandBufferForDrawData) => {
    var geometryData = null,
        geometryDisposeData = null,
        textureDisposeData = null,
        materialData = null,
        lightData = null;

    if (hasNewPointData(GeometryData)) {
        geometryData = {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType.ADD,
            verticesInfoList: GeometryData.verticesWorkerInfoList,
            normalsInfoList: GeometryData.normalsWorkerInfoList,
            texCoordsInfoList: GeometryData.texCoordsWorkerInfoList,
            indicesInfoList: GeometryData.indicesWorkerInfoList
        };
    }
    else if (isReallocate(GeometryData)) {
        geometryData = {
            buffer: GeometryData.buffer,
            type: EGeometryWorkerDataOperateType.RESET,
            verticesInfoList: GeometryData.verticesInfoList,
            normalsInfoList: GeometryData.normalsInfoList,
            texCoordsInfoList: GeometryData.texCoordsInfoList,
            indicesInfoList: GeometryData.indicesInfoList
        };
    }

    if (hasDisposedGeometryIndexArrayData(GeometryData)) {
        geometryDisposeData = {
            disposedGeometryIndexArray: GeometryData.disposedGeometryIndexArray
        };
    }

    if (hasDisposedTextureDataMap(TextureData)) {
        textureDisposeData = {
            disposedTextureDataMap: TextureData.disposedTextureDataMap
        };
    }

    if (hasNewInitedMaterial(MaterialData)) {
        materialData = {
            buffer: MaterialData.buffer,
            workerInitList: MaterialData.workerInitList
        };
    }

    lightData = {
        directionLightData: {
            positionArr: getAllDirectionLightPositionData(ThreeDTransformData, GameObjectData, DirectionLightData)
        },
        pointLightData: {
            positionArr: getPointLightAllPositionData(ThreeDTransformData, GameObjectData, PointLightData)
        }
    }

    getRenderWorker(WorkerInstanceData).postMessage({
        operateType: EWorkerOperateType.DRAW,
        renderCommandBufferData: data,
        materialData: materialData,
        geometryData: geometryData,
        lightData: lightData,
        disposeData: {
            geometryDisposeData: geometryDisposeData,
            textureDisposeData: textureDisposeData
        }
    });

    clearWorkerInfoList(GeometryData);
    clearDisposedGeometryIndexArray(GeometryData);
    clearDisposedTextureDataMap(TextureData);
    clearWorkerInitList(MaterialData);
})

export var initData = (SendDrawRenderCommandBufferData: any) => {
    SendDrawRenderCommandBufferData.isInitComplete = false;
    SendDrawRenderCommandBufferData.state = ERenderWorkerState.DEFAULT;
}
