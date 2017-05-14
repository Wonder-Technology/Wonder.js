import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Vector3 } from "../../math/Vector3";
import { ThreeDTransformData } from "./ThreeDTransformData";
import {
    addAddComponentHandle,
    addDisposeHandle, create,
    getLocalPosition, getLocalToWorldMatrix, getPosition, initData, setBatchDatas,
    setLocalPosition,
    setParent,
    setPosition
} from "./ThreeDTransformSystem";
import { getParent, disposeComponent } from "./ThreeDTransformSystem";
import { GlobalTempData } from "../../definition/GlobalTempData";
import { Component } from "../Component";

@registerClass("ThreeDTransform")
export class ThreeDTransform extends Component{
}


export interface BatchTransformData{
    // uid:number;
    // index:number;
    transform:ThreeDTransform,
    position:Vector3;
    localPosition:Vector3;
}


export var createThreeDTransform = () => {
    return create(ThreeDTransformData);
}

export var getThreeDTransformPosition = (transform:ThreeDTransform) => {
    return getPosition(transform, ThreeDTransformData);
}

export var setThreeDTransformPosition = (transform:ThreeDTransform, position:Vector3) => {
    setPosition(transform, position, GlobalTempData, ThreeDTransformData);
}

export var getThreeDTransformLocalToWorldMatrix = (transform:ThreeDTransform) => {
    return getLocalToWorldMatrix(transform, ThreeDTransformData.tempLocalToWorldMatrixMap[String(transform.uid)], ThreeDTransformData);
}

export var getThreeDTransformLocalPosition = (transform:ThreeDTransform) => {
    return getLocalPosition(transform, ThreeDTransformData);
}

export var setThreeDTransformLocalPosition = (transform:ThreeDTransform, localPosition:Vector3) => {
    setLocalPosition(transform, localPosition, ThreeDTransformData);
}

export var setThreeDTransformBatchTransformDatas = (batchData:Array<BatchTransformData>) => {
    setBatchDatas(batchData, GlobalTempData, ThreeDTransformData);
}

export var getThreeDTransformParent = (transform:ThreeDTransform) => {
    return getParent(transform, ThreeDTransformData);
}

export var setThreeDTransformParent = (transform:ThreeDTransform, parent:ThreeDTransform) => {
    setParent(transform, parent, ThreeDTransformData);
}

export var disposeThreeDTransform = (transform:ThreeDTransform) => {
    disposeComponent(GlobalTempData, ThreeDTransformData, transform);
}

initData(GlobalTempData, ThreeDTransformData);

addAddComponentHandle(ThreeDTransform, ThreeDTransformData);
addDisposeHandle(ThreeDTransform, GlobalTempData, ThreeDTransformData);

