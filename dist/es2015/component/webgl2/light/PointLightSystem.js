import { addComponent as addSpecifyLightComponent } from "../../light/SpecifyLightSystem";
import { WebGL2PointLightData } from "../../../renderer/webgl2/light/PointLightData";
import { disposeComponent as disposePointLightComponent } from "../../light/PointLightSystem";
export var addComponent = function (component, gameObject) {
    addSpecifyLightComponent(component, gameObject, WebGL2PointLightData);
};
export var disposeComponent = function (component) {
    disposePointLightComponent(component, WebGL2PointLightData);
};
//# sourceMappingURL=PointLightSystem.js.map