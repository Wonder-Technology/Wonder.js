import { AmbientLight } from "./AmbientLight";
// import {
//     create as createLight
// } from "./LightSystem";
import { Color } from "../../structure/Color";
import {
    disposeComponent as disposeSpecifyLightComponent, initData as initSpecifyLightData,
    getColorArr3 as getSpecifyLightColorArr3,
    setColor as setSpecifyLightColor, create as createSpecifyLight, addComponent as addSpecifyLightComponent
} from "./SpecifyLightSystem";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Light } from "./Light";
import { AmbientLightData } from "./AmbientLightData";
import { getRenderData as getRenderDataUtils } from "../../renderer/utils/light/ambientLightUtils";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";

export var create = ensureFunc((light: AmbientLight, AmbientLightData: any) => {
    it("count should <= 1", () => {
        expect(AmbientLightData.count).lte(1);
    })
}, (AmbientLightData: any) => {
    var light = new AmbientLight();

    light = createSpecifyLight(light, AmbientLightData);

    _setDefaultRenderData(light.index, AmbientLightData);

    return light;
})

var _setDefaultRenderData = (index: number, AmbientLightData: any) => {
    AmbientLightData.renderDataMap[index] = {
        colorArr: AmbientLightData.defaultColorArr
    }
}

export var getRenderData = (index: number, AmbientLightData: any) => {
    return getRenderDataUtils(index, AmbientLightData);
}

export var getColorArr3 = (index: number, AmbientLightData: any) => {
    return getSpecifyLightColorArr3(index, AmbientLightData);
}

export var setColor = (index: number, color: Color, AmbientLightData: any) => {
    setSpecifyLightColor(index, color, AmbientLightData);
}

export var addComponent = (component: Light, gameObject: GameObject) => {
    addSpecifyLightComponent(component, gameObject, AmbientLightData);
}

export var disposeComponent = (component: Light) => {
    disposeSpecifyLightComponent(component.index, AmbientLightData);
}

export var initData = (AmbientLightData: any) => {
    initSpecifyLightData(AmbientLightData);
}
