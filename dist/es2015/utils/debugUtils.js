import curry from "wonder-lodash/curry";
export var trace = curry(function (tag, x) {
    try {
        console.log("log:" + tag + ": " + x);
    }
    catch (e) {
        console.trace("tag:" + tag + "; message:" + e.message);
        throw e;
    }
    return x;
});
//# sourceMappingURL=debugUtils.js.map