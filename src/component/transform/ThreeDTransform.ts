import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Vector3 } from "../../math/Vector3";
import { ThreeDTransformData } from "./ThreeDTransformData";
import {
    create, getGameObject,
    getLocalPosition, getLocalToWorldMatrix, getPosition, getTempLocalToWorldMatrix, setBatchDatas,
    setLocalPosition,
    setParent,
    setPosition
} from "./ThreeDTransformSystem";
import { getParent } from "./ThreeDTransformSystem";
import { GlobalTempData } from "../../definition/GlobalTempData";
import { Component } from "../Component";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";

@registerClass("ThreeDTransform")
export class ThreeDTransform extends Component implements IThreeDTransform{
    public uid:number = null;
}

export interface IThreeDTransform{
    index:number;
    uid:number;
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
    return getLocalToWorldMatrix(transform, getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData);
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

export var getThreeDTransformGameObject = (component:ThreeDTransform) => {
    return getGameObject(component.index, ThreeDTransformData);
}
