import { DirectionLight } from "./DirectionLight";
import { Color } from "../../structure/Color";
import {
    create as createSpecifyLight,
    disposeComponent as disposeSpecifyLightComponent,
    initData as initSpecifyLightData,
    setColor as setSpecifyLightColor,
    addComponent as addSpecifyLightComponent, createDefaultColor, getPosition as getSpecifyLightPosition,
    bindChangePositionEvent
} from "./SpecifyLightSystem";
import { DirectionLightData } from "./DirectionLightData";
import { Light } from "./Light";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import {
    cleanColorDirty as cleanColorDirtyUtils, cleanIntensityDirty as cleanIntensityDirtyUtils,
    cleanPositionDirty as cleanPositionDirtyUtils,
    createTypeArrays, getColorArr3 as getColorArr3Utils,
    getIntensity as getIntensityUtils, isColorDirty as isColorDirtyUtils, isIntensityDirty as isIntensityDirtyUtils, isPositionDirty as isPositionDirtyUtils
} from "../../renderer/utils/worker/render_file/light/directionLightUtils";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { getColor3Data } from "../utils/operateBufferDataUtils";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { deleteOneItemBySwapAndReset, setTypeArrayValue } from "../../utils/typeArrayUtils";
import { getDirectionLightBufferCount } from "../../renderer/utils/light/bufferUtils";
import { getColorDataSize, getIntensityDataSize } from "../../renderer/utils/light/directionLightUtils";
import { getDirtyDataSize } from "../../renderer/utils/worker/render_file/light/specifyLightUtils";
import { Map } from "immutable";
import { checkLastComponentIndexShouldNotEqualSourceComponentIndex } from "../utils/contractUtils";

export var create = ensureFunc((light: DirectionLight, DirectionLightData: any) => {
    it("count should <= max count", () => {
        expect(DirectionLightData.count).lte(DataBufferConfig.directionLightDataBufferCount);
    })
}, (DirectionLightData: any) => {
    var light = new DirectionLight();

    light = createSpecifyLight(light, DirectionLightData);

    return light;
})

export var getPosition = (index: number, ThreeDTransformData: any, GameObjectData: any, DirectionLightData: any) => {
    return getSpecifyLightPosition(index, ThreeDTransformData, GameObjectData, DirectionLightData);
}

export var getAllPositionData = (ThreeDTransformData: any, GameObjectData: any, DirectionLightData: any): Array<Float32Array> => {
    var positionArr: Array<Float32Array> = [];

    for (let i = 0, count = DirectionLightData.count; i < count; i++) {
        positionArr.push(getPosition(i, ThreeDTransformData, GameObjectData, DirectionLightData).values);
    }

    return positionArr;
}

export var getColor = (index: number, DirectionLightData: any) => {
    return getColor3Data(index, DirectionLightData.colors);
}

export var getColorArr3 = getColorArr3Utils;

export var setColor = (index: number, color: Color, DirectionLightData: any) => {
    setSpecifyLightColor(index, color, DirectionLightData.colors);
}

export var getIntensity = getIntensityUtils;

export var setIntensity = (index: number, intensity: number, DirectionLightData: any) => {
    var size = getIntensityDataSize(),
        i = index * size;

    setTypeArrayValue(DirectionLightData.intensities, i, intensity);
}

export var addComponent = (component: Light, gameObject: GameObject) => {
    addSpecifyLightComponent(component, gameObject, DirectionLightData);
}

export var disposeComponent = ensureFunc((lastComponentIndex:number, component: Light, PointLightData:any) => {
    checkLastComponentIndexShouldNotEqualSourceComponentIndex(lastComponentIndex, component.index);
},(component: Light) => {
    var intensityDataSize = getIntensityDataSize(),
        dirtyDataSize = getDirtyDataSize(),
        sourceIndex = component.index,
        lastComponentIndex: number = null;

    lastComponentIndex = disposeSpecifyLightComponent(sourceIndex, DirectionLightData);

    deleteOneItemBySwapAndReset(sourceIndex * intensityDataSize, lastComponentIndex * intensityDataSize, DirectionLightData.intensities, DirectionLightData.defaultIntensity);

    deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, DirectionLightData.isPositionDirtys, DirectionLightData.defaultDirty);
    deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, DirectionLightData.isColorDirtys, DirectionLightData.defaultDirty);
    deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, DirectionLightData.isIntensityDirtys, DirectionLightData.defaultDirty);
})

export var initData = (DirectionLightData: any) => {
    var count = getDirectionLightBufferCount(),
        size = Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() + getIntensityDataSize()) + Uint8Array.BYTES_PER_ELEMENT + (getDirtyDataSize() * 3),
        buffer: any = null;

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
}

var _setDefaultTypeArrData = (count: number, DirectionLightData: any) => {
    var color = createDefaultColor(),
        intensity = DirectionLightData.defaultIntensity;

    for (let i = 0; i < count; i++) {
        setColor(i, color, DirectionLightData);
        setIntensity(i, intensity, DirectionLightData);
    }
}

export var init = (DirectionLightData: any, state:Map<any, any>) => {
    return bindChangePositionEvent(DirectionLightData, state);
}

export var isPositionDirty = isPositionDirtyUtils;

export var isColorDirty = isColorDirtyUtils;

//todo send position dirty data to render worker
// export var isPositionDirty = (index: number, ThreeDTransformData: any, GameObjectData:any, PointLightData: any) => {
//     return getIsTranslate(getTransform(getGameObject(index, PointLightData), GameObjectData).uid, ThreeDTransformData) === true;
// }

export var isIntensityDirty = isIntensityDirtyUtils;

export var cleanPositionDirty = cleanPositionDirtyUtils;

export var cleanColorDirty = cleanColorDirtyUtils;

export var cleanIntensityDirty = cleanIntensityDirtyUtils;
