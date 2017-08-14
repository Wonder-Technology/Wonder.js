import { WorkerRenderCommandBufferForDrawData } from "../../logic_file/type/dataType";
import { createTypeArraysOnlyOnce as createBasicTypeArraysOnlyOnce } from "./BasicRenderCommandBufferWorkerSystem";
import { createTypeArraysOnlyOnce as createLightTypeArraysOnlyOnce } from "./LightRenderCommandBufferWorkerSystem";

export var createTypeArraysOnlyOnce = (renderCommandBufferData:WorkerRenderCommandBufferForDrawData, DataBufferConfig:any, BasicRenderCommandBufferWorkerData:any, LightRenderCommandBufferWorkerData:any) => {
    return {
        basicData: {
            renderCommandBufferData: createBasicTypeArraysOnlyOnce(renderCommandBufferData.basicData, DataBufferConfig, BasicRenderCommandBufferWorkerData),
            count:renderCommandBufferData.basicData.count
        },
        lightData: {
            renderCommandBufferData: createLightTypeArraysOnlyOnce(renderCommandBufferData.lightData, DataBufferConfig, LightRenderCommandBufferWorkerData),
            count:renderCommandBufferData.lightData.count
        }
    }
}

