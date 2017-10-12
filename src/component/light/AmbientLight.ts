import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { checkLightShouldAlive, Light } from "./Light";
import { create, getColor, setColor } from "./AmbientLightSystem";
import { AmbientLightData } from "./AmbientLightData";
import { Color } from "../../structure/Color";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { getGameObject } from "./SpecifyLightSystem";

@registerClass("AmbientLight")
export class AmbientLight extends Light {
}

export const createAmbientLight = () => {
    return create(AmbientLightData);
}

export const getAmbientLightGameObject = requireCheckFunc((component: AmbientLight) => {
    checkLightShouldAlive(component);
}, (component: AmbientLight) => {
    return getGameObject(component.index, AmbientLightData);
})

export const getAmbientLightColor = (light: AmbientLight) => {
    return getColor(light.index, AmbientLightData);
}

export const setAmbientLightColor = (light: AmbientLight, color: Color) => {
    setColor(light.index, color, AmbientLightData);
}
