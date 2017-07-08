import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Light } from "./Light";
import { create, setColor, setIntensity } from "./DirectionLightSystem";
import { DirectionLightData } from "./DirectionLightData";
import { Color } from "../../structure/Color";

@registerClass("DirectionLight")
export class DirectionLight extends Light{
}

export var createDirectionLight = () => {
    return create(DirectionLightData);
}

export var setDirectionLightColor = (light:DirectionLight, color:Color) => {
    setColor(light.index, color, DirectionLightData);
}

export var setDirectionLightIntensity = (light:DirectionLight, intensity:number) => {
    setIntensity(light.index, intensity, DirectionLightData);
}
