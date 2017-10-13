import { Vector3 } from "../../math/Vector3";
import { Component } from "../Component";
export declare class ThreeDTransform extends Component implements IThreeDTransform {
    uid: number;
}
export interface IThreeDTransform {
    index: number;
    uid: number;
}
export interface BatchTransformData {
    transform: ThreeDTransform;
    position: Vector3;
    localPosition: Vector3;
}
export declare const createThreeDTransform: () => any;
export declare const getThreeDTransformPosition: Function;
export declare const setThreeDTransformPosition: Function;
export declare const getThreeDTransformLocalToWorldMatrix: Function;
export declare const getThreeDTransformLocalPosition: Function;
export declare const setThreeDTransformLocalPosition: Function;
export declare const setThreeDTransformBatchTransformDatas: (batchData: BatchTransformData[]) => void;
export declare const getThreeDTransformParent: Function;
export declare const setThreeDTransformParent: Function;
export declare const getThreeDTransformGameObject: Function;
