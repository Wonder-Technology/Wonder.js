import {
    addAddComponentHandle as addAddComponentHandleToMap, addDisposeHandle as addDisposeHandleToMap
} from "../../ComponentSystem";
import {
    addComponent as addAmbientLightComponent, disposeComponent as disposeAmbientLightComponent,
    initData as initAmbientLightData
} from "../../light/AmbientLightSystem";
import {
    addComponent as addDirectionLightComponent, disposeComponent as disposeDirectionLightComponent,
    initData as initDirectionLightData
} from "../../light/DirectionLightSystem";
import { initData as initWebGL2PointLightData } from "../../../renderer/webgl2/light/PointLightSystem";
import {
    addComponent as addPointLightComponent,
    disposeComponent as disposePointLightComponent
} from "../../webgl2/light/PointLightSystem";

export var addAddComponentHandle = (AmbientLight: any, DirectionLight: any, PointLight:any) => {
    addAddComponentHandleToMap(AmbientLight, addAmbientLightComponent);
    addAddComponentHandleToMap(DirectionLight, addDirectionLightComponent);
    addAddComponentHandleToMap(PointLight, addPointLightComponent);
}

export var addDisposeHandle = (AmbientLight: any, DirectionLight: any, PointLight:any) => {
    addDisposeHandleToMap(AmbientLight, disposeAmbientLightComponent);
    addDisposeHandleToMap(DirectionLight, disposeDirectionLightComponent);
    addDisposeHandleToMap(PointLight, disposePointLightComponent);
}

export var initData = (AmbientLightData: any, DirectionLightData: any, PointLightData: any) => {
    initAmbientLightData(AmbientLightData);
    initDirectionLightData(DirectionLightData);
    initWebGL2PointLightData(PointLightData);
}
