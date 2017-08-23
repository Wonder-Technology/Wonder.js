import { Color } from "../../../../structure/Color";
import { ELightModel } from "../../../../component/material/ELightModel";
export declare const render_config: {
    "clearColor": Color;
    "defer": {
        "lightModel": ELightModel;
    };
};
export interface IRenderConfig {
    clearColor: Color;
    defer: {
        lightModel: ELightModel;
    };
}
