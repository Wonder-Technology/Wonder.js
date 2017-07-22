import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { checkLightShouldAlive, Light } from "./Light";
import {
    create, getColor, getIntensity, getPosition, setColor,
    setIntensity
} from "./DirectionLightSystem";
import { DirectionLightData } from "./DirectionLightData";
import { Color } from "../../structure/Color";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { ThreeDTransformData } from "../transform/ThreeDTransformData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { getGameObject } from "./SpecifyLightSystem";

@registerClass("DirectionLight")
export class DirectionLight extends Light {
}

export var createDirectionLight = () => {
    return create(DirectionLightData);
}

export var getDirectionLightGameObject = requireCheckFunc((component: DirectionLight) => {
    checkLightShouldAlive(component);
}, (component: DirectionLight) => {
    return getGameObject(component.index, DirectionLightData);
})

export var getDirectionLightPosition = requireCheckFunc((component: DirectionLight) => {
    checkLightShouldAlive(component);
}, (component: DirectionLight) => {
    return getPosition(component.index, ThreeDTransformData, GameObjectData, DirectionLightData);
})

export var getDirectionLightColor = requireCheckFunc((component: DirectionLight) => {
    checkLightShouldAlive(component);
}, (light: DirectionLight) => {
    return getColor(light.index, DirectionLightData);
})

export var setDirectionLightColor = requireCheckFunc((component: DirectionLight) => {
    checkLightShouldAlive(component);
}, (light: DirectionLight, color: Color) => {
    setColor(light.index, color, DirectionLightData);
})

export var getDirectionLightIntensity = requireCheckFunc((component: DirectionLight) => {
    checkLightShouldAlive(component);
}, (light: DirectionLight) => {
    return getIntensity(light.index, DirectionLightData);
})

export var setDirectionLightIntensity = requireCheckFunc((component: DirectionLight) => {
    checkLightShouldAlive(component);
}, (light: DirectionLight, intensity: number) => {
    setIntensity(light.index, intensity, DirectionLightData);
})
