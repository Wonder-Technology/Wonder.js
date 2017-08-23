import { addComponent as addSpecifyLightComponent } from "../../light/SpecifyLightSystem";
import { WebGL1DirectionLightData } from "../../../renderer/webgl1/light/DirectionLightData";
import { disposeComponent as disposeDirectionLightComponent } from "../../light/DirectionLightSystem";
export var addComponent = function (component, gameObject) {
    addSpecifyLightComponent(component, gameObject, WebGL1DirectionLightData);
};
export var disposeComponent = function (component) {
    disposeDirectionLightComponent(component, WebGL1DirectionLightData);
};
//# sourceMappingURL=DirectionLightSystem.js.map