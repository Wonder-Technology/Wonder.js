import { setCount as setSpecifyLightCount } from "./SpecifyLightWorkerSystem";

export var setCount = setSpecifyLightCount;

export var initData = ({
                           buffer,
                           count
                       }, PointLightWorkerData: any) => {
    setCount(count, PointLightWorkerData);

    //todo createTypeArrays
}
