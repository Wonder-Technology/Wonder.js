import curry from "wonder-lodash/curry";
import flowRight from "wonder-lodash/flowRight";
import { filter, forEach } from "./arrayUtils";

export const compose = flowRight;

export const chain = curry((f: Function, m: any) => {
    return m.chain(f);
})

export const map = curry((f: Function, m: any) => {
    return m.map(f);
})

export const filterArray = curry((f: (item: any) => boolean, arr: Array<any>) => {
    return filter(arr, f);
})

export const forEachArray = curry((f: (item: any, index: number) => void, arr: Array<any>) => {
    return forEach(arr, f);
})
