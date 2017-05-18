export var deleteBySwap = (array:Array<any>, index:number) => {
    var last = array.length - 1,
        temp = array[last];

    array[last] = array[index];
    array[index] = temp;

    array.pop();
}
