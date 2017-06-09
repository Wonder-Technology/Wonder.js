import { isNotUndefined, isUndefined } from "./JudgeUtils";
export var deleteVal = (key: number, arr: Array<number>) => arr[key] = void 0;

export var isNotValidVal = (val: any) => isUndefined(val);

export var isValidVal = (val: any) => isNotUndefined(val);

export var deleteBySwap = (index: number, array: Array<any>) => {
    var last = array.length - 1,
        temp = null;

    if (last === -1) {
        return null;
    }

    temp = array[last];

    //todo optimize: not set last, directly pop it
    array[last] = array[index];
    array[index] = temp;

    array.pop();
}

export var hasDuplicateItems = (arr: Array<any>) => {
    var noRepeatArr = [],
        hasRepeat: boolean = false;

    for (let item of arr) {
        if (!item) {
            continue;
        }

        if (_contain(noRepeatArr, item)) {
            hasRepeat = true;

            break;
        }

        noRepeatArr.push(item);
    }

    return hasRepeat;
}

var _contain = (arr: Array<any>, item: any): boolean => {
    var c: any = null;

    for (let i = 0, len = arr.length; i < len; i++) {
        c = arr[i];

        // if (item.uid && c.uid && item.uid == c.uid) {
        //     return true;
        // }
        // else if (item === c) {
        if (item === c) {
            return true;
        }
    }

    return false;
}

export var removeDuplicateItems = (arr: Array<any>) => {
    var resultArr = [];

    for (let ele of arr) {
        // if (_contain(resultArr, function(val) {
        //         return isEqual(val, ele);
        //     })) {
        if (_contain(resultArr, ele)) {
            continue;
        }

        resultArr.push(ele);
    };

    return resultArr;
}

export var removeItem = (arr: Array<any>, item: any) => {
    return filter(arr, (ele) => {
        return ele !== item;
    });
}

export var filter = (arr: Array<any>, func: (item: any) => boolean) => {
    let result = [];

    for (let ele of arr) {
        if (func(ele)) {
            result.push(ele);
        }
    }

    return result;
}

export var forEach = (arr: Array<any>, func: (item: any, index: number) => void) => {
    for (let i = 0, len = arr.length; i < len; i++) {
        func(arr[i], i);
    }
}
