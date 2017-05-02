import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";
import { Quaternion } from "../math/Quaternion";
import curry from "wonder-lodash/curry";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { requireCheck } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";

/*! side effect */
var _setValue = (dataArr:Float32Array, increment:number, startIndex:number, target:any) => {
    dataArr[startIndex + increment] = target;
}

export var moveTo = curry((dataArr:Array<any>|Uint16Array, sourceIndex:number, targetIndex:number, length:number, resetValFunc:(dataArr:Array<any>|Uint16Array, sourceIndex:number) => IO, ThreeDTransformData:any) => {
    return IO.of(() => {
        for (let i = 0; i < length; i++) {
            let newIndex1 = sourceIndex + i,
                newIndex2 = targetIndex + i;

            dataArr[newIndex2] = dataArr[newIndex1];

            resetValFunc(dataArr, newIndex1).run();
        }

        return ThreeDTransformData;
    });
})

export class DataUtils {
    public static setMatrices(dataArr: Float32Array, mat: Matrix4, index: number) {
        var values = mat.values;

        for(let i = 0; i <= 15; i++){
            _setValue(dataArr, i, index, values[i]);
        }
    }

    public static setMatrix4ByIndex(mat: Matrix4, dataArr: Float32Array, index: number) {
        mat.set(
            dataArr[index],
            dataArr[index + 1],
            dataArr[index + 2],
            dataArr[index + 3],
            dataArr[index + 4],
            dataArr[index + 5],
            dataArr[index + 6],
            dataArr[index + 7],
            dataArr[index + 8],
            dataArr[index + 9],
            dataArr[index + 10],
            dataArr[index + 11],
            dataArr[index + 12],
            dataArr[index + 13],
            dataArr[index + 14],
            dataArr[index + 15]
        );

        return mat;
    }

    public static setVectors(dataArr: Float32Array, vec: Vector3, index: number) {
        var values = vec.values;

        for(let i = 0; i <= 2; i++){
            _setValue(dataArr, i, index, values[i]);
        }
    }

    public static setVector3ByIndex(vec: Vector3, dataArr: Float32Array, index: number) {
        vec.set(
            dataArr[index],
            dataArr[index + 1],
            dataArr[index + 2]
        );

        return vec;
    }

    public static setQuaternions(dataArr: Float32Array, qua: Quaternion, index: number) {
        _setValue(dataArr, 0, index, qua.x);
        _setValue(dataArr, 1, index, qua.y);
        _setValue(dataArr, 2, index, qua.z);
        _setValue(dataArr, 3, index, qua.w);
    }

    public static setQuaternionByIndex(qua: Quaternion, dataArr: Float32Array, index: number) {
        qua.set(
            dataArr[index],
            dataArr[index + 1],
            dataArr[index + 2],
            dataArr[index + 3]
        );

        return qua;
    }

    public static swap(dataArr: any, index1: number, index2: number, length: number) {
        for (let i = 0; i < length; i++) {
            let newIndex1 = index1 + i,
                newIndex2 = index2 + i,
                temp = dataArr[newIndex2];

            dataArr[newIndex2] = dataArr[newIndex1];

            dataArr[newIndex1] = temp;
        }
    }

    public static createMatrix4ByIndex(mat: Matrix4, dataArr: Float32Array, index: number) {
        return this.setMatrix4ByIndex(mat, dataArr, index);
    }

    public static createVector3ByIndex(vec: Vector3, dataArr: Float32Array, index: number) {
        return this.setVector3ByIndex(vec, dataArr, index);
    }

    public static createQuaternionByIndex(qua: Quaternion, dataArr: Float32Array, index: number) {
        return this.setQuaternionByIndex(qua, dataArr, index);
    }

    public static removeItemInArray(arr: Array<any>, index: number) {
        arr[index] = void 0;
    }

    // @requireCheck((arr: Array<any>, index: number, swapItemIndex: number) => {
    //     it("index should <= swapItemIndex", () => {
    //         expect(index).lte(swapItemIndex);
    //     });
    // })
    // public static removeArrayItemBySwap(arr: Array<any>, index: number, swapItemIndex: number) {
    //     arr[index] = arr[swapItemIndex];
    //
    //     arr.pop();
    // }

    public static removeSingleItemInTypeArray(dataArr: Uint16Array, index: number, resetValFunc:(dataArr:Uint16Array, sourceIndex:number) => IO) {
        resetValFunc(dataArr, index).run();
    }

    @requireCheck((dataArr: Float32Array, index: number, swapItemIndex: number, length: number) => {
        it("index should <= swapItemIndex", () => {
            expect(index).lte(swapItemIndex);
        });
    })
    public static removeTypeArrayItemBySwap(dataArr: Float32Array, index: number, swapItemIndex: number, length: number) {
        for (let i = 0; i < length; i++) {
            dataArr[index + i] = dataArr[swapItemIndex + i];
        }
    }
}
