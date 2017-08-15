import { AmbientLight } from "./AmbientLight";
import { Color } from "../../structure/Color";
import {
    disposeComponent as disposeSpecifyLightComponent, initData as initSpecifyLightData,
    setColor as setSpecifyLightColor, create as createSpecifyLight, addComponent as addSpecifyLightComponent,
    createDefaultColor
} from "./SpecifyLightSystem";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Light } from "./Light";
import { AmbientLightData } from "./AmbientLightData";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { getAmbientLightBufferCount } from "../../renderer/utils/light/bufferUtils";
import {
    createTypeArrays, getColorArr3 as getColorArr3Utils,
    getColorDataSize
} from "../../renderer/utils/worker/render_file/light/ambientLightUtils";
import { getColor as getColorUtils } from "../../renderer/utils/light/ambientLightUtils";

export var create = ensureFunc((light: AmbientLight, AmbientLightData: any) => {
    it("count should <= max count", () => {
        expect(AmbientLightData.count).lte(DataBufferConfig.ambientLightDataBufferCount);
    })
}, (AmbientLightData: any) => {
    var light = new AmbientLight();

    light = createSpecifyLight(light, AmbientLightData);

    return light;
})

export var getColor = getColorUtils;

export var getColorArr3 = getColorArr3Utils;

export var setColor = (index: number, color: Color, AmbientLightData: any) => {
    setSpecifyLightColor(index, color, AmbientLightData.colors);
}

export var addComponent = (component: Light, gameObject: GameObject) => {
    addSpecifyLightComponent(component, gameObject, AmbientLightData);
}

export var disposeComponent = (component: Light) => {
    disposeSpecifyLightComponent(component.index, AmbientLightData);
}

export var initData = (AmbientLightData: any) => {
    var count = getAmbientLightBufferCount(),
        size = Float32Array.BYTES_PER_ELEMENT * getColorDataSize(),
        buffer: any = null;

    buffer = createSharedArrayBufferOrArrayBuffer(count * size);

    initSpecifyLightData(buffer, AmbientLightData);

    createTypeArrays(buffer, count, AmbientLightData);
    _setDefaultTypeArrData(count, AmbientLightData);
}

var _setDefaultTypeArrData = (count: number, AmbientLightData: any) => {
    var color = createDefaultColor();

    for (let i = 0; i < count; i++) {
        setColor(i, color, AmbientLightData);
    }
}
