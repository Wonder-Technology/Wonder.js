import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { checkLightShouldAlive, Light } from "./Light";
import {
    create, getColorArr3, getIntensity, getPosition, setColor,
    setIntensity
} from "./DirectionLightSystem";
import { DirectionLightData } from "./DirectionLightData";
import { Color } from "../../structure/Color";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { getGameObject } from "../../renderer/utils/light/specifyLightUtils";
import { ThreeDTransformData } from "../transform/ThreeDTransformData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";

@registerClass("DirectionLight")
export class DirectionLight extends Light{
}

export var createDirectionLight = () => {
    return create(DirectionLightData);
}

export var getDirectionLightGameObject = requireCheckFunc((component:DirectionLight) => {
    checkLightShouldAlive(component);
}, (component:DirectionLight) => {
    return getGameObject(component.index, DirectionLightData);
})

export var getDirectionLightPosition = requireCheckFunc((component:DirectionLight) => {
    checkLightShouldAlive(component);
}, (component:DirectionLight) => {
    return getPosition(component.index, ThreeDTransformData, GameObjectData, DirectionLightData);
})

export var getDirectionLightColorArr3 = requireCheckFunc((component:DirectionLight) => {
    checkLightShouldAlive(component);
}, (light:DirectionLight) => {
    return getColorArr3(light.index, DirectionLightData);
})

export var setDirectionLightColor = requireCheckFunc((component:DirectionLight) => {
    checkLightShouldAlive(component);
}, (light:DirectionLight, color:Color) => {
    setColor(light.index, color, DirectionLightData);
})

export var getDirectionLightIntensity = requireCheckFunc((component:DirectionLight) => {
    checkLightShouldAlive(component);
}, (light:DirectionLight) => {
    return getIntensity(light.index, DirectionLightData);
})

export var setDirectionLightIntensity = requireCheckFunc((component:DirectionLight) => {
    checkLightShouldAlive(component);
}, (light:DirectionLight, intensity:number) => {
    setIntensity(light.index, intensity, DirectionLightData);
})
