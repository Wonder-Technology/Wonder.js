// export const root: any = window;

import { root } from "../../../definition/Variable";

root.requestIdleCallback = root.requestIdleCallback || function(handler:Function) {
    let startTime = Date.now();

    return setTimeout(() => {
        handler({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50.0 - (Date.now() - startTime));
            }
        });
    }, 1);
}

root.cancelIdleCallback = root.cancelIdleCallback || function(id) {
    clearTimeout(id);
}

