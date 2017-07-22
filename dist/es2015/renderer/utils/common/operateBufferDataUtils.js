export var getColorArr3 = function (index, DataFromSystem) {
    return getColorArr3Data(index, DataFromSystem.colors);
};
export var getColorArr3Data = function (index, colors) {
    var size = 3, i = index * size;
    return [colors[i], colors[i + 1], colors[i + 2]];
};
export var getSingleSizeData = function (index, datas) {
    return datas[index];
};
//# sourceMappingURL=operateBufferDataUtils.js.map