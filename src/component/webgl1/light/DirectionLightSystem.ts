import { Light } from "../../light/Light";
import { GameObject } from "../../../core/entityObject/gameObject/GameObject";
import {
    addComponent as addSpecifyLightComponent
} from "../../light/SpecifyLightSystem";
import { WebGL1DirectionLightData } from "../../../renderer/webgl1/light/DirectionLightData";
import { disposeComponent as disposeDirectionLightComponent } from "../../light/DirectionLightSystem";

export var addComponent = (component: Light, gameObject: GameObject) => {
    addSpecifyLightComponent(component, gameObject, WebGL1DirectionLightData);
}

export var disposeComponent = (component: Light) => {
    disposeDirectionLightComponent(component, WebGL1DirectionLightData);
}
