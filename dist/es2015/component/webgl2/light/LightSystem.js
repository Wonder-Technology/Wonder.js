import { addAddComponentHandle as addAddComponentHandleToMap, addDisposeHandle as addDisposeHandleToMap } from "../../ComponentSystem";
import { addComponent as addAmbientLightComponent, disposeComponent as disposeAmbientLightComponent, initData as initAmbientLightData } from "../../light/AmbientLightSystem";
import { initData as initWebGL2DirectionLightData } from "../../../renderer/webgl2/light/DirectionLightSystem";
import { initData as initWebGL2PointLightData } from "../../../renderer/webgl2/light/PointLightSystem";
import { addComponent as addPointLightComponent, disposeComponent as disposePointLightComponent } from "../../webgl2/light/PointLightSystem";
import { addComponent as addDirectionLightComponent, disposeComponent as disposeDirectionLightComponent } from "./DirectionLightSystem";
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
    initWebGL2DirectionLightData(DirectionLightData);
    initWebGL2PointLightData(PointLightData);
};
//# sourceMappingURL=LightSystem.js.map