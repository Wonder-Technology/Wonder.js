import { LightWorkerRenderCommandBufferForDrawData } from "../type/dataType";
import { BufferUtilsForUnitTest } from "../../../../utils/BufferUtilsForUnitTest";
import { createTypeArrays } from "../../../utils/command_buffer/lightRenderComandBufferUtils";

export const createTypeArraysOnlyOnce = (renderCommandBufferData: LightWorkerRenderCommandBufferForDrawData, DataBufferConfig: any, LightRenderCommandBufferWorkerData: any) => {
    if (BufferUtilsForUnitTest.isRenderCommandBufferDataTypeArrayNotExist(LightRenderCommandBufferWorkerData)) {
        createTypeArrays(renderCommandBufferData.buffer, DataBufferConfig, LightRenderCommandBufferWorkerData);
    }

    return LightRenderCommandBufferWorkerData;
}

