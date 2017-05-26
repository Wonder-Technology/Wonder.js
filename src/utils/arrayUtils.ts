export var deleteBySwap = (array:Array<any>, index:number) => {
    var last = array.length - 1,
        temp = array[last];

    array[last] = array[index];
    array[index] = temp;

    array.pop();

    return last;
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

    for(let ele of arr){
        // if (_contain(resultArr, function(val) {
        //         return isEqual(val, ele);
        //     })) {
        if(_contain(resultArr, ele)){
            continue;
        }

        resultArr.push(ele);
    };

    return resultArr;
}

export var removeItem = (arr:Array<any>, item:any) => {
    return filter(arr, (ele) => {
        return ele !== item;
    });
}

export var filter = (arr:Array<any>, func:Function) => {
    let result = [];

    for(let ele of arr){
        if(func(ele)){
            result.push(ele);
        }
    }

    return result;
}

export var forEach = (arr:Array<any>, func:Function) => {
    for(let ele of arr){
        func(ele);
    }
}
