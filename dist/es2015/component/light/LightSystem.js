import { addAddComponentHandle as addAddComponentHandleToMap, addDisposeHandle as addDisposeHandleToMap } from "../ComponentSystem";
import { addComponent as addAmbientLightComponent, disposeComponent as disposeAmbientLightComponent, initData as initAmbientLightData } from "./AmbientLightSystem";
import { addComponent as addDirectionLightComponent, disposeComponent as disposeDirectionLightComponent, initData as initDirectionLightData } from "./DirectionLightSystem";
import { addComponent as addPointLightComponent, disposeComponent as disposePointLightComponent, initData as initPointLightData } from "./PointLightSystem";
import { PointLight } from "./PointLight";
export var addAddComponentHandle = function (AmbientLight, DirectionLight) {
    addAddComponentHandleToMap(AmbientLight, addAmbientLightComponent);
    addAddComponentHandleToMap(DirectionLight, addDirectionLightComponent);
    addAddComponentHandleToMap(PointLight, addPointLightComponent);
};
export var addDisposeHandle = function (AmbientLight, DirectionLight) {
    addDisposeHandleToMap(AmbientLight, disposeAmbientLightComponent);
    addDisposeHandleToMap(DirectionLight, disposeDirectionLightComponent);
    addDisposeHandleToMap(PointLight, disposePointLightComponent);
};
export var initData = function (AmbientLightData, DirectionLightData, PointLightData) {
    initAmbientLightData(AmbientLightData);
    initDirectionLightData(DirectionLightData);
    initPointLightData(PointLightData);
};
//# sourceMappingURL=LightSystem.js.map