import { isValidMapValue } from "./objectUtils";
export var isDisposeTooManyComponents = (disposeCount:number) => {
    return disposeCount > 1000;
}

export var setMapVal = (map:object, uid:number, val:any) => {
    if(isValidMapValue(val)){
        map[uid] = val;
    }
}

