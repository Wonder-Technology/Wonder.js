import { isNotUndefined, isUndefined } from "./JudgeUtils";

export const deleteVal = (key: string | number, obj: object) => obj[key] = void 0;

export const deleteBySwap = (sourceIndex: number, targetIndex: number, obj: object) => {
    obj[sourceIndex] = obj[targetIndex];
    deleteVal(targetIndex, obj);
}

// export const swap = (sourceIndex:number, targetIndex:number, obj:object) => {
//     var temp = obj[sourceIndex];
//
//     obj[sourceIndex] = obj[targetIndex];
//     obj[targetIndex] = temp;
// }

export const isValidMapValue = (val: any) => {
    return isNotUndefined(val);
}

export const isNotValidMapValue = (val: any) => {
    return isUndefined(val);
}

export const createMap = () => Object.create(null);
