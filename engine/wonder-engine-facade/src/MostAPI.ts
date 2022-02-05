import { just } from "most";
import type { Stream } from 'most';

// type callFunc<States> = (func: () => States) => Stream<States>

// export let callFunc: callFunc = callFuncCommonlib
// export let callFunc:any = callFuncCommonlib
// import { Stream, just } from "most";


// export let ignore = (stream: Stream<any>) => {
//     return stream.map((_) => { });
// }

// type callFunc<States> = (func: () => States) => Stream<States>

export function callFunc<States>(func: () => States): Stream<States> {
    return just(func).map(func => func());
}






// export let callFunc = (func) => {
//     return just(func).map(func => func());
// }


