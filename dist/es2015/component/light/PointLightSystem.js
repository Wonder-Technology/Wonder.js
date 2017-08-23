import { PointLight } from "./PointLight";
import { create as createSpecifyLight, disposeComponent as disposeSpecifyLightComponent, initData as initSpecifyLightData, setColor as setSpecifyLightColor, createDefaultColor, getPosition as getSpecifyLightPosition, markDirty, bindChangePositionEvent } from "./SpecifyLightSystem";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { getColor3Data } from "../utils/operateBufferDataUtils";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { deleteOneItemBySwapAndReset, setSingleValue } from "../../utils/typeArrayUtils";
import { getConstant as getConstantUtils, getLinear as getLinearUtils, getQuadratic as getQuadraticUtils, getRange as getRangeUtils, createTypeArrays, getColorArr3 as getColorArr3Utils, getIntensity as getIntensityUtils, isColorDirty as isColorDirtyUtils, isIntensityDirty as isIntensityDirtyUtils, isAttenuationDirty as isAttenuationDirtyUtils, cleanColorDirty as cleanColorDirtyUtils, cleanIntensityDirty as cleanIntensityDirtyUtils, cleanAttenuationDirty as cleanAttenuationDirtyUtils, cleanPositionDirty as cleanPositionDirtyUtils, isPositionDirty as isPositionDirtyUtils, getColorDataSize, getIntensityDataSize, getConstantDataSize, getQuadraticDataSize, getRangeDataSize } from "../../renderer/utils/worker/render_file/light/pointLightUtils";
import { Log } from "../../utils/Log";
import { getPointLightBufferCount } from "../../renderer/utils/light/bufferUtils";
import { isInit } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { getDirtyDataSize } from "../../renderer/utils/worker/render_file/light/specifyLightUtils";
import { getLinearDataSize } from "../../renderer/utils/worker/render_file/light/pointLightUtils";
export var create = ensureFunc(function (light, PointLightData) {
    it("shouldn't create after Director->init", function () {
        expect(isInit(DirectorData)).false;
    });
}, function (PointLightData) {
    var light = new PointLight();
    light = createSpecifyLight(light, PointLightData);
    return light;
});
export var getPosition = function (index, ThreeDTransformData, GameObjectData, PointLightData) {
    return getSpecifyLightPosition(index, ThreeDTransformData, GameObjectData, PointLightData);
};
export var getAllPositionData = function (ThreeDTransformData, GameObjectData, PointLightData) {
    var positionArr = [];
    for (var i = 0, count = PointLightData.count; i < count; i++) {
        positionArr.push(getPosition(i, ThreeDTransformData, GameObjectData, PointLightData).values);
    }
    return positionArr;
};
export var getColor = function (index, PointLightData) {
    return getColor3Data(index, PointLightData.colors);
};
export var getColorArr3 = getColorArr3Utils;
export var setColor = function (index, color, PointLightData) {
    setSpecifyLightColor(index, color, PointLightData.colors);
    markDirty(index, PointLightData.isColorDirtys);
};
export var getIntensity = getIntensityUtils;
export var setIntensity = function (index, value, PointLightData) {
    setSingleValue(PointLightData.intensities, index, value);
    markDirty(index, PointLightData.isIntensityDirtys);
};
export var getConstant = getConstantUtils;
export var setConstant = function (index, value, PointLightData) {
    setSingleValue(PointLightData.constants, index, value);
    markDirty(index, PointLightData.isAttenuationDirtys);
};
export var getLinear = getLinearUtils;
export var setLinear = function (index, value, PointLightData) {
    setSingleValue(PointLightData.linears, index, value);
    markDirty(index, PointLightData.isAttenuationDirtys);
};
export var getQuadratic = getQuadraticUtils;
export var setQuadratic = function (index, value, PointLightData) {
    setSingleValue(PointLightData.quadratics, index, value);
    markDirty(index, PointLightData.isAttenuationDirtys);
};
export var getRange = getRangeUtils;
export var setRange = function (index, value, PointLightData) {
    setSingleValue(PointLightData.ranges, index, value);
    markDirty(index, PointLightData.isAttenuationDirtys);
};
export var setRangeLevel = function (index, value, PointLightData) {
    switch (value) {
        case 0:
            setRange(index, 7, PointLightData);
            setLinear(index, 0.7, PointLightData);
            setQuadratic(index, 1.8, PointLightData);
            break;
        case 1:
            setRange(index, 13, PointLightData);
            setLinear(index, 0.35, PointLightData);
            setQuadratic(index, 0.44, PointLightData);
            break;
        case 2:
            setRange(index, 20, PointLightData);
            setLinear(index, 0.22, PointLightData);
            setQuadratic(index, 0.20, PointLightData);
            break;
        case 3:
            setRange(index, 32, PointLightData);
            setLinear(index, 0.14, PointLightData);
            setQuadratic(index, 0.07, PointLightData);
            break;
        case 4:
            setRange(index, 50, PointLightData);
            setLinear(index, 0.09, PointLightData);
            setQuadratic(index, 0.032, PointLightData);
            break;
        case 5:
            setRange(index, 65, PointLightData);
            setLinear(index, 0.07, PointLightData);
            setQuadratic(index, 0.017, PointLightData);
            break;
        case 6:
            setRange(index, 100, PointLightData);
            setLinear(index, 0.045, PointLightData);
            setQuadratic(index, 0.0075, PointLightData);
            break;
        case 7:
            setRange(index, 160, PointLightData);
            setLinear(index, 0.027, PointLightData);
            setQuadratic(index, 0.0028, PointLightData);
            break;
        case 8:
            setRange(index, 200, PointLightData);
            setLinear(index, 0.022, PointLightData);
            setQuadratic(index, 0.0019, PointLightData);
            break;
        case 9:
            setRange(index, 325, PointLightData);
            setLinear(index, 0.014, PointLightData);
            setQuadratic(index, 0.0007, PointLightData);
            break;
        case 10:
            setRange(index, 600, PointLightData);
            setLinear(index, 0.007, PointLightData);
            setQuadratic(index, 0.0002, PointLightData);
            break;
        case 11:
            setRange(index, 3250, PointLightData);
            setLinear(index, 0.0014, PointLightData);
            setQuadratic(index, 0.000007, PointLightData);
            break;
        default:
            Log.error(true, "over point light range");
            break;
    }
    markDirty(index, PointLightData.isAttenuationDirtys);
};
export var initDataHelper = function (PointLightData) {
    var count = getPointLightBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() + getIntensityDataSize() + getConstantDataSize() + getLinearDataSize() + getQuadraticDataSize() + getRangeDataSize()) + Uint8Array.BYTES_PER_ELEMENT * (getDirtyDataSize() * 4), buffer = null;
    buffer = createSharedArrayBufferOrArrayBuffer(count * size);
    initSpecifyLightData(buffer, PointLightData);
    createTypeArrays(buffer, count, PointLightData);
    PointLightData.defaultIntensity = 1;
    PointLightData.defaultConstant = 1;
    PointLightData.defaultLinear = 0.07;
    PointLightData.defaultQuadratic = 0.017;
    PointLightData.defaultRange = 65;
    _setDefaultTypeArrData(count, PointLightData);
};
var _setDefaultTypeArrData = function (count, PointLightData) {
    var color = createDefaultColor(), intensity = PointLightData.defaultIntensity, constant = PointLightData.defaultConstant, linear = PointLightData.defaultLinear, quadratic = PointLightData.defaultQuadratic, range = PointLightData.defaultRange;
    for (var i = 0; i < count; i++) {
        setColor(i, color, PointLightData);
        setIntensity(i, intensity, PointLightData);
        setConstant(i, constant, PointLightData);
        setLinear(i, linear, PointLightData);
        setQuadratic(i, quadratic, PointLightData);
        setRange(i, range, PointLightData);
    }
};
export var disposeComponent = function (component, PointLightData) {
    var intensityDataSize = getIntensityDataSize(), constantDataSize = getConstantDataSize(), linearDataSize = getLinearDataSize(), quadraticDataSize = getQuadraticDataSize(), rangeDataSize = getRangeDataSize(), dirtyDataSize = getDirtyDataSize(), sourceIndex = component.index, lastComponentIndex = null;
    lastComponentIndex = disposeSpecifyLightComponent(sourceIndex, PointLightData);
    deleteOneItemBySwapAndReset(sourceIndex * intensityDataSize, lastComponentIndex * intensityDataSize, PointLightData.intensities, PointLightData.defaultIntensity);
    deleteOneItemBySwapAndReset(sourceIndex * constantDataSize, lastComponentIndex * constantDataSize, PointLightData.constants, PointLightData.defaultConstant);
    deleteOneItemBySwapAndReset(sourceIndex * linearDataSize, lastComponentIndex * linearDataSize, PointLightData.linears, PointLightData.defaultLinear);
    deleteOneItemBySwapAndReset(sourceIndex * quadraticDataSize, lastComponentIndex * quadraticDataSize, PointLightData.quadratics, PointLightData.defaultQuadratic);
    deleteOneItemBySwapAndReset(sourceIndex * rangeDataSize, lastComponentIndex * rangeDataSize, PointLightData.ranges, PointLightData.defaultRange);
    deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, PointLightData.isPositionDirtys, PointLightData.defaultDirty);
    deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, PointLightData.isColorDirtys, PointLightData.defaultDirty);
    deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, PointLightData.isIntensityDirtys, PointLightData.defaultDirty);
    deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, PointLightData.isAttenuationDirtys, PointLightData.defaultDirty);
    return lastComponentIndex;
};
export var init = function (PointLightData, state) {
    return bindChangePositionEvent(PointLightData, state);
};
export var isPositionDirty = isPositionDirtyUtils;
export var isColorDirty = isColorDirtyUtils;
export var isIntensityDirty = isIntensityDirtyUtils;
export var isAttenuationDirty = isAttenuationDirtyUtils;
export var cleanPositionDirty = cleanPositionDirtyUtils;
export var cleanColorDirty = cleanColorDirtyUtils;
export var cleanIntensityDirty = cleanIntensityDirtyUtils;
export var cleanAttenuationDirty = cleanAttenuationDirtyUtils;
//# sourceMappingURL=PointLightSystem.js.map