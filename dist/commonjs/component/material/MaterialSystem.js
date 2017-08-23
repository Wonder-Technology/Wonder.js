"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../definition/typescript/decorator/contract");
var Color_1 = require("../../structure/Color");
var wonder_expect_js_1 = require("wonder-expect.js");
var ComponentSystem_1 = require("../ComponentSystem");
var MaterialData_1 = require("./MaterialData");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var materialUtils_1 = require("../../renderer/utils/worker/render_file/material/materialUtils");
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
var DeviceManagerData_1 = require("../../renderer/device/DeviceManagerData");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var arrayUtils_1 = require("../../utils/arrayUtils");
var BasicMaterialSystem_1 = require("./BasicMaterialSystem");
var LightMaterialSystem_1 = require("./LightMaterialSystem");
var bufferUtils_1 = require("../../renderer/utils/worker/render_file/material/bufferUtils");
var ShaderSystem_1 = require("../../renderer/shader/ShaderSystem");
var operateBufferDataUtils_1 = require("../utils/operateBufferDataUtils");
var MapManagerSystem_1 = require("../../renderer/texture/MapManagerSystem");
var MapManagerData_1 = require("../../renderer/texture/MapManagerData");
var basicMaterialUtils_1 = require("../../renderer/utils/worker/render_file/material/basicMaterialUtils");
var lightMaterialUtils_1 = require("../../renderer/utils/worker/render_file/material/lightMaterialUtils");
var MaterialWorkerSystem_1 = require("../../renderer/worker/render_file/material/MaterialWorkerSystem");
var bufferUtils_2 = require("../../renderer/utils/material/bufferUtils");
exports.addAddComponentHandle = function (BasicMaterial, LightMaterial) {
    ComponentSystem_1.addAddComponentHandle(BasicMaterial, BasicMaterialSystem_1.addComponent);
    ComponentSystem_1.addAddComponentHandle(LightMaterial, LightMaterialSystem_1.addComponent);
};
exports.addDisposeHandle = function (BasicMaterial, LightMaterial) {
    ComponentSystem_1.addDisposeHandle(BasicMaterial, BasicMaterialSystem_1.disposeComponent);
    ComponentSystem_1.addDisposeHandle(LightMaterial, LightMaterialSystem_1.disposeComponent);
};
exports.addInitHandle = function (BasicMaterial, LightMaterial) {
    ComponentSystem_1.addInitHandle(BasicMaterial, BasicMaterialSystem_1.initMaterial);
    ComponentSystem_1.addInitHandle(LightMaterial, LightMaterialSystem_1.initMaterial);
};
exports.create = function (index, material, ShaderData, MaterialData) {
    MaterialData.materialMap[index] = material;
    ShaderSystem_1.create(ShaderData);
    return material;
};
exports.useShader = materialUtils_1.useShader;
exports.init = function (state, gl, material_config, shaderLib_generator, initNoMaterialShader, TextureData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, DirectionLightData, PointLightData, GPUDetectData, GLSLSenderData, ProgramData, VaoData, LocationData, ShaderData) {
    materialUtils_1.initNoMaterialShaders(state, material_config, shaderLib_generator, initNoMaterialShader, materialUtils_1.buildInitShaderDataMap(DeviceManagerData_1.DeviceManagerData, ProgramData, LocationData, GLSLSenderData, ShaderData, MapManagerData_1.MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, DirectionLightData, PointLightData, GPUDetectData, VaoData));
    _initMaterials(state, bufferUtils_2.getBasicMaterialBufferStartIndex(), basicMaterialUtils_1.getClassName(), BasicMaterialData, MaterialData);
    _initMaterials(state, bufferUtils_2.getLightMaterialBufferStartIndex(), lightMaterialUtils_1.getClassName(), LightMaterialData, MaterialData);
    MapManagerSystem_1.initMapManagers(gl, TextureData);
};
var _initMaterials = function (state, startIndex, className, SpecifyMaterialData, MaterialData) {
    for (var i = startIndex; i < SpecifyMaterialData.index; i++) {
        exports.initMaterial(i, state, className, MaterialData);
    }
};
exports.initMaterial = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.initMaterial = function (index, state, className, MaterialData) {
        MaterialData.workerInitList.push(_buildWorkerInitData_1(index, className));
    };
    var _buildWorkerInitData_1 = function (index, className) {
        return {
            index: index,
            className: className
        };
    };
}
else {
    exports.initMaterial = function (index, state, className, MaterialData) {
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
exports.getColor = function (materialIndex, MaterialData) {
    return operateBufferDataUtils_1.getColor3Data(materialIndex, MaterialData.colors);
};
exports.getColorArr3 = MaterialWorkerSystem_1.getColorArr3;
exports.setColor = function (materialIndex, color, MaterialData) {
    exports.setColorData(materialIndex, color, MaterialData.colors);
};
exports.setColorData = function (materialIndex, color, colors) {
    operateBufferDataUtils_1.setColor3Data(materialIndex, color, colors);
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
    typeArrayUtils_1.setTypeArrayValue(MaterialData.opacities, index, opacity);
});
exports.getAlphaTest = materialUtils_1.getAlphaTest;
exports.setAlphaTest = contract_1.requireCheckFunc(function (materialIndex, alphaTest, MaterialData) {
    contract_1.it("alphaTest should be number", function () {
        wonder_expect_js_1.expect(alphaTest).be.a("number");
    });
}, function (materialIndex, alphaTest, MaterialData) {
    var size = materialUtils_1.getAlphaTestDataSize(), index = materialIndex * size;
    typeArrayUtils_1.setTypeArrayValue(MaterialData.alphaTests, index, alphaTest);
});
exports.addComponent = function (component, gameObject, MaterialData) {
    ComponentSystem_1.addComponentToGameObjectMap(MaterialData.gameObjectMap, component.index, gameObject);
};
exports.disposeComponent = contract_1.requireCheckFunc(function (sourceIndex, lastComponentIndex, MapManagerData, MaterialData) {
    _checkDisposeComponentWorker(sourceIndex);
}, function (sourceIndex, lastComponentIndex, MapManagerData, MaterialData) {
    var colorDataSize = materialUtils_1.getColorDataSize(), opacityDataSize = materialUtils_1.getOpacityDataSize(), alphaTestDataSize = materialUtils_1.getAlphaTestDataSize();
    typeArrayUtils_1.deleteBySwapAndNotReset(sourceIndex, lastComponentIndex, MaterialData.shaderIndices);
    typeArrayUtils_1.deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, MaterialData.colors, colorDataSize, MaterialData.defaultColorArr);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * opacityDataSize, lastComponentIndex * opacityDataSize, MaterialData.opacities, MaterialData.defaultOpacity);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * alphaTestDataSize, lastComponentIndex * alphaTestDataSize, MaterialData.alphaTests, MaterialData.defaultAlphaTest);
    arrayUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.gameObjectMap);
    ComponentSystem_1.deleteComponentBySwapArray(sourceIndex, lastComponentIndex, MaterialData.materialMap);
    MapManagerSystem_1.dispose(sourceIndex, lastComponentIndex, MapManagerData);
});
var _checkDisposeComponentWorker = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    _checkDisposeComponentWorker = function (materialIndex) {
        contract_1.it("should not dispose the material which is inited in the same frame", function () {
            for (var _i = 0, _a = MaterialData_1.MaterialData.workerInitList; _i < _a.length; _i++) {
                var index = _a[_i].index;
                wonder_expect_js_1.expect(materialIndex).not.equal(index);
            }
        });
    };
}
else {
    _checkDisposeComponentWorker = function (index) { };
}
exports.getGameObject = function (index, MaterialData) {
    return ComponentSystem_1.getComponentGameObject(MaterialData.gameObjectMap, index);
};
exports.isTestAlpha = materialUtils_1.isTestAlpha;
exports.createDefaultColor = function () {
    var color = Color_1.Color.create();
    return color.setColorByNum("#ffffff");
};
exports.initData = function (TextureCacheData, TextureData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData) {
    MaterialData.materialMap = [];
    MaterialData.gameObjectMap = [];
    MaterialData.workerInitList = [];
    _setMaterialDefaultData(MaterialData);
    BasicMaterialSystem_1.initData(BasicMaterialData);
    BasicMaterialSystem_1.setDefaultData(BasicMaterialData);
    LightMaterialSystem_1.initData(LightMaterialData);
    LightMaterialSystem_1.setDefaultData(LightMaterialData);
    _initBufferData(MaterialData, BasicMaterialData, LightMaterialData);
    MapManagerSystem_1.initData(TextureCacheData, TextureData, MapManagerData);
};
var _setMaterialDefaultData = function (MaterialData) {
    MaterialData.defaultShaderIndex = 0;
    MaterialData.defaultColorArr = exports.createDefaultColor().toVector3().toArray();
    MaterialData.defaultOpacity = 1;
    MaterialData.defaultAlphaTest = -1;
};
var _initBufferData = function (MaterialData, BasicMaterialData, LightMaterialData) {
    var buffer = null, count = bufferUtils_1.getBufferTotalCount(), offset = null;
    buffer = arrayBufferUtils_1.createSharedArrayBufferOrArrayBuffer(bufferUtils_1.getBufferLength());
    offset = materialUtils_1.createTypeArrays(buffer, count, MaterialData);
    _setMaterialDefaultTypeArrData(count, MaterialData);
    offset = BasicMaterialSystem_1.createTypeArrays(buffer, offset, bufferUtils_1.getBasicMaterialBufferCount(), BasicMaterialData);
    offset = LightMaterialSystem_1.createTypeArrays(buffer, offset, bufferUtils_1.getLightMaterialBufferCount(), LightMaterialData);
    MaterialData.buffer = buffer;
};
var _setMaterialDefaultTypeArrData = function (count, MaterialData) {
    var shaderIndex = MaterialData.defaultShaderIndex, color = exports.createDefaultColor(), opacity = MaterialData.defaultOpacity, alphaTest = MaterialData.defaultAlphaTest;
    for (var i = 0; i < count; i++) {
        materialUtils_1.setShaderIndex(i, shaderIndex, MaterialData);
        exports.setColor(i, color, MaterialData);
        exports.setOpacity(i, opacity, MaterialData);
        exports.setAlphaTest(i, alphaTest, MaterialData);
    }
};
//# sourceMappingURL=MaterialSystem.js.map