import { Light } from "../../light/Light";
import { GameObject } from "../../../core/entityObject/gameObject/GameObject";
import {
    addComponent as addSpecifyLightComponent
} from "../../light/SpecifyLightSystem";
import { WebGL2DirectionLightData } from "../../../renderer/webgl2/light/DirectionLightData";
import { disposeComponent as disposeDirectionLightComponent } from "../../light/DirectionLightSystem";

export var addComponent = (component: Light, gameObject: GameObject) => {
    addSpecifyLightComponent(component, gameObject, WebGL2DirectionLightData);
}

export var disposeComponent = (component: Light) => {
    disposeDirectionLightComponent(component, WebGL2DirectionLightData);
}
