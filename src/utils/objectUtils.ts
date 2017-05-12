import { isNotUndefined } from "./JudgeUtils";

export var deleteVal = (key:string|number, obj:object) => obj[key] = void 0;

export var isValidMapValue = (val:any) => {
    return isNotUndefined(val);
}
