export var getSlice = (typeArr: Float32Array | Uint32Array | Uint16Array, startIndex: number, endIndex: number) => {
    return typeArr.slice(startIndex, endIndex);
}

export var getSubarray = (typeArr: Float32Array | Uint32Array | Uint16Array, startIndex: number, endIndex: number) => {
    return typeArr.subarray(startIndex, endIndex);
}

export var deleteBySwapAndNotReset = (sourceIndex: number, targetIndex:number, typeArr: Float32Array | Uint32Array | Uint16Array) => {
    typeArr[sourceIndex] = typeArr[targetIndex];
}

export var deleteBySwapAndReset = (sourceIndex: number, targetIndex:number, typeArr: Float32Array | Uint32Array | Uint16Array, length:number, defaultValueArr:Array<number>) => {
    for(let i = 0; i < length; i++){
        typeArr[sourceIndex + i] = typeArr[targetIndex + i];
        typeArr[targetIndex + i] = defaultValueArr[i];
    }
}

export var deleteOneItemBySwapAndReset = (sourceIndex: number, targetIndex:number, typeArr: Float32Array | Uint32Array | Uint16Array, defaultValue:number) => {
    typeArr[sourceIndex] = typeArr[targetIndex];
    typeArr[targetIndex] = defaultValue;
}

export var set = (typeArr: Float32Array | Uint32Array | Uint16Array, valArr:Array<number>, offset = 0) => {
    typeArr.set(valArr, offset);
}
