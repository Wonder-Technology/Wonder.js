import { addComponent as addSpecifyLightComponent } from "../../light/SpecifyLightSystem";
import { WebGL2DirectionLightData } from "../../../renderer/webgl2/light/DirectionLightData";
import { disposeComponent as disposeDirectionLightComponent } from "../../light/DirectionLightSystem";
export var addComponent = function (component, gameObject) {
    addSpecifyLightComponent(component, gameObject, WebGL2DirectionLightData);
};
export var disposeComponent = function (component) {
    disposeDirectionLightComponent(component, WebGL2DirectionLightData);
};
//# sourceMappingURL=DirectionLightSystem.js.map