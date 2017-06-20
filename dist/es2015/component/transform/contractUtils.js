import { checkComponentShouldAlive } from "../ComponentSystem";
import { isAlive } from "./ThreeDTransformSystem";
export var checkTransformShouldAlive = function (transform, ThreeDTransformData) {
    checkComponentShouldAlive(transform, ThreeDTransformData, function (transform, ThreeDTransformData) {
        return isAlive(transform, ThreeDTransformData);
    });
};
//# sourceMappingURL=contractUtils.js.map