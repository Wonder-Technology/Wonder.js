"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../definition/typescript/decorator/contract");
var Color_1 = require("../../structure/Color");
var wonder_expect_js_1 = require("wonder-expect.js");
var ComponentSystem_1 = require("../ComponentSystem");
var contractUtils_1 = require("../utils/contractUtils");
var MaterialData_1 = require("./MaterialData");
var DataBufferConfig_1 = require("../../config/DataBufferConfig");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var materialUtils_1 = require("../../renderer/utils/material/materialUtils");
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
var ShaderSystem_1 = require("../../renderer/shader/ShaderSystem");
var material_config_1 = require("../../renderer/data/material_config");
var shaderLib_generator_1 = require("../../renderer/data/shaderLib_generator");
var DeviceManagerData_1 = require("../../renderer/device/DeviceManagerData");
var ProgramData_1 = require("../../renderer/shader/program/ProgramData");
var LocationData_1 = require("../../renderer/shader/location/LocationData");
var GLSLSenderData_1 = require("../../renderer/shader/glslSender/GLSLSenderData");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var arrayUtils_1 = require("../../utils/arrayUtils");
exports.addAddComponentHandle = function (_class) {
    ComponentSystem_1.addAddComponentHandle(_class, exports.addComponent);
};
exports.addDisposeHandle = function (_class) {
    ComponentSystem_1.addDisposeHandle(_class, exports.disposeComponent);
};
exports.addInitHandle = function (_class) {
    ComponentSystem_1.addInitHandle(_class, exports.initMaterial);
};
exports.create = contract_1.requireCheckFunc(function (material, className, MaterialData) {
    contractUtils_1.checkIndexShouldEqualCount(MaterialData);
}, function (material, className, MaterialData) {
    var index = ComponentSystem_1.generateComponentIndex(MaterialData);
    material.index = index;
    MaterialData.count += 1;
    MaterialData.materialMap[index] = material;
    return material;
});
var _createDefaultColor = function () {
    var color = Color_1.Color.create();
    return color.setColorByNum("#ffffff");
};
exports.init = contract_1.requireCheckFunc(function (state, MaterialData) {
    contractUtils_1.checkIndexShouldEqualCount(MaterialData);
}, function (state, MaterialData) {
    for (var i = 0, count = MaterialData.count; i < count; i++) {
        exports.initMaterial(i, state);
    }
});
exports.initMaterial = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.initMaterial = function (index, state) {
        MaterialData_1.MaterialData.workerInitList.push(index);
    };
}
else {
    exports.initMaterial = function (index, state) {
        var shaderIndex = exports.getShaderIndex(index, MaterialData_1.MaterialData);
        ShaderSystem_1.init(state, index, shaderIndex, materialUtils_1.getMaterialClassNameFromTable(shaderIndex, MaterialData_1.MaterialData.materialClassNameTable), material_config_1.material_config, shaderLib_generator_1.shaderLib_generator, DeviceManagerData_1.DeviceManagerData, ProgramData_1.ProgramData, LocationData_1.LocationData, GLSLSenderData_1.GLSLSenderData, MaterialData_1.MaterialData);
    };
}
exports.clearWorkerInitList = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.clearWorkerInitList = function (MaterialData) {
        MaterialData.workerInitList = [];
    };
}
else {
    exports.clearWorkerInitList = function (MaterialData) {
    };
}
exports.hasNewInitedMaterial = function (MaterialData) {
    return MaterialData.workerInitList.length > 0;
};
exports.getShaderIndex = function (materialIndex, MaterialData) {
    return MaterialData.shaderIndices[materialIndex];
};
exports.getShaderIndexFromTable = materialUtils_1.getShaderIndexFromTable;
exports.setShaderIndex = function (materialIndex, shader, MaterialData) {
    _setTypeArrayValue(MaterialData.shaderIndices, materialIndex, shader.index);
};
exports.getColor = function (materialIndex, MaterialData) {
    var color = Color_1.Color.create(), colors = MaterialData.colors, size = materialUtils_1.getColorDataSize(), index = materialIndex * size;
    color.r = colors[index];
    color.g = colors[index + 1];
    color.b = colors[index + 2];
    return color;
};
exports.getColorArr3 = materialUtils_1.getColorArr3;
exports.setColor = function (materialIndex, color, MaterialData) {
    var r = color.r, g = color.g, b = color.b, colors = MaterialData.colors, size = materialUtils_1.getColorDataSize(), index = materialIndex * size;
    _setTypeArrayValue(colors, index, r);
    _setTypeArrayValue(colors, index + 1, g);
    _setTypeArrayValue(colors, index + 2, b);
};
exports.getOpacity = materialUtils_1.getOpacity;
exports.setOpacity = contract_1.requireCheckFunc(function (materialIndex, opacity, MaterialData) {
    contract_1.it("opacity should be number", function () {
        wonder_expect_js_1.expect(opacity).be.a("number");
    });
    contract_1.it("opacity should <= 1 && >= 0", function () {
        wonder_expect_js_1.expect(opacity).lte(1);
        wonder_expect_js_1.expect(opacity).gte(0);
    });
}, function (materialIndex, opacity, MaterialData) {
    var size = materialUtils_1.getOpacityDataSize(), index = materialIndex * size;
    _setTypeArrayValue(MaterialData.opacities, index, opacity);
});
exports.getAlphaTest = materialUtils_1.getAlphaTest;
exports.setAlphaTest = contract_1.requireCheckFunc(function (materialIndex, alphaTest, MaterialData) {
    contract_1.it("alphaTest should be number", function () {
        wonder_expect_js_1.expect(alphaTest).be.a("number");
    });
}, function (materialIndex, alphaTest, MaterialData) {
    var size = materialUtils_1.getAlphaTestDataSize(), index = materialIndex * size;
    _setTypeArrayValue(MaterialData.alphaTests, index, alphaTest);
});
exports.addComponent = function (component, gameObject) {
    ComponentSystem_1.addComponentToGameObjectMap(MaterialData_1.MaterialData.gameObjectMap, component.index, gameObject);
};
exports.disposeComponent = contract_1.ensureFunc(function (returnVal, component) {
    contractUtils_1.checkIndexShouldEqualCount(MaterialData_1.MaterialData);
}, contract_1.requireCheckFunc(function (component) {
    _checkDisposeComponentWorker(component);
}, function (component) {
    var sourceIndex = component.index, lastComponentIndex = null, colorDataSize = materialUtils_1.getColorDataSize(), opacityDataSize = materialUtils_1.getOpacityDataSize(), alphaTestDataSize = materialUtils_1.getAlphaTestDataSize();
    MaterialData_1.MaterialData.count -= 1;
    MaterialData_1.MaterialData.index -= 1;
    lastComponentIndex = MaterialData_1.MaterialData.count;
    typeArrayUtils_1.deleteBySwapAndNotReset(sourceIndex, lastComponentIndex, MaterialData_1.MaterialData.shaderIndices);
    typeArrayUtils_1.deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, MaterialData_1.MaterialData.colors, colorDataSize, MaterialData_1.MaterialData.defaultColorArr);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * opacityDataSize, lastComponentIndex * opacityDataSize, MaterialData_1.MaterialData.opacities, MaterialData_1.MaterialData.defaultOpacity);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * alphaTestDataSize, lastComponentIndex * alphaTestDataSize, MaterialData_1.MaterialData.alphaTests, MaterialData_1.MaterialData.defaultAlphaTest);
    arrayUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, MaterialData_1.MaterialData.gameObjectMap);
    ComponentSystem_1.deleteComponentBySwapArray(sourceIndex, lastComponentIndex, MaterialData_1.MaterialData.materialMap);
}));
var _checkDisposeComponentWorker = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    _checkDisposeComponentWorker = function (component) {
        contract_1.it("should not dispose the material which is inited in the same frame", function () {
            wonder_expect_js_1.expect(MaterialData_1.MaterialData.workerInitList.indexOf(component.index)).equal(-1);
        });
    };
}
else {
    _checkDisposeComponentWorker = function (component) { };
}
exports.getGameObject = function (index, Data) {
    return ComponentSystem_1.getComponentGameObject(Data.gameObjectMap, index);
};
var _setTypeArrayValue = contract_1.requireCheckFunc(function (typeArr, index, value) {
    contract_1.it("should not exceed type arr's length", function () {
        wonder_expect_js_1.expect(index).lte(typeArr.length - 1);
    });
}, function (typeArr, index, value) {
    typeArr[index] = value;
});
exports.isTestAlpha = materialUtils_1.isTestAlpha;
exports.initData = function (MaterialData) {
    MaterialData.materialMap = [];
    MaterialData.gameObjectMap = [];
    MaterialData.index = 0;
    MaterialData.count = 0;
    MaterialData.workerInitList = [];
    MaterialData.defaultColorArr = _createDefaultColor().toVector3().toArray();
    MaterialData.defaultOpacity = 1;
    MaterialData.defaultAlphaTest = -1;
    _initBufferData(MaterialData);
    _initTable(MaterialData);
};
var _initBufferData = function (MaterialData) {
    var buffer = null, count = DataBufferConfig_1.DataBufferConfig.materialDataBufferCount, size = Uint32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT * (materialUtils_1.getColorDataSize() + materialUtils_1.getOpacityDataSize() + materialUtils_1.getAlphaTestDataSize());
    buffer = arrayBufferUtils_1.createSharedArrayBufferOrArrayBuffer(count * size);
    materialUtils_1.createTypeArrays(buffer, count, MaterialData);
    MaterialData.buffer = buffer;
    _addDefaultTypeArrData(count, MaterialData);
};
var _addDefaultTypeArrData = function (count, MaterialData) {
    var color = _createDefaultColor(), opacity = MaterialData.defaultOpacity, alphaTest = MaterialData.defaultAlphaTest;
    for (var i = 0; i < count; i++) {
        exports.setColor(i, color, MaterialData);
        exports.setOpacity(i, opacity, MaterialData);
        exports.setAlphaTest(i, alphaTest, MaterialData);
    }
};
var _initTable = function (MaterialData) {
    MaterialData.shaderIndexTable = {
        "BasicMaterial": 0
    };
    MaterialData.materialClassNameTable = {
        0: "BasicMaterial"
    };
};
//# sourceMappingURL=MaterialSystem.js.map