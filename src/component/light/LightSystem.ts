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
    addComponent as addPointLightComponent, disposeComponent as disposePointLightComponent
} from "./PointLightSystem";
import { PointLight } from "./PointLight";
import { isWebgl1 } from "../../renderer/device/WebGLDetectSystem";
import { initData as initWebGL1PointLightData } from "../../renderer/webgl1/light/PointLightSystem";
import { initData as initWebGL2PointLightData } from "../../renderer/webgl2/light/PointLightSystem";

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

export var initData = null;

if(isWebgl1()){
    initData = (AmbientLightData: any, DirectionLightData: any, PointLightData: any) => {
        initAmbientLightData(AmbientLightData);
        initDirectionLightData(DirectionLightData);
        initWebGL1PointLightData(PointLightData);
    }
}
else{
    initData = (AmbientLightData: any, DirectionLightData: any, PointLightData: any) => {
        initAmbientLightData(AmbientLightData);
        initDirectionLightData(DirectionLightData);
        initWebGL2PointLightData(PointLightData);
    }
}
