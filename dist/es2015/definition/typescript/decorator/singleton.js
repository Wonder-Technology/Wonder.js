export function singleton(isInitWhenCreate) {
    if (isInitWhenCreate === void 0) { isInitWhenCreate = false; }
    return function (target) {
        target._instance = null;
        if (isInitWhenCreate) {
            target.getInstance = function () {
                if (target._instance === null) {
                    var instance = new target();
                    target._instance = instance;
                    instance.initWhenCreate();
                }
                return target._instance;
            };
        }
        else {
            target.getInstance = function () {
                if (target._instance === null) {
                    target._instance = new target();
                }
                return target._instance;
            };
        }
    };
}
//# sourceMappingURL=singleton.js.map