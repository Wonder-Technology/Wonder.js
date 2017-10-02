import curry from "wonder-lodash/curry";
import flowRight from "wonder-lodash/flowRight";
import { filter, forEach } from "./arrayUtils";
import { Maybe } from "wonder-fantasy-land/dist/es2015/types/Maybe";
import { Either, Left, Right } from "wonder-fantasy-land/dist/es2015/types/Either";
import { Log } from "./Log";

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
//
// export const reduceArray = curry((f: Function, arr: Array<any>) => {
//     return arr.reduce(f);
// })

export const maybe = curry((x:any, f:Function, m:Maybe<any>) => {
    return m.isNothing() ? x : f(m.val);
});

export const either = curry((f:Function, g:Function, e:Either<any>) => {
    switch(e.constructor) {
        case Left:
            return f(e.val);
        case Right:
            return g(e.val);
        default:
            Log.error(true, Log.info.FUNC_MUST_BE("Either"));
            return null;
    }
});

export const liftA2 = curry((f:Function, functor1:any, functor2:any) => {
    return functor1.map(f).ap(functor2);
});

export const liftA3 = curry((f:Function, functor1:any, functor2:any, functor3:any) => {
    return functor1.map(f).ap(functor2).ap(functor3);
});
