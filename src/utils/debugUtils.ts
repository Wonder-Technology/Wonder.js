import curry from "wonder-lodash/curry";

/*! side effect */
export var trace = curry((tag: string, x: any) => {
    console.log(`log:${tag}: ${x}`)

    return x;
});
