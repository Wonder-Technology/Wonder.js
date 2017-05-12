import { isNotUndefined } from "./JudgeUtils";

export var deleteVal = (key:string|number, obj:object) => delete obj[key];

export var isValidMapValue = (val:any) => {
    return isNotUndefined(val);
}
