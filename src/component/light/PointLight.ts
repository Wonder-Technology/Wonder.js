import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { checkLightShouldAlive, Light } from "./Light";
import {
    create, getColor, getConstant, getIntensity, getLinear, getPosition, getQuadratic, getRange, setColor, setConstant,
    setIntensity, setLinear, setQuadratic, setRange, setRangeLevel
} from "./PointLightSystem";
import { Color } from "../../structure/Color";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { ThreeDTransformData } from "../transform/ThreeDTransformData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { getGameObject } from "./SpecifyLightSystem";
import { isWebgl1 } from "../../renderer/device/WebGLDetectSystem";
import { WebGL1PointLightData } from "../../renderer/webgl1/light/PointLightData";
import { WebGL2PointLightData } from "../../renderer/webgl2/light/PointLightData";

@registerClass("PointLight")
export class PointLight extends Light {
}

export var createPointLight = null;

export var getPointLightGameObject = null;

export var getPointLightPosition = null;

export var getPointLightColor = null;

export var setPointLightColor = null;

export var getPointLightIntensity =  null;

export var setPointLightIntensity =  null;

export var getPointLightConstant =  null;

export var setPointLightConstant = null;

export var getPointLightLinear = null;

export var setPointLightLinear = null;

export var getPointLightQuadratic = null;

export var setPointLightQuadratic = null;

export var getPointLightRange = null;

export var setPointLightRange = null;

export var setPointLightRangeLevel = null;

if(isWebgl1()){
    createPointLight = () => {
        return create(WebGL1PointLightData);
    }

    getPointLightGameObject = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (component: PointLight) => {
        return getGameObject(component.index, WebGL1PointLightData);
    })

    getPointLightPosition = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (component: PointLight) => {
        return getPosition(component.index, ThreeDTransformData, GameObjectData, WebGL1PointLightData);
    })

    getPointLightColor = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight) => {
        return getColor(light.index, WebGL1PointLightData);
    })

    setPointLightColor = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight, color: Color) => {
        setColor(light.index, color, WebGL1PointLightData);
    })

    getPointLightIntensity = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight) => {
        return getIntensity(light.index, WebGL1PointLightData);
    })

    setPointLightIntensity = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight, value: number) => {
        setIntensity(light.index, value, WebGL1PointLightData);
    })

    getPointLightConstant = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight) => {
        return getConstant(light.index, WebGL1PointLightData);
    })

    setPointLightConstant = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight, value: number) => {
        setConstant(light.index, value, WebGL1PointLightData);
    })

    getPointLightLinear = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight) => {
        return getLinear(light.index, WebGL1PointLightData);
    })

    setPointLightLinear = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight, value: number) => {
        setLinear(light.index, value, WebGL1PointLightData);
    })

    getPointLightQuadratic = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight) => {
        return getQuadratic(light.index, WebGL1PointLightData);
    })

    setPointLightQuadratic = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight, value: number) => {
        setQuadratic(light.index, value, WebGL1PointLightData);
    })

    getPointLightRange = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight) => {
        return getRange(light.index, WebGL1PointLightData);
    })

    setPointLightRange = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight, value: number) => {
        setRange(light.index, value, WebGL1PointLightData);
    })

    setPointLightRangeLevel = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight, value: number) => {
        setRangeLevel(light.index, value, WebGL1PointLightData);
    })
}
else{
    createPointLight = () => {
        return create(WebGL2PointLightData);
    }

    getPointLightGameObject = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (component: PointLight) => {
        return getGameObject(component.index, WebGL2PointLightData);
    })

    getPointLightPosition = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (component: PointLight) => {
        return getPosition(component.index, ThreeDTransformData, GameObjectData, WebGL2PointLightData);
    })

    getPointLightColor = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight) => {
        return getColor(light.index, WebGL2PointLightData);
    })

    setPointLightColor = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight, color: Color) => {
        setColor(light.index, color, WebGL2PointLightData);
    })

    getPointLightIntensity = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight) => {
        return getIntensity(light.index, WebGL2PointLightData);
    })

    setPointLightIntensity = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight, value: number) => {
        setIntensity(light.index, value, WebGL2PointLightData);
    })

    getPointLightConstant = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight) => {
        return getConstant(light.index, WebGL2PointLightData);
    })

    setPointLightConstant = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight, value: number) => {
        setConstant(light.index, value, WebGL2PointLightData);
    })

    getPointLightLinear = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight) => {
        return getLinear(light.index, WebGL2PointLightData);
    })

    setPointLightLinear = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight, value: number) => {
        setLinear(light.index, value, WebGL2PointLightData);
    })

    getPointLightQuadratic = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight) => {
        return getQuadratic(light.index, WebGL2PointLightData);
    })

    setPointLightQuadratic = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight, value: number) => {
        setQuadratic(light.index, value, WebGL2PointLightData);
    })

    getPointLightRange = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight) => {
        return getRange(light.index, WebGL2PointLightData);
    })

    setPointLightRange = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight, value: number) => {
        setRange(light.index, value, WebGL2PointLightData);
    })

    setPointLightRangeLevel = requireCheckFunc((component: PointLight) => {
        checkLightShouldAlive(component);
    }, (light: PointLight, value: number) => {
        setRangeLevel(light.index, value, WebGL2PointLightData);
    })
}
