import { setCount as setSpecifyLightCount } from "./SpecifyLightWorkerSystem";
import { createTypeArrays, getColorArr3 as getColorArr3Utils } from "../../../utils/light/ambientLightUtils";

export var setCount = setSpecifyLightCount;

export var getColorArr3 = getColorArr3Utils;

export var initData = ({
                           buffer,
                           count
                       }, AmbientLightWorkerData: any) => {
    setCount(count, AmbientLightWorkerData);

    createTypeArrays(buffer, count, AmbientLightWorkerData);
}
