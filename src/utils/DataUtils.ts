import {Matrix4} from "../math/Matrix4";
import {Vector3} from "../math/Vector3";
import {Quaternion} from "../math/Quaternion";

export class DataUtils {
    public static setMatrices(dataArr: Float32Array, mat: Matrix4, index: number) {
        var values = mat.values;

        dataArr[0] = values[index];
        dataArr[1] = values[index + 1];
        dataArr[2] = values[index + 2];
        dataArr[3] = values[index + 3];
        dataArr[4] = values[index + 4];
        dataArr[5] = values[index + 5];
        dataArr[6] = values[index + 6];
        dataArr[7] = values[index + 7];
        dataArr[8] = values[index + 8];
        dataArr[9] = values[index + 9];
        dataArr[10] = values[index + 10];
        dataArr[11] = values[index + 11];
        dataArr[12] = values[index + 12];
        dataArr[13] = values[index + 13];
        dataArr[14] = values[index + 14];
        dataArr[15] = values[index + 15];
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

        dataArr[0] = values[index];
        dataArr[1] = values[index + 1];
        dataArr[2] = values[index + 2];
    }

    public static setVector3ByIndex(vec:Vector3, dataArr: Float32Array, index: number) {
        vec.set(
            dataArr[index],
            dataArr[index + 1],
            dataArr[index + 2]
        );

        return vec;
    }

    public static setQuaternions(dataArr: Float32Array, qua: Quaternion, index: number) {
        dataArr[0] = qua.x;
        dataArr[1] = qua.y;
        dataArr[2] = qua.z;
        dataArr[3] = qua.w;
    }

    public static setQuaternionByIndex(qua:Quaternion, dataArr: Float32Array, index: number) {
        qua.set(
            dataArr[index],
            dataArr[index + 1],
            dataArr[index + 2],
            dataArr[index + 3]
        );

        return qua;
    }

    public static swap(dataArr:any, index1:number, index2:number, length:number){
        for(let i = 0; i < length; i++){
            let newIndex1 = index1 + i,
                newIndex2 = index2 + i,
                temp = dataArr[newIndex2];

            dataArr[newIndex2] = dataArr[newIndex1];

            dataArr[newIndex1] = temp;
        }
    }

    public static createMatrix4ByIndex(mat:Matrix4, dataArr: Float32Array, index: number){
        return this.setMatrix4ByIndex(mat, dataArr, index);
    }

    public static createVector3ByIndex(vec:Vector3, dataArr: Float32Array, index: number){
        return this.setVector3ByIndex(vec, dataArr, index);
    }

    public static createQuaternionByIndex(qua:Quaternion, dataArr: Float32Array, index: number){
        return this.setQuaternionByIndex(qua, dataArr, index);
    }

    public static cleanArrayItem(arr:Array<any>, index:number){
        arr[index] = void 0;
    }

    public static removeArrayItemBySwap(arr:Array<any>, index:number, swapItemIndex:number){
        arr[index] = arr[swapItemIndex];

        arr.pop();
    }

    public static cleanTypeArrayItem(dataArr:Float32Array, index:number, length:number){
        for(let i = 0; i < length; i++){
            dataArr[index + i] = void 0;
        }
    }

    public static removeTypeArrayItemBySwap(dataArr:Float32Array, index:number, swapItemIndex:number, length:number){
        for(let i = 0; i < length; i++){
            dataArr[index + i] = dataArr[swapItemIndex + i];
        }
    }
}

