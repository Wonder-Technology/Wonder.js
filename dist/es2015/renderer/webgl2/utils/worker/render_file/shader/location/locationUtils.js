import { createMap } from "../../../../../../../utils/objectUtils";
export var setEmptyLocationMap = function (shaderIndex, LocationDataFromSystem) {
    LocationDataFromSystem.uniformLocationMap[shaderIndex] = createMap();
};
export var initData = function (LocationDataFromSystem) {
    LocationDataFromSystem.uniformLocationMap = createMap();
};
//# sourceMappingURL=locationUtils.js.map