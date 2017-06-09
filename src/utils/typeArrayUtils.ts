export var getSlice = (typeArr: Float32Array | Uint32Array | Uint16Array, startIndex: number, endIndex: number) => {
    return typeArr.slice(startIndex, endIndex);
}

export var getSubarray = (typeArr: Float32Array | Uint32Array | Uint16Array, startIndex: number, endIndex: number) => {
    return typeArr.subarray(startIndex, endIndex);
}

export var fill = (typeArr: Float32Array | Uint32Array | Uint16Array, dataArr: Array<number>, startIndex: number, count: number) => {
    for (let i = 0; i < count; i++) {
        typeArr[i + startIndex] = dataArr[i];
    }
}
