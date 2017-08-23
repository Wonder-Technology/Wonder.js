import { AmbientLight } from "./AmbientLight";
import { disposeComponent as disposeSpecifyLightComponent, initData as initSpecifyLightData, setColor as setSpecifyLightColor, create as createSpecifyLight, addComponent as addSpecifyLightComponent, createDefaultColor, markDirty } from "./SpecifyLightSystem";
import { AmbientLightData } from "./AmbientLightData";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { getAmbientLightBufferCount } from "../../renderer/utils/light/bufferUtils";
import { cleanColorDirty as cleanColorDirtyUtils, createTypeArrays, getColorArr3 as getColorArr3Utils, getColorDataSize, isColorDirty as isColorDirtyUtils } from "../../renderer/utils/worker/render_file/light/ambientLightUtils";
import { getColor as getColorUtils } from "../../renderer/utils/light/ambientLightUtils";
import { getDirtyDataSize } from "../../renderer/utils/worker/render_file/light/specifyLightUtils";
import { DirectorData } from "../../core/DirectorData";
import { isInit } from "../../core/DirectorSystem";
export var create = ensureFunc(function (light, AmbientLightData) {
    it("shouldn't create after Director->init", function () {
        expect(isInit(DirectorData)).false;
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
    markDirty(index, AmbientLightData.isColorDirtys);
};
export var addComponent = function (component, gameObject) {
    addSpecifyLightComponent(component, gameObject, AmbientLightData);
};
export var disposeComponent = requireCheckFunc(function () {
    it("should only has 1 ambient light", function () {
        expect(AmbientLightData.count).equal(1);
    });
}, function (component) {
    var sourceIndex = component.index;
    disposeSpecifyLightComponent(component.index, AmbientLightData);
    AmbientLightData.isColorDirtys[0] = AmbientLightData.defaultDirty;
});
export var initData = function (AmbientLightData) {
    var count = getAmbientLightBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * getColorDataSize() + Uint8Array.BYTES_PER_ELEMENT * getDirtyDataSize(), buffer = null;
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
export var isColorDirty = isColorDirtyUtils;
export var cleanColorDirty = cleanColorDirtyUtils;
//# sourceMappingURL=AmbientLightSystem.js.map