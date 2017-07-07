import { DirectionLight } from "./DirectionLight";
import {
    create as createLight
} from "./LightSystem";
import { Color } from "../../structure/Color";
import {
    disposeComponent as disposeSpecifyLightComponent, getPosition as getSpecifyLightPosition, getRenderData as getSpecifyLightRenderData,
    initData as initSpecifyLightData,
    setColor as setSpecifyLightColor
} from "./SpecifyLightSystem";

//todo check: count <= 4
export var create = (ShaderData: any, DirectionLightData:any) => {
    var light = new DirectionLight();

    light = createLight(light, DirectionLightData);

    _setDefaultRenderData(light.index, DirectionLightData);

    return light;
}

var _setDefaultRenderData = (index:number, DirectionLightData:any) => {
    DirectionLightData.renderDataMap[index] = {
        colorArr: DirectionLightData.defaultColorArr,
        intensity: DirectionLightData.defaultIntensity
    }
}

export var getRenderData = (index: number, DirectionLightData: any) => {
    return getSpecifyLightRenderData(index, DirectionLightData);
}

export var getPosition = (index: number, ThreeDTransformData:any, GameObjectData:any, DirectionLightData: any) => {
    return getSpecifyLightPosition(index, ThreeDTransformData, GameObjectData, DirectionLightData);
}

export var setColor = (index: number, color: Color, DirectionLightData: any) => {
    setSpecifyLightColor(index, color, DirectionLightData);
}

export var setIntensity = (index: number, intensity:number, DirectionLightData: any) => {
    DirectionLightData.renderDataMap[index].intensity = intensity;
}

export var disposeComponent = (sourceIndex:number, lastComponentIndex:number, DirectionLightData:any) => {
    disposeSpecifyLightComponent(sourceIndex, lastComponentIndex, DirectionLightData.renderDataMap)
}

export var initData = (DirectionLightData: any) => {
    initSpecifyLightData(DirectionLightData);

    DirectionLightData.defaultIntensity = 1;

    DirectionLightData.lightGLSLDataStructureMemberName = [
        {
            position: "u_directionLights[0].position",
            color:"u_directionLights[0].color",
            intensity: "u_directionLights[0].intensity"
        }, {
            position: "u_directionLights[1].position",
            color:"u_directionLights[1].color",
            intensity: "u_directionLights[1].intensity"
        },{
            position: "u_directionLights[2].position",
            color:"u_directionLights[2].color",
            intensity: "u_directionLights[2].intensity"
        },{
            position: "u_directionLights[3].position",
            color:"u_directionLights[3].color",
            intensity: "u_directionLights[3].intensity"
        }
    ];
}

