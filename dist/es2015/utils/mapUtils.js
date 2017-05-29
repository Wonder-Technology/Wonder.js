export var deleteMapVal = function (key, map) { return map.delete(key); };
export var deleteBySwap = function (sourceIndex, targetIndex, map) {
    map.set(sourceIndex, map.get(targetIndex));
    deleteMapVal(targetIndex, map);
};
//# sourceMappingURL=mapUtils.js.map