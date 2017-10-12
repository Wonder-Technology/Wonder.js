import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";
import { Quaternion } from "../math/Quaternion";
import { it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Matrix3 } from "../math/Matrix3";
import { TypeArr } from "../renderer/type/dataType";

export const getMatrix3DataSize = () => 9;

export const getMatrix4DataSize = () => 16;

export const getVector3DataSize = () => 3;

export const getQuaternionDataSize = () => 4;

export const getSlice = (typeArr: TypeArr, startIndex: number, endIndex: number) => {
    return typeArr.slice(startIndex, endIndex);
}

export const getSubarray = (typeArr: TypeArr, startIndex: number, endIndex: number) => {
    return typeArr.subarray(startIndex, endIndex);
}

export const deleteBySwapAndNotReset = (sourceIndex: number, targetIndex: number, typeArr: TypeArr) => {
    typeArr[sourceIndex] = typeArr[targetIndex];
}

export const deleteBySwapAndReset = (sourceIndex: number, targetIndex: number, typeArr: TypeArr, length: number, defaultValueArr: Array<number>) => {
    for (let i = 0; i < length; i++) {
        typeArr[sourceIndex + i] = typeArr[targetIndex + i];
        typeArr[targetIndex + i] = defaultValueArr[i];
    }
}

export const deleteSingleValueBySwapAndReset = (sourceIndex: number, lastIndex: number, typeArr: TypeArr, resetValue: any) => {
    typeArr[sourceIndex] = typeArr[lastIndex];
    typeArr[lastIndex] = resetValue;
}


export const deleteOneItemBySwapAndReset = (sourceIndex: number, targetIndex: number, typeArr: TypeArr, defaultValue: number) => {
    typeArr[sourceIndex] = typeArr[targetIndex];
    typeArr[targetIndex] = defaultValue;
}

export const set = (typeArr: TypeArr, valArr: Array<number> | TypeArr, offset = 0) => {
    typeArr.set(valArr, offset);
}

export const setMatrices3 = (typeArr: Float32Array, mat: Matrix3, index: number) => {
    var values = mat.values;

    typeArr[index] = values[0];
    typeArr[index + 1] = values[1];
    typeArr[index + 2] = values[2];
    typeArr[index + 3] = values[3];
    typeArr[index + 4] = values[4];
    typeArr[index + 5] = values[5];
    typeArr[index + 6] = values[6];
    typeArr[index + 7] = values[7];
    typeArr[index + 8] = values[8];
}

export const setMatrices = (typeArr: Float32Array, mat: Matrix4, index: number) => {
    var values = mat.values;

    typeArr[index] = values[0];
    typeArr[index + 1] = values[1];
    typeArr[index + 2] = values[2];
    typeArr[index + 3] = values[3];
    typeArr[index + 4] = values[4];
    typeArr[index + 5] = values[5];
    typeArr[index + 6] = values[6];
    typeArr[index + 7] = values[7];
    typeArr[index + 8] = values[8];
    typeArr[index + 9] = values[9];
    typeArr[index + 10] = values[10];
    typeArr[index + 11] = values[11];
    typeArr[index + 12] = values[12];
    typeArr[index + 13] = values[13];
    typeArr[index + 14] = values[14];
    typeArr[index + 15] = values[15];
}

export const setMatrix4ByIndex = requireCheckFunc((mat: Matrix4, typeArr: Float32Array, index: number) => {
    it("should not exceed type arr's length", () => {
        expect(index + 15).lte(typeArr.length - 1);
    });
}, (mat: Matrix4, typeArr: Float32Array, index: number) => {
    mat.set(
        typeArr[index],
        typeArr[index + 1],
        typeArr[index + 2],
        typeArr[index + 3],
        typeArr[index + 4],
        typeArr[index + 5],
        typeArr[index + 6],
        typeArr[index + 7],
        typeArr[index + 8],
        typeArr[index + 9],
        typeArr[index + 10],
        typeArr[index + 11],
        typeArr[index + 12],
        typeArr[index + 13],
        typeArr[index + 14],
        typeArr[index + 15]
    );

    return mat;
})

export const setVectors = (typeArr: Float32Array, vec: Vector3, index: number) => {
    var values = vec.values;

    typeArr[index] = values[0];
    typeArr[index + 1] = values[1];
    typeArr[index + 2] = values[2];
}

export const setVector3ByIndex = requireCheckFunc((vec: Vector3, typeArr: Float32Array, index: number) => {
    it("should not exceed type arr's length", () => {
        expect(index + 2).lte(typeArr.length - 1);
    });
}, (vec: Vector3, typeArr: Float32Array, index: number) => {
    var values = vec.values;

    values[0] = typeArr[index];
    values[1] = typeArr[index + 1];
    values[2] = typeArr[index + 2];

    return vec;
})

export const setQuaternions = (typeArr: Float32Array, qua: Quaternion, index: number) => {
    typeArr[index] = qua.x;
    typeArr[index + 1] = qua.y;
    typeArr[index + 2] = qua.z;
    typeArr[index + 3] = qua.z;
}

export const setQuaternionByIndex = requireCheckFunc((qua: Quaternion, typeArr: Float32Array, index: number) => {
    it("should not exceed type arr's length", () => {
        expect(index + 3).lte(typeArr.length - 1);
    });
}, (qua: Quaternion, typeArr: Float32Array, index: number) => {
    qua.set(
        typeArr[index],
        typeArr[index + 1],
        typeArr[index + 2],
        typeArr[index + 3]
    );

    return qua;
})

export const swap = (typeArr: any, index1: number, index2: number, length: number) => {
    for (let i = 0; i < length; i++) {
        let newIndex1 = index1 + i,
            newIndex2 = index2 + i,
            temp = typeArr[newIndex2];

        typeArr[newIndex2] = typeArr[newIndex1];

        typeArr[newIndex1] = temp;
    }
}

export const createMatrix4ByIndex = (mat: Matrix4, typeArr: Float32Array, index: number) => {
    return setMatrix4ByIndex(mat, typeArr, index);
}

export const createVector3ByIndex = (vec: Vector3, typeArr: Float32Array, index: number) => {
    return setVector3ByIndex(vec, typeArr, index);
}

// const _setValue =requireCheckFunc((typeArr: Float32Array, increment: number, startIndex: number, target: any) => {
//     it("should not exceed type arr's length", () => {
//         expect(startIndex + increment).lte(typeArr.length - 1);
//     });
// }, (typeArr: Float32Array, increment: number, startIndex: number, target: any) => {
//     typeArr[startIndex + increment] = target;
// })

export const fillTypeArr = requireCheckFunc((typeArr: Float32Array | Uint32Array | Uint16Array, dataArr: Array<number>, startIndex: number, count: number) => {
    it("should not exceed type arr's length", () => {
        expect(count + startIndex).lte(typeArr.length);
    });
}, (typeArr: Float32Array | Uint32Array | Uint16Array, dataArr: Array<number>, startIndex: number, count: number) => {
    // for (let i = 0; i < count; i++) {
    //     typeArr[i + startIndex] = dataArr[i];
    // }
    typeArr.set(dataArr, startIndex);
})

export const setTypeArrayValue = requireCheckFunc((typeArr: TypeArr, index: number, value: number) => {
    it("should not exceed type arr's length", () => {
        expect(index).lte(typeArr.length - 1);
    });
}, (typeArr: Float32Array, index: number, value: number) => {
    typeArr[index] = value;
})

export const setSingleValue = (typeArr: TypeArr, index: number, value: number) => {
    var size = 1,
        i = index * size;

    setTypeArrayValue(typeArr, i, value);
}

export const computeBufferLength = (count: number, size: number) => count * size;
