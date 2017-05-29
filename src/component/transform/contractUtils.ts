import { ThreeDTransform } from "./ThreeDTransform";
import { checkComponentShouldAlive } from "../ComponentSystem";
import { isValidMapValue } from "../../utils/objectUtils";

export var checkTransformShouldAlive = (transform: ThreeDTransform, ThreeTransformData: any) => {
    checkComponentShouldAlive(transform, ThreeTransformData, (transform: ThreeDTransform, ThreeTransformData: any) => {
        return isValidMapValue(ThreeTransformData.transformMap[transform.index]);
    });
}

