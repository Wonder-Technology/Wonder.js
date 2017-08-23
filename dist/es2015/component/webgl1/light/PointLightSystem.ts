import { Light } from "../../light/Light";
import { GameObject } from "../../../core/entityObject/gameObject/GameObject";
import {
    addComponent as addSpecifyLightComponent
} from "../../light/SpecifyLightSystem";
import { WebGL1PointLightData } from "../../../renderer/webgl1/light/PointLightData";
import { disposeComponent as disposePointLightComponent } from "../../light/PointLightSystem";

export var addComponent = (component: Light, gameObject: GameObject) => {
    addSpecifyLightComponent(component, gameObject, WebGL1PointLightData);
}

export var disposeComponent = (component: Light) => {
    disposePointLightComponent(component, WebGL1PointLightData);
}
