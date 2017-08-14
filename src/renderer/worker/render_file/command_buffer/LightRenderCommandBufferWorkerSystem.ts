import { LightWorkerRenderCommandBufferForDrawData } from "../../logic_file/type/dataType";
import { BufferUtilsForUnitTest } from "../../../../utils/BufferUtilsForUnitTest";
import { createTypeArrays } from "../../../utils/command_buffer/lightRenderComandBufferUtils";

export var createTypeArraysOnlyOnce = (renderCommandBufferData:LightWorkerRenderCommandBufferForDrawData, DataBufferConfig:any, LightRenderCommandBufferWorkerData:any) => {
    if (BufferUtilsForUnitTest.isRenderCommandBufferDataTypeArrayNotExist(LightRenderCommandBufferWorkerData)) {
        createTypeArrays(renderCommandBufferData.buffer, DataBufferConfig, LightRenderCommandBufferWorkerData);
    }

    return LightRenderCommandBufferWorkerData;
}

