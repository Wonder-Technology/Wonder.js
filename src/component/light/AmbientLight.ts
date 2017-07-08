import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Light } from "./Light";
import { create, setColor } from "./AmbientLightSystem";
import { AmbientLightData } from "./AmbientLightData";
import { Color } from "../../structure/Color";

@registerClass("AmbientLight")
export class AmbientLight extends Light{
}

export var createAmbientLight = () => {
    return create(AmbientLightData);
}

export var setAmbientLightColor = (light:AmbientLight, color:Color) => {
    setColor(light.index, color, AmbientLightData);
}
