import { Light } from "../../light/Light";
import { GameObject } from "../../../core/entityObject/gameObject/GameObject";
import {
    // disposeComponent as disposeSpecifyLightComponent,
    addComponent as addSpecifyLightComponent
} from "../../light/SpecifyLightSystem";
import { WebGL1PointLightData } from "../../../renderer/webgl1/light/PointLightData";
// import {
//     getConstant as getConstantUtils, getConstantDataSize, getLinearDataSize,
//     getLinear as getLinearUtils,
//     getQuadratic as getQuadraticUtils, getQuadraticDataSize, getRange as getRangeUtils, getRangeDataSize,
//     createTypeArrays, getColorArr3 as getColorArr3Utils,
//     getColorDataSize, getIntensity as getIntensityUtils, getIntensityDataSize
// } from "../../../renderer/utils/light/pointLightUtils";
// import { deleteOneItemBySwapAndReset } from "../../../utils/typeArrayUtils";
import { disposeComponent as disposePointLightComponent } from "../../light/PointLightSystem";

export var addComponent = (component: Light, gameObject: GameObject) => {
    addSpecifyLightComponent(component, gameObject, WebGL1PointLightData);
}

export var disposeComponent = (component: Light) => {
    disposePointLightComponent(component, WebGL1PointLightData);
}



