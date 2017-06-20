import { ThreeDTransform } from "./ThreeDTransform";
import { checkComponentShouldAlive } from "../ComponentSystem";
import { isAlive } from "./ThreeDTransformSystem";

export var checkTransformShouldAlive = (transform: ThreeDTransform, ThreeDTransformData: any) => {
    checkComponentShouldAlive(transform, ThreeDTransformData, (transform: ThreeDTransform, ThreeDTransformData: any) => {
        return isAlive(transform, ThreeDTransformData);
    });
}

