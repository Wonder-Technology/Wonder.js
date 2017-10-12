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
export class ThreeDTransform extends Component implements IThreeDTransform {
    public uid: number = null;
}

export interface IThreeDTransform {
    index: number;
    uid: number;
}

export interface BatchTransformData {
    // uid:number;
    // index:number;
    transform: ThreeDTransform,
    position: Vector3;
    localPosition: Vector3;
}


export const createThreeDTransform = () => {
    return create(ThreeDTransformData);
}

export const getThreeDTransformPosition = requireCheckFunc((component: ThreeDTransform) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component: ThreeDTransform) => {
    return getPosition(component, ThreeDTransformData);
})

export const setThreeDTransformPosition = requireCheckFunc((component: ThreeDTransform, position: Vector3) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component: ThreeDTransform, position: Vector3) => {
    setPosition(component, position, GlobalTempData, ThreeDTransformData);
})

export const getThreeDTransformLocalToWorldMatrix = requireCheckFunc((component: ThreeDTransform) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component: ThreeDTransform) => {
    return getLocalToWorldMatrix(component, getTempLocalToWorldMatrix(component, ThreeDTransformData), ThreeDTransformData);
})

export const getThreeDTransformLocalPosition = requireCheckFunc((component: ThreeDTransform) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component: ThreeDTransform) => {
    return getLocalPosition(component, ThreeDTransformData);
})

export const setThreeDTransformLocalPosition = requireCheckFunc((component: ThreeDTransform, localPosition: Vector3) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component: ThreeDTransform, localPosition: Vector3) => {
    setLocalPosition(component, localPosition, ThreeDTransformData);
})

export const setThreeDTransformBatchTransformDatas = (batchData: Array<BatchTransformData>) => {
    setBatchDatas(batchData, GlobalTempData, ThreeDTransformData);
}

export const getThreeDTransformParent = requireCheckFunc((component: ThreeDTransform) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component: ThreeDTransform) => {
    return getParent(component, ThreeDTransformData);
})

export const setThreeDTransformParent = requireCheckFunc((parent: ThreeDTransform, child: ThreeDTransform) => {
    checkShouldAlive(child, ThreeDTransformData);
}, (parent: ThreeDTransform, child: ThreeDTransform) => {
    setParent(parent, child, ThreeDTransformData);
})

export const getThreeDTransformGameObject = requireCheckFunc((component: ThreeDTransform) => {
    checkShouldAlive(component, ThreeDTransformData);
}, (component: ThreeDTransform) => {
    return getGameObject(component.uid, ThreeDTransformData);
})
