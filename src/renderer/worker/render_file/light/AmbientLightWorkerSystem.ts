import { setCount as setSpecifyLightCount } from "./SpecifyLightWorkerSystem";
import {
    cleanColorDirty as cleanColorDirtyUtils,
    createTypeArrays, getColorArr3 as getColorArr3Utils,
    isColorDirty as isColorDirtyUtils
} from "../../../utils/worker/render_file/light/ambientLightUtils";

export const getColorArr3 = getColorArr3Utils;

export const initData = ({
                           buffer,
    bufferCount,
    lightCount
                       }, AmbientLightWorkerData: any) => {
    _setCount(lightCount, AmbientLightWorkerData);

    createTypeArrays(buffer, bufferCount, AmbientLightWorkerData);
}

const _setCount =setSpecifyLightCount;

export const isColorDirty = isColorDirtyUtils;

export const cleanColorDirty = cleanColorDirtyUtils;
