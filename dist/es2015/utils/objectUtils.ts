import { isNotUndefined, isUndefined } from "./JudgeUtils";

export var deleteVal = (key: string | number, obj: object) => obj[key] = void 0;

export var deleteBySwap = (sourceIndex: number, targetIndex: number, obj: object) => {
    obj[sourceIndex] = obj[targetIndex];
    deleteVal(targetIndex, obj);
}

// export var swap = (sourceIndex:number, targetIndex:number, obj:object) => {
//     var temp = obj[sourceIndex];
//
//     obj[sourceIndex] = obj[targetIndex];
//     obj[targetIndex] = temp;
// }

export var isValidMapValue = (val: any) => {
    return isNotUndefined(val);
}

export var isNotValidMapValue = (val: any) => {
    return isUndefined(val);
}

export var createMap = () => Object.create(null);
