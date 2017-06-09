export var getSlice = (typeArr: Float32Array | Uint32Array | Uint16Array, startIndex: number, endIndex: number) => {
    return typeArr.slice(startIndex, endIndex);
}

export var getSubarray = (typeArr: Float32Array | Uint32Array | Uint16Array, startIndex: number, endIndex: number) => {
    return typeArr.subarray(startIndex, endIndex);
}

