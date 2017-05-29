import { checkComponentShouldAlive } from "../ComponentSystem";
import { isValidMapValue } from "../../utils/objectUtils";
export var checkTransformShouldAlive = function (transform, ThreeTransformData) {
    checkComponentShouldAlive(transform, ThreeTransformData, function (transform, ThreeTransformData) {
        return isValidMapValue(ThreeTransformData.transformMap[transform.index]);
    });
};
//# sourceMappingURL=contractUtils.js.map