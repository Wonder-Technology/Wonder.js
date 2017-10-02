import { Vector3 } from "../../math/Vector3";
import { Matrix4 } from "../../math/Matrix4";
import { ThreeDTransform } from "./ThreeDTransform";

export const createTempData =(uid: number, ThreeDTransformData: any) => {
    ThreeDTransformData.tempMap[uid] = {
        position: Vector3.create(),
        localPosition: Vector3.create(),
        localToWorldMatrix: Matrix4.create()
    }

    return ThreeDTransformData;
}

export const setTransformMap = (index: number, transform: ThreeDTransform, ThreeDTransformData: any) => ThreeDTransformData.transformMap[index] =transform;
