import curry from "wonder-lodash/curry";

export var chain = curry((f, m) => {
    return m.chain(f);
});
