import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { checkLightShouldAlive, Light } from "./Light";
import {
    create, getColor, getIntensity, getPosition, setColor,
    setIntensity
} from "./DirectionLightSystem";
import { Color } from "../../structure/Color";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { ThreeDTransformData } from "../transform/ThreeDTransformData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { getGameObject } from "./SpecifyLightSystem";
import { WebGL2DirectionLightData } from "../../renderer/webgl2/light/DirectionLightData";
import { WebGL1DirectionLightData } from "../../renderer/webgl1/light/DirectionLightData";
import { isWebgl1 } from "../../renderer/device/WebGLDetectSystem";

@registerClass("DirectionLight")
export class DirectionLight extends Light {
}

export var createDirectionLight = null;

export var getDirectionLightGameObject = null;

export var getDirectionLightPosition = null;

export var getDirectionLightColor = null;

export var setDirectionLightColor = null;

export var getDirectionLightIntensity = null;

export var setDirectionLightIntensity = null;

if (isWebgl1()) {
    createDirectionLight = () => {
        return create(WebGL1DirectionLightData);
    }

    getDirectionLightGameObject = requireCheckFunc((component: DirectionLight) => {
        checkLightShouldAlive(component);
    }, (component: DirectionLight) => {
        return getGameObject(component.index, WebGL1DirectionLightData);
    })

    getDirectionLightPosition = requireCheckFunc((component: DirectionLight) => {
        checkLightShouldAlive(component);
    }, (component: DirectionLight) => {
        return getPosition(component.index, ThreeDTransformData, GameObjectData, WebGL1DirectionLightData);
    })

    getDirectionLightColor = requireCheckFunc((component: DirectionLight) => {
        checkLightShouldAlive(component);
    }, (light: DirectionLight) => {
        return getColor(light.index, WebGL1DirectionLightData);
    })

    setDirectionLightColor = requireCheckFunc((component: DirectionLight) => {
        checkLightShouldAlive(component);
    }, (light: DirectionLight, color: Color) => {
        setColor(light.index, color, WebGL1DirectionLightData);
    })

    getDirectionLightIntensity = requireCheckFunc((component: DirectionLight) => {
        checkLightShouldAlive(component);
    }, (light: DirectionLight) => {
        return getIntensity(light.index, WebGL1DirectionLightData);
    })

    setDirectionLightIntensity = requireCheckFunc((component: DirectionLight) => {
        checkLightShouldAlive(component);
    }, (light: DirectionLight, value: number) => {
        setIntensity(light.index, value, WebGL1DirectionLightData);
    })
}
else {
    createDirectionLight = () => {
        return create(WebGL2DirectionLightData);
    }

    getDirectionLightGameObject = requireCheckFunc((component: DirectionLight) => {
        checkLightShouldAlive(component);
    }, (component: DirectionLight) => {
        return getGameObject(component.index, WebGL2DirectionLightData);
    })

    getDirectionLightPosition = requireCheckFunc((component: DirectionLight) => {
        checkLightShouldAlive(component);
    }, (component: DirectionLight) => {
        return getPosition(component.index, ThreeDTransformData, GameObjectData, WebGL2DirectionLightData);
    })

    getDirectionLightColor = requireCheckFunc((component: DirectionLight) => {
        checkLightShouldAlive(component);
    }, (light: DirectionLight) => {
        return getColor(light.index, WebGL2DirectionLightData);
    })

    setDirectionLightColor = requireCheckFunc((component: DirectionLight) => {
        checkLightShouldAlive(component);
    }, (light: DirectionLight, color: Color) => {
        setColor(light.index, color, WebGL2DirectionLightData);
    })

    getDirectionLightIntensity = requireCheckFunc((component: DirectionLight) => {
        checkLightShouldAlive(component);
    }, (light: DirectionLight) => {
        return getIntensity(light.index, WebGL2DirectionLightData);
    })

    setDirectionLightIntensity = requireCheckFunc((component: DirectionLight) => {
        checkLightShouldAlive(component);
    }, (light: DirectionLight, value: number) => {
        setIntensity(light.index, value, WebGL2DirectionLightData);
    })
}
