import curry from "wonder-lodash/curry";

export var chain = curry((f: Function, m: any) => {
    return m.chain(f);
})

export var map = curry((f: Function, m: any) => {
    return m.map(f);
})
