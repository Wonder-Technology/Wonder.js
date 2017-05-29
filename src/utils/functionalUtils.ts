import curry from "wonder-lodash/curry";
import flowRight from "wonder-lodash/flowRight";
import { filter, forEach } from "./arrayUtils";

export var compose = flowRight;

export var chain = curry((f: Function, m: any) => {
    return m.chain(f);
})

export var map = curry((f: Function, m: any) => {
    return m.map(f);
})

export var filterArray = curry((f: (item: any) => boolean, arr: Array<any>) => {
    return filter(arr, f);
})

export var forEachArray = curry((f: (item: any, index: number) => void, arr: Array<any>) => {
    return forEach(arr, f);
})
