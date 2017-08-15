import { setCount as setSpecifyLightCount } from "./SpecifyLightWorkerSystem";
import { createTypeArrays, getColorArr3 as getColorArr3Utils } from "../../../utils/worker/render_file/light/ambientLightUtils";

export var getColorArr3 = getColorArr3Utils;

export var initData = ({
                           buffer,
    bufferCount,
    lightCount
                       }, AmbientLightWorkerData: any) => {
    _setCount(lightCount, AmbientLightWorkerData);

    createTypeArrays(buffer, bufferCount, AmbientLightWorkerData);
}

var _setCount = setSpecifyLightCount;
