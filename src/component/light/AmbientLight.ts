import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { checkLightShouldAlive, Light } from "./Light";
import { create, getColorArr3, setColor } from "./AmbientLightSystem";
import { AmbientLightData } from "./AmbientLightData";
import { Color } from "../../structure/Color";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { getGameObject } from "../../renderer/utils/light/specifyLightUtils";

@registerClass("AmbientLight")
export class AmbientLight extends Light{
}

export var createAmbientLight = () => {
    return create(AmbientLightData);
}

export var getAmbientLightGameObject = requireCheckFunc((component:AmbientLight) => {
    checkLightShouldAlive(component);
}, (component:AmbientLight) => {
    return getGameObject(component.index, AmbientLightData);
})

export var getAmbientLightColorArr3 = (light:AmbientLight) => {
    return getColorArr3(light.index, AmbientLightData);
}

export var setAmbientLightColor = (light:AmbientLight, color:Color) => {
    setColor(light.index, color, AmbientLightData);
}
