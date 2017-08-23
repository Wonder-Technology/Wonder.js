import { addAddComponentHandle as addAddComponentHandleToMap, addDisposeHandle as addDisposeHandleToMap } from "../../ComponentSystem";
import { addComponent as addAmbientLightComponent, disposeComponent as disposeAmbientLightComponent, initData as initAmbientLightData } from "../../light/AmbientLightSystem";
import { initData as initWebGL1PointLightData } from "../../../renderer/webgl1/light/PointLightSystem";
import { initData as initWebGL1DirectionLightData } from "../../../renderer/webgl1/light/DirectionLightSystem";
import { addComponent as addDirectionLightComponent, disposeComponent as disposeDirectionLightComponent } from "../../webgl1/light/DirectionLightSystem";
import { addComponent as addPointLightComponent, disposeComponent as disposePointLightComponent } from "../../webgl1/light/PointLightSystem";
export var addAddComponentHandle = function (AmbientLight, DirectionLight, PointLight) {
    addAddComponentHandleToMap(AmbientLight, addAmbientLightComponent);
    addAddComponentHandleToMap(DirectionLight, addDirectionLightComponent);
    addAddComponentHandleToMap(PointLight, addPointLightComponent);
};
export var addDisposeHandle = function (AmbientLight, DirectionLight, PointLight) {
    addDisposeHandleToMap(AmbientLight, disposeAmbientLightComponent);
    addDisposeHandleToMap(DirectionLight, disposeDirectionLightComponent);
    addDisposeHandleToMap(PointLight, disposePointLightComponent);
};
export var initData = function (AmbientLightData, DirectionLightData, PointLightData) {
    initAmbientLightData(AmbientLightData);
    initWebGL1DirectionLightData(DirectionLightData);
    initWebGL1PointLightData(PointLightData);
};
//# sourceMappingURL=LightSystem.js.map