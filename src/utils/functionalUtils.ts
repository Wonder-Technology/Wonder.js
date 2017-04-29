import curry from "wonder-lodash/curry";
import flowRight from "wonder-lodash/flowRight";

export var compose = flowRight;

export var chain = curry((f: Function, m: any) => {
    return m.chain(f);
})

export var map = curry((f: Function, m: any) => {
    return m.map(f);
})
