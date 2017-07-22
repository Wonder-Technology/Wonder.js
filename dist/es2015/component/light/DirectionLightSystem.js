import { DirectionLight } from "./DirectionLight";
import { create as createSpecifyLight, disposeComponent as disposeSpecifyLightComponent, initData as initSpecifyLightData, setColor as setSpecifyLightColor, addComponent as addSpecifyLightComponent, createDefaultColor, getPosition as getSpecifyLightPosition } from "./SpecifyLightSystem";
import { DirectionLightData } from "./DirectionLightData";
import { createTypeArrays, getColorArr3 as getColorArr3Utils, getColorDataSize, getIntensity as getIntensityUtils, getIntensityDataSize } from "../../renderer/utils/light/directionLightUtils";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { getColor3Data } from "../utils/operateBufferDataUtils";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { deleteOneItemBySwapAndReset, setTypeArrayValue } from "../../utils/typeArrayUtils";
import { getDirectionLightBufferCount } from "../../renderer/utils/light/bufferUtils";
export var create = ensureFunc(function (light, DirectionLightData) {
    it("count should <= max count", function () {
        expect(DirectionLightData.count).lte(DataBufferConfig.directionLightDataBufferCount);
    });
}, function (DirectionLightData) {
    var light = new DirectionLight();
    light = createSpecifyLight(light, DirectionLightData);
    return light;
});
export var getPosition = function (index, ThreeDTransformData, GameObjectData, DirectionLightData) {
    return getSpecifyLightPosition(index, ThreeDTransformData, GameObjectData, DirectionLightData);
};
export var getAllPositionData = function (ThreeDTransformData, GameObjectData, DirectionLightData) {
    var positionArr = [];
    for (var i = 0, count = DirectionLightData.count; i < count; i++) {
        positionArr.push(getPosition(i, ThreeDTransformData, GameObjectData, DirectionLightData).values);
    }
    return positionArr;
};
export var getColor = function (index, DirectionLightData) {
    return getColor3Data(index, DirectionLightData.colors);
};
export var getColorArr3 = getColorArr3Utils;
export var setColor = function (index, color, DirectionLightData) {
    setSpecifyLightColor(index, color, DirectionLightData.colors);
};
export var getIntensity = getIntensityUtils;
export var setIntensity = function (index, intensity, DirectionLightData) {
    var size = getIntensityDataSize(), i = index * size;
    setTypeArrayValue(DirectionLightData.intensities, i, intensity);
};
export var addComponent = function (component, gameObject) {
    addSpecifyLightComponent(component, gameObject, DirectionLightData);
};
export var disposeComponent = function (component) {
    var intensityDataSize = getIntensityDataSize(), sourceIndex = component.index, lastComponentIndex = null;
    lastComponentIndex = disposeSpecifyLightComponent(sourceIndex, DirectionLightData);
    deleteOneItemBySwapAndReset(sourceIndex * intensityDataSize, lastComponentIndex * intensityDataSize, DirectionLightData.intensities, DirectionLightData.defaultIntensity);
};
export var initData = function (DirectionLightData) {
    var count = getDirectionLightBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() + getIntensityDataSize()), buffer = null;
    buffer = createSharedArrayBufferOrArrayBuffer(count * size);
    initSpecifyLightData(buffer, DirectionLightData);
    createTypeArrays(buffer, count, DirectionLightData);
    DirectionLightData.defaultIntensity = 1;
    _setDefaultTypeArrData(count, DirectionLightData);
    DirectionLightData.lightGLSLDataStructureMemberNameArr = [
        {
            position: "u_directionLights[0].position",
            color: "u_directionLights[0].color",
            intensity: "u_directionLights[0].intensity"
        }, {
            position: "u_directionLights[1].position",
            color: "u_directionLights[1].color",
            intensity: "u_directionLights[1].intensity"
        }, {
            position: "u_directionLights[2].position",
            color: "u_directionLights[2].color",
            intensity: "u_directionLights[2].intensity"
        }, {
            position: "u_directionLights[3].position",
            color: "u_directionLights[3].color",
            intensity: "u_directionLights[3].intensity"
        }
    ];
};
var _setDefaultTypeArrData = function (count, DirectionLightData) {
    var color = createDefaultColor(), intensity = DirectionLightData.defaultIntensity;
    for (var i = 0; i < count; i++) {
        setColor(i, color, DirectionLightData);
        setIntensity(i, intensity, DirectionLightData);
    }
};
//# sourceMappingURL=DirectionLightSystem.js.map