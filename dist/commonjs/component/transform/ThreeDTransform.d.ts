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
export declare var createThreeDTransform: () => any;
export declare var getThreeDTransformPosition: Function;
export declare var setThreeDTransformPosition: Function;
export declare var getThreeDTransformLocalToWorldMatrix: Function;
export declare var getThreeDTransformLocalPosition: Function;
export declare var setThreeDTransformLocalPosition: Function;
export declare var setThreeDTransformBatchTransformDatas: (batchData: BatchTransformData[]) => void;
export declare var getThreeDTransformParent: Function;
export declare var setThreeDTransformParent: Function;
export declare var getThreeDTransformGameObject: Function;
