import {
    addAddComponentHandle as addAddComponentHandleToMap, addDisposeHandle as addDisposeHandleToMap
} from "../ComponentSystem";
import {
    addComponent as addAmbientLightComponent, disposeComponent as disposeAmbientLightComponent,
    initData as initAmbientLightData
} from "./AmbientLightSystem";
import {
    addComponent as addDirectionLightComponent, disposeComponent as disposeDirectionLightComponent,
    initData as initDirectionLightData
} from "./DirectionLightSystem";
import {
    addComponent as addPointLightComponent, disposeComponent as disposePointLightComponent,
    initData as initPointLightData
} from "./PointLightSystem";
import { PointLight } from "./PointLight";

export var addAddComponentHandle = (AmbientLight: any, DirectionLight: any) => {
    addAddComponentHandleToMap(AmbientLight, addAmbientLightComponent);
    addAddComponentHandleToMap(DirectionLight, addDirectionLightComponent);
    addAddComponentHandleToMap(PointLight, addPointLightComponent);
}

export var addDisposeHandle = (AmbientLight: any, DirectionLight: any) => {
    addDisposeHandleToMap(AmbientLight, disposeAmbientLightComponent);
    addDisposeHandleToMap(DirectionLight, disposeDirectionLightComponent);
    addDisposeHandleToMap(PointLight, disposePointLightComponent);
}

export var initData = (AmbientLightData: any, DirectionLightData: any, PointLightData: any) => {
    initAmbientLightData(AmbientLightData);
    initDirectionLightData(DirectionLightData);
    initPointLightData(PointLightData);
}

