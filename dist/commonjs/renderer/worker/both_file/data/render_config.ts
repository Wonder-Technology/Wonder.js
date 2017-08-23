import { Color } from "../../../../structure/Color";
import { ELightModel } from "../../../../component/material/ELightModel";

export const render_config = {
    "clearColor": Color.create("#000000"),

    //todo refactor: be defer render component's attribute?
    "defer":{
        "lightModel": ELightModel.PHONG
    }
}

export interface IRenderConfig {
    clearColor: Color;
    defer:{
        lightModel:ELightModel;
    }
}

