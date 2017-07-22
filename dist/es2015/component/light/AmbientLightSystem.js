import { AmbientLight } from "./AmbientLight";
import { disposeComponent as disposeSpecifyLightComponent, initData as initSpecifyLightData, setColor as setSpecifyLightColor, create as createSpecifyLight, addComponent as addSpecifyLightComponent, createDefaultColor } from "./SpecifyLightSystem";
import { AmbientLightData } from "./AmbientLightData";
import { createTypeArrays, getColor as getColorUtils, getColorArr3 as getColorArr3Utils, getColorDataSize } from "../../renderer/utils/light/ambientLightUtils";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { getAmbientLightBufferCount } from "../../renderer/utils/light/bufferUtils";
export var create = ensureFunc(function (light, AmbientLightData) {
    it("count should <= max count", function () {
        expect(AmbientLightData.count).lte(DataBufferConfig.ambientLightDataBufferCount);
    });
}, function (AmbientLightData) {
    var light = new AmbientLight();
    light = createSpecifyLight(light, AmbientLightData);
    return light;
});
export var getColor = getColorUtils;
export var getColorArr3 = getColorArr3Utils;
export var setColor = function (index, color, AmbientLightData) {
    setSpecifyLightColor(index, color, AmbientLightData.colors);
};
export var addComponent = function (component, gameObject) {
    addSpecifyLightComponent(component, gameObject, AmbientLightData);
};
export var disposeComponent = function (component) {
    disposeSpecifyLightComponent(component.index, AmbientLightData);
};
export var initData = function (AmbientLightData) {
    var count = getAmbientLightBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * getColorDataSize(), buffer = null;
    buffer = createSharedArrayBufferOrArrayBuffer(count * size);
    initSpecifyLightData(buffer, AmbientLightData);
    createTypeArrays(buffer, count, AmbientLightData);
    _setDefaultTypeArrData(count, AmbientLightData);
};
var _setDefaultTypeArrData = function (count, AmbientLightData) {
    var color = createDefaultColor();
    for (var i = 0; i < count; i++) {
        setColor(i, color, AmbientLightData);
    }
};
//# sourceMappingURL=AmbientLightSystem.js.map