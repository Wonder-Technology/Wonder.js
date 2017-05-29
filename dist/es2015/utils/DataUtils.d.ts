import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";
import { Quaternion } from "../math/Quaternion";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
export declare class DataUtils {
    static setMatrices(dataArr: Float32Array, mat: Matrix4, index: number): void;
    static setMatrix4ByIndex(mat: Matrix4, dataArr: Float32Array, index: number): Matrix4;
    static setVectors(dataArr: Float32Array, vec: Vector3, index: number): void;
    static setVector3ByIndex(vec: Vector3, dataArr: Float32Array, index: number): Vector3;
    static setQuaternions(dataArr: Float32Array, qua: Quaternion, index: number): void;
    static setQuaternionByIndex(qua: Quaternion, dataArr: Float32Array, index: number): Quaternion;
    static swap(dataArr: any, index1: number, index2: number, length: number): void;
    static createMatrix4ByIndex(mat: Matrix4, dataArr: Float32Array, index: number): Matrix4;
    static createVector3ByIndex(vec: Vector3, dataArr: Float32Array, index: number): Vector3;
    static createQuaternionByIndex(qua: Quaternion, dataArr: Float32Array, index: number): Quaternion;
    static removeItemInArray(arr: Array<any>, index: number): void;
    static removeSingleItemInTypeArray(dataArr: Uint16Array, index: number, resetValFunc: (dataArr: Uint16Array, sourceIndex: number) => IO): void;
    static removeTypeArrayItemBySwap(dataArr: Float32Array, index: number, swapItemIndex: number, length: number): void;
}
