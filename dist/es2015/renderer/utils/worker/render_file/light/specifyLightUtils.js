export var getColorDataSize = function () { return 3; };
export var getDirtyDataSize = function () { return 1; };
export var isDirty = function (value) { return value === 0; };
export var cleanDirty = function (index, isDirtys) {
    isDirtys[index] = 1;
};
//# sourceMappingURL=specifyLightUtils.js.map