"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMapVal = function (key, map) { return map.delete(key); };
exports.deleteBySwap = function (sourceIndex, targetIndex, map) {
    map.set(sourceIndex, map.get(targetIndex));
    exports.deleteMapVal(targetIndex, map);
};
//# sourceMappingURL=mapUtils.js.map