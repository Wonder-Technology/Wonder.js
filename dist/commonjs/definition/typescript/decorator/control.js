"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function execOnlyOnce(flagName) {
    return function (target, name, descriptor) {
        var value = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = null;
            if (this[flagName]) {
                return;
            }
            this[flagName] = true;
            return value.apply(this, args);
        };
        return descriptor;
    };
}
exports.execOnlyOnce = execOnlyOnce;
//# sourceMappingURL=control.js.map