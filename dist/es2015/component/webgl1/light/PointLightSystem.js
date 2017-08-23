import { addComponent as addSpecifyLightComponent } from "../../light/SpecifyLightSystem";
import { WebGL1PointLightData } from "../../../renderer/webgl1/light/PointLightData";
import { disposeComponent as disposePointLightComponent } from "../../light/PointLightSystem";
export var addComponent = function (component, gameObject) {
    addSpecifyLightComponent(component, gameObject, WebGL1PointLightData);
};
export var disposeComponent = function (component) {
    disposePointLightComponent(component, WebGL1PointLightData);
};
//# sourceMappingURL=PointLightSystem.js.map