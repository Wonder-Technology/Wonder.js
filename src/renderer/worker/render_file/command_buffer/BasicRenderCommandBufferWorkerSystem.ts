import { BasicWorkerRenderCommandBufferForDrawData } from "../type/dataType";
import { createTypeArrays } from "../../../utils/command_buffer/basicRenderComandBufferUtils";
import { BufferUtilsForUnitTest } from "../../../../utils/BufferUtilsForUnitTest";

export var createTypeArraysOnlyOnce = (renderCommandBufferData:BasicWorkerRenderCommandBufferForDrawData, DataBufferConfig:any, BasicRenderCommandBufferWorkerData:any) => {
    if (BufferUtilsForUnitTest.isRenderCommandBufferDataTypeArrayNotExist(BasicRenderCommandBufferWorkerData)) {
        createTypeArrays(renderCommandBufferData.buffer, DataBufferConfig, BasicRenderCommandBufferWorkerData);
    }

    return BasicRenderCommandBufferWorkerData;
}

