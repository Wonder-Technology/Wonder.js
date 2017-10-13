import { Light } from "../../light/Light";
import { GameObject } from "../../../core/entityObject/gameObject/GameObject";
import {
    addComponent as addSpecifyLightComponent
} from "../../light/SpecifyLightSystem";
import { WebGL2PointLightData } from "../../../renderer/webgl2/light/PointLightData";
import { disposeComponent as disposePointLightComponent } from "../../light/PointLightSystem";

export const addComponent = (component: Light, gameObject: GameObject) => {
    addSpecifyLightComponent(component, gameObject, WebGL2PointLightData);
}

export const disposeComponent = (component: Light) => {
    disposePointLightComponent(component, WebGL2PointLightData);
}
