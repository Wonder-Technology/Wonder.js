import {
    addAddComponentHandle as addAddComponentHandleToMap, addDisposeHandle as addDisposeHandleToMap
} from "../../ComponentSystem";
import {
    addComponent as addAmbientLightComponent, disposeComponent as disposeAmbientLightComponent,
    initData as initAmbientLightData
} from "../../light/AmbientLightSystem";
import { initData as initWebGL1PointLightData } from "../../../renderer/webgl1/light/PointLightSystem";
import { initData as initWebGL1DirectionLightData } from "../../../renderer/webgl1/light/DirectionLightSystem";
import {
    addComponent as addDirectionLightComponent,
    disposeComponent as disposeDirectionLightComponent
} from "../../webgl1/light/DirectionLightSystem";
import {
    addComponent as addPointLightComponent,
    disposeComponent as disposePointLightComponent
} from "../../webgl1/light/PointLightSystem";

export const addAddComponentHandle = (AmbientLight: any, DirectionLight: any, PointLight: any) => {
    addAddComponentHandleToMap(AmbientLight, addAmbientLightComponent);
    addAddComponentHandleToMap(DirectionLight, addDirectionLightComponent);
    addAddComponentHandleToMap(PointLight, addPointLightComponent);
}

export const addDisposeHandle = (AmbientLight: any, DirectionLight: any, PointLight: any) => {
    addDisposeHandleToMap(AmbientLight, disposeAmbientLightComponent);
    addDisposeHandleToMap(DirectionLight, disposeDirectionLightComponent);
    addDisposeHandleToMap(PointLight, disposePointLightComponent);
}

export const initData = (AmbientLightData: any, DirectionLightData: any, PointLightData: any) => {
    initAmbientLightData(AmbientLightData);
    initWebGL1DirectionLightData(DirectionLightData);
    initWebGL1PointLightData(PointLightData);
}
