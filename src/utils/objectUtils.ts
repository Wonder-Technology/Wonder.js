import { isNotUndefined, isUndefined } from "./JudgeUtils";

export var deleteVal = (key:string|number, obj:object) => obj[key] = void 0;

export var isValidMapValue = (val:any) => {
    return isNotUndefined(val);
}

export var isNotValidMapValue = (val:any) => {
    return isUndefined(val);
}
