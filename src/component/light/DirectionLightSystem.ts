import { DirectionLight } from "./DirectionLight";
import { Color } from "../../structure/Color";
import {
    create as createSpecifyLight,
    disposeComponent as disposeSpecifyLightComponent,
    initData as initSpecifyLightData,
    setColor as setSpecifyLightColor,
    createDefaultColor, getPosition as getSpecifyLightPosition,
    bindChangePositionEvent, markDirty
} from "./SpecifyLightSystem";
import { Light } from "./Light";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import {
    cleanColorDirty as cleanColorDirtyUtils, cleanIntensityDirty as cleanIntensityDirtyUtils,
    cleanPositionDirty as cleanPositionDirtyUtils,
    createTypeArrays, getColorArr3 as getColorArr3Utils,
    getIntensity as getIntensityUtils, isColorDirty as isColorDirtyUtils, isIntensityDirty as isIntensityDirtyUtils, isPositionDirty as isPositionDirtyUtils
} from "../../renderer/utils/worker/render_file/light/directionLightUtils";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { getColor3Data } from "../utils/operateBufferDataUtils";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { deleteOneItemBySwapAndReset, setTypeArrayValue } from "../../utils/typeArrayUtils";
import { getDirectionLightBufferCount } from "../../renderer/utils/light/bufferUtils";
import { getColorDataSize, getIntensityDataSize } from "../../renderer/utils/light/directionLightUtils";
import { getDirtyDataSize } from "../../renderer/utils/worker/render_file/light/specifyLightUtils";
import { Map } from "immutable";
import { isInit } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { expect } from "wonder-expect.js";

export const create = ensureFunc((light: DirectionLight, DirectionLightData: any) => {
    it("shouldn't create after Director->init", () => {
        expect(isInit(DirectorData)).false;
    });
}, (DirectionLightData: any) => {
    var light = new DirectionLight();

    light = createSpecifyLight(light, DirectionLightData);

    return light;
})

export const getPosition = (index: number, ThreeDTransformData: any, GameObjectData: any, DirectionLightData: any) => {
    return getSpecifyLightPosition(index, ThreeDTransformData, GameObjectData, DirectionLightData);
}

export const getAllPositionData = (ThreeDTransformData: any, GameObjectData: any, DirectionLightData: any): Array<Float32Array> => {
    var positionArr: Array<Float32Array> = [];

    for (let i = 0, count = DirectionLightData.count; i < count; i++) {
        positionArr.push(getPosition(i, ThreeDTransformData, GameObjectData, DirectionLightData).values);
    }

    return positionArr;
}

export const getColor = (index: number, DirectionLightData: any) => {
    return getColor3Data(index, DirectionLightData.colors);
}

export const getColorArr3 = getColorArr3Utils;

export const setColor = (index: number, color: Color, DirectionLightData: any) => {
    setSpecifyLightColor(index, color, DirectionLightData.colors);

    markDirty(index, DirectionLightData.isColorDirtys);
}

export const getIntensity = getIntensityUtils;

export const setIntensity = (index: number, intensity: number, DirectionLightData: any) => {
    var size = getIntensityDataSize(),
        i = index * size;

    setTypeArrayValue(DirectionLightData.intensities, i, intensity);

    markDirty(index, DirectionLightData.isIntensityDirtys);
}

export const disposeComponent = (component: Light, DirectionLightData: any) => {
    var intensityDataSize = getIntensityDataSize(),
        dirtyDataSize = getDirtyDataSize(),
        sourceIndex = component.index,
        lastComponentIndex: number = null;

    lastComponentIndex = disposeSpecifyLightComponent(sourceIndex, DirectionLightData);

    deleteOneItemBySwapAndReset(sourceIndex * intensityDataSize, lastComponentIndex * intensityDataSize, DirectionLightData.intensities, DirectionLightData.defaultIntensity);

    deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, DirectionLightData.isPositionDirtys, DirectionLightData.defaultDirty);
    deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, DirectionLightData.isColorDirtys, DirectionLightData.defaultDirty);
    deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, DirectionLightData.isIntensityDirtys, DirectionLightData.defaultDirty);
}

export const initDataHelper = (DirectionLightData: any) => {
    var count = getDirectionLightBufferCount(),
        size = Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() + getIntensityDataSize()) + Uint8Array.BYTES_PER_ELEMENT + (getDirtyDataSize() * 3),
        buffer: any = null;

    buffer = createSharedArrayBufferOrArrayBuffer(count * size);

    initSpecifyLightData(buffer, DirectionLightData);

    createTypeArrays(buffer, count, DirectionLightData);

    DirectionLightData.defaultIntensity = 1;

    _setDefaultTypeArrData(count, DirectionLightData);
}

const _setDefaultTypeArrData = (count: number, DirectionLightData: any) => {
    var color = createDefaultColor(),
        intensity = DirectionLightData.defaultIntensity;

    for (let i = 0; i < count; i++) {
        setColor(i, color, DirectionLightData);
        setIntensity(i, intensity, DirectionLightData);
    }
}

export const init = (DirectionLightData: any, state: Map<any, any>) => {
    return bindChangePositionEvent(DirectionLightData, state);
}

export const isPositionDirty = isPositionDirtyUtils;

export const isColorDirty = isColorDirtyUtils;

export const isIntensityDirty = isIntensityDirtyUtils;

export const cleanPositionDirty = cleanPositionDirtyUtils;

export const cleanColorDirty = cleanColorDirtyUtils;

export const cleanIntensityDirty = cleanIntensityDirtyUtils;
