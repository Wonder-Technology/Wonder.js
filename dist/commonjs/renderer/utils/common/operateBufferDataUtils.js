"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorArr3 = function (index, DataFromSystem) {
    return exports.getColorArr3Data(index, DataFromSystem.colors);
};
exports.getColorArr3Data = function (index, colors) {
    var size = 3, i = index * size;
    return [colors[i], colors[i + 1], colors[i + 2]];
};
exports.getSingleSizeData = function (index, datas) {
    return datas[index];
};
//# sourceMappingURL=operateBufferDataUtils.js.map