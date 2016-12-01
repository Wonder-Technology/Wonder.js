var Filter = require("../../dist/converter/gulp_task/filterPrimitiveData/Filter").Filter;

function filterPrimitiveDataByIndices(isRemoveNullData, json) {
    var filter = Filter.create();

    return filter.filter(json, isRemoveNullData);
}

module.exports = filterPrimitiveDataByIndices;
