import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Vector3 } from "../../math/Vector3";
import { ThreeDTransformData } from "./ThreeDTransformData";
import {
    checkShouldAlive,
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
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";

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

export var getThreeDTransformPosition = requireCheckFunc((component:ThreeDTransform) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component:ThreeDTransform) => {
    return getPosition(component, ThreeDTransformData);
})

export var setThreeDTransformPosition = requireCheckFunc((component:ThreeDTransform, position:Vector3) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component:ThreeDTransform, position:Vector3) => {
    setPosition(component, position, GlobalTempData, ThreeDTransformData);
})

export var getThreeDTransformLocalToWorldMatrix = requireCheckFunc((component:ThreeDTransform) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component:ThreeDTransform) => {
    return getLocalToWorldMatrix(component, getTempLocalToWorldMatrix(component, ThreeDTransformData), ThreeDTransformData);
})

export var getThreeDTransformLocalPosition = requireCheckFunc((component:ThreeDTransform) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component:ThreeDTransform) => {
    return getLocalPosition(component, ThreeDTransformData);
})

export var setThreeDTransformLocalPosition = requireCheckFunc((component:ThreeDTransform, localPosition:Vector3) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component:ThreeDTransform, localPosition:Vector3) => {
    setLocalPosition(component, localPosition, ThreeDTransformData);
})

export var setThreeDTransformBatchTransformDatas = (batchData:Array<BatchTransformData>) => {
    setBatchDatas(batchData, GlobalTempData, ThreeDTransformData);
}

export var getThreeDTransformParent = requireCheckFunc((component:ThreeDTransform) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component:ThreeDTransform) => {
    return getParent(component, ThreeDTransformData);
})

export var setThreeDTransformParent = requireCheckFunc((component:ThreeDTransform, parent:ThreeDTransform) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component:ThreeDTransform, parent:ThreeDTransform) => {
    setParent(component, parent, ThreeDTransformData);
})

export var getThreeDTransformGameObject = requireCheckFunc((component:ThreeDTransform) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component:ThreeDTransform) => {
    return getGameObject(component.uid, ThreeDTransformData);
})
