import { Color } from "../../structure/Color";

export const render_config = {
    "renderCommandBufferCount": 10 * 1024,

    "clearColor": Color.create("#000000")
}

export interface IRenderConfig {
    renderCommandBufferCount:number;
    clearColor: Color;
}

