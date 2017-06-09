import { Color } from "../../structure/Color";

export const render_config = {
    //todo move to DataBufferConfig
    "renderCommandBufferCount": 10 * 1024,

    "clearColor": Color.create("#000000")
}

export interface IRenderConfig {
    renderCommandBufferCount:number;
    clearColor: Color;
}

