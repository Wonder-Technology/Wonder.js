import { Light } from "../../light/Light";
import { GameObject } from "../../../core/entityObject/gameObject/GameObject";
import {
    addComponent as addSpecifyLightComponent
} from "../../light/SpecifyLightSystem";
import { WebGL1DirectionLightData } from "../../../renderer/webgl1/light/DirectionLightData";
import { disposeComponent as disposeDirectionLightComponent } from "../../light/DirectionLightSystem";

export const addComponent = (component: Light, gameObject: GameObject) => {
    addSpecifyLightComponent(component, gameObject, WebGL1DirectionLightData);
}

export const disposeComponent = (component: Light) => {
    disposeDirectionLightComponent(component, WebGL1DirectionLightData);
}
