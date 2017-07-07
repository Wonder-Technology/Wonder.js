import { AmbientLight } from "./AmbientLight";
import {
    create as createLight
} from "./LightSystem";
import { Color } from "../../structure/Color";
import {
    disposeComponent as disposeSpecifyLightComponent, initData as initSpecifyLightData, getRenderData as getSpecifyLightRenderData,
    setColor as setSpecifyLightColor
} from "./SpecifyLightSystem";

//todo check: count <= 1
export var create = (ShaderData: any, AmbientLightData:any) => {
    var light = new AmbientLight();

    light = createLight(light, AmbientLightData);

    _setDefaultRenderData(light.index, AmbientLightData);

    return light;
}

var _setDefaultRenderData = (index:number, AmbientLightData:any) => {
    AmbientLightData.renderDataMap[index] = {
        colorArr:AmbientLightData.defaultColorArr
    }
}

export var getRenderData = (index: number, DirectionLightData: any) => {
    return getSpecifyLightRenderData(index, DirectionLightData);
}

export var setColor = (index: number, color: Color, AmbientLightData: any) => {
    setSpecifyLightColor(index, color, AmbientLightData);
}

export var disposeComponent = (sourceIndex:number, lastComponentIndex:number, AmbientLightData:any) => {
    disposeSpecifyLightComponent(sourceIndex, lastComponentIndex, AmbientLightData.renderDataMap);
}

export var initData = (AmbientLightData: any) => {
    initSpecifyLightData(AmbientLightData);
}
