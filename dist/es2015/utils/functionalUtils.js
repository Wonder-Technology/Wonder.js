import curry from "wonder-lodash/curry";
import flowRight from "wonder-lodash/flowRight";
import { filter, forEach } from "./arrayUtils";
export var compose = flowRight;
export var chain = curry(function (f, m) {
    return m.chain(f);
});
export var map = curry(function (f, m) {
    return m.map(f);
});
export var filterArray = curry(function (f, arr) {
    return filter(arr, f);
});
export var forEachArray = curry(function (f, arr) {
    return forEach(arr, f);
});
//# sourceMappingURL=functionalUtils.js.map