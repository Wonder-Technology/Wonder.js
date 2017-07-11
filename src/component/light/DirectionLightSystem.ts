import { DirectionLight } from "./DirectionLight";
import { Color } from "../../structure/Color";
import {
    create as createSpecifyLight,
    disposeComponent as disposeSpecifyLightComponent,

    initData as initSpecifyLightData,
    setColor as setSpecifyLightColor,
    addComponent as addSpecifyLightComponent
} from "./SpecifyLightSystem";
import { DirectionLightData } from "./DirectionLightData";
import { Light } from "./Light";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { getPosition as getPositionUtils, getRenderData as getRenderDataUtils } from "../../renderer/utils/light/directionLightUtils";

//todo check: count <= 4
export var create = (DirectionLightData:any) => {
    var light = new DirectionLight();

    light = createSpecifyLight(light, DirectionLightData);
    // light = createLight(light, LightData);

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
    return getRenderDataUtils(index, DirectionLightData);
}

export var getPosition = (index: number, ThreeDTransformData:any, GameObjectData:any, DirectionLightData: any) => {
    return getPositionUtils(index, ThreeDTransformData, GameObjectData, DirectionLightData)
}

export var setColor = (index: number, color: Color, DirectionLightData: any) => {
    setSpecifyLightColor(index, color, DirectionLightData);
}

export var setIntensity = (index: number, intensity:number, DirectionLightData: any) => {
    DirectionLightData.renderDataMap[index].intensity = intensity;
}

export var addComponent = (component: Light, gameObject: GameObject) => {
    addSpecifyLightComponent(component, gameObject, DirectionLightData);
}

export var disposeComponent = (component: Light) => {
    var lastComponentIndex = DirectionLightData.count;

    disposeSpecifyLightComponent(component.index, lastComponentIndex, DirectionLightData);
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

