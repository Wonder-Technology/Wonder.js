import curry from "wonder-lodash/curry";

/*! side effect */
export const trace = curry((tag: string, x: any) => {
    try {
        console.log(`log:${tag}: ${x}`)
    }
    catch (e) {
        console.trace(`tag:${tag}; message:${e.message}`);
        throw e;
    }

    return x;
});
