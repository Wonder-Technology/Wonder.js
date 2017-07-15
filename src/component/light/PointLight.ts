import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { checkLightShouldAlive, Light } from "./Light";
import {
    create, getColor, getConstant, getIntensity, getLinear, getPosition, getQuadratic, getRange, setColor, setConstant,
    setIntensity, setLinear, setQuadratic, setRange, setRangeLevel
} from "./PointLightSystem";
import { PointLightData } from "./PointLightData";
import { Color } from "../../structure/Color";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { ThreeDTransformData } from "../transform/ThreeDTransformData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { getGameObject } from "./SpecifyLightSystem";

@registerClass("PointLight")
export class PointLight extends Light {
}

export var createPointLight = () => {
    return create(PointLightData);
}

export var getPointLightGameObject = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (component: PointLight) => {
    return getGameObject(component.index, PointLightData);
})

export var getPointLightPosition = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (component: PointLight) => {
    return getPosition(component.index, ThreeDTransformData, GameObjectData, PointLightData);
})

export var getPointLightColor = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (light: PointLight) => {
    return getColor(light.index, PointLightData);
})

export var setPointLightColor = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (light: PointLight, color: Color) => {
    setColor(light.index, color, PointLightData);
})

export var getPointLightIntensity = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (light: PointLight) => {
    return getIntensity(light.index, PointLightData);
})

export var setPointLightIntensity = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (light: PointLight, value: number) => {
    setIntensity(light.index, value, PointLightData);
})


export var getPointLightConstant = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (light: PointLight) => {
    return getConstant(light.index, PointLightData);
})

export var setPointLightConstant = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (light: PointLight, value: number) => {
    setConstant(light.index, value, PointLightData);
})

export var getPointLightLinear = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (light: PointLight) => {
    return getLinear(light.index, PointLightData);
})

export var setPointLightLinear = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (light: PointLight, value: number) => {
    setLinear(light.index, value, PointLightData);
})

export var getPointLightQuadratic = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (light: PointLight) => {
    return getQuadratic(light.index, PointLightData);
})

export var setPointLightQuadratic = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (light: PointLight, value: number) => {
    setQuadratic(light.index, value, PointLightData);
})

export var getPointLightRange = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (light: PointLight) => {
    return getRange(light.index, PointLightData);
})

export var setPointLightRange = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (light: PointLight, value: number) => {
    setRange(light.index, value, PointLightData);
})

export var setPointLightRangeLevel = requireCheckFunc((component: PointLight) => {
    checkLightShouldAlive(component);
}, (light: PointLight, value: number) => {
    setRangeLevel(light.index, value, PointLightData);
})
