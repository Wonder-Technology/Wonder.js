import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Color } from "../../structure/Color";
import { expect } from "wonder-expect.js";
import { addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap, addDisposeHandle as addDisposeHandleToMap, addInitHandle as addInitHandleToMap, deleteComponentBySwapArray, generateComponentIndex, getComponentGameObject } from "../ComponentSystem";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { MaterialData } from "./MaterialData";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { deleteBySwapAndNotReset, deleteBySwapAndReset, deleteOneItemBySwapAndReset } from "../../utils/typeArrayUtils";
import { createTypeArrays, getShaderIndexFromTable as getShaderIndexFromTableUtils, getOpacity as getOpacityUtils, getAlphaTest as getAlphaTestUtils, getMaterialClassNameFromTable, getColorDataSize, getOpacityDataSize, getAlphaTestDataSize, getColorArr3 as getColorArr3Utils, isTestAlpha as isTestAlphaUtils } from "../../renderer/utils/material/materialUtils";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { init as initShader } from "../../renderer/shader/ShaderSystem";
import { material_config } from "../../renderer/data/material_config";
import { shaderLib_generator } from "../../renderer/data/shaderLib_generator";
import { DeviceManagerData } from "../../renderer/device/DeviceManagerData";
import { ProgramData } from "../../renderer/shader/program/ProgramData";
import { LocationData } from "../../renderer/shader/location/LocationData";
import { GLSLSenderData } from "../../renderer/shader/glslSender/GLSLSenderData";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { deleteBySwap } from "../../utils/arrayUtils";
export var addAddComponentHandle = function (_class) {
    addAddComponentHandleToMap(_class, addComponent);
};
export var addDisposeHandle = function (_class) {
    addDisposeHandleToMap(_class, disposeComponent);
};
export var addInitHandle = function (_class) {
    addInitHandleToMap(_class, initMaterial);
};
export var create = requireCheckFunc(function (material, className, MaterialData) {
    checkIndexShouldEqualCount(MaterialData);
}, function (material, className, MaterialData) {
    var index = generateComponentIndex(MaterialData);
    material.index = index;
    MaterialData.count += 1;
    MaterialData.materialMap[index] = material;
    return material;
});
var _createDefaultColor = function () {
    var color = Color.create();
    return color.setColorByNum("#ffffff");
};
export var init = requireCheckFunc(function (state, MaterialData) {
    checkIndexShouldEqualCount(MaterialData);
}, function (state, MaterialData) {
    for (var i = 0, count = MaterialData.count; i < count; i++) {
        initMaterial(i, state);
    }
});
export var initMaterial = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initMaterial = function (index, state) {
        MaterialData.workerInitList.push(index);
    };
}
else {
    initMaterial = function (index, state) {
        var shaderIndex = getShaderIndex(index, MaterialData);
        initShader(state, index, shaderIndex, getMaterialClassNameFromTable(shaderIndex, MaterialData.materialClassNameTable), material_config, shaderLib_generator, DeviceManagerData, ProgramData, LocationData, GLSLSenderData, MaterialData);
    };
}
export var clearWorkerInitList = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    clearWorkerInitList = function (MaterialData) {
        MaterialData.workerInitList = [];
    };
}
else {
    clearWorkerInitList = function (MaterialData) {
    };
}
export var hasNewInitedMaterial = function (MaterialData) {
    return MaterialData.workerInitList.length > 0;
};
export var getShaderIndex = function (materialIndex, MaterialData) {
    return MaterialData.shaderIndices[materialIndex];
};
export var getShaderIndexFromTable = getShaderIndexFromTableUtils;
export var setShaderIndex = function (materialIndex, shader, MaterialData) {
    _setTypeArrayValue(MaterialData.shaderIndices, materialIndex, shader.index);
};
export var getColor = function (materialIndex, MaterialData) {
    var color = Color.create(), colors = MaterialData.colors, size = getColorDataSize(), index = materialIndex * size;
    color.r = colors[index];
    color.g = colors[index + 1];
    color.b = colors[index + 2];
    return color;
};
export var getColorArr3 = getColorArr3Utils;
export var setColor = function (materialIndex, color, MaterialData) {
    var r = color.r, g = color.g, b = color.b, colors = MaterialData.colors, size = getColorDataSize(), index = materialIndex * size;
    _setTypeArrayValue(colors, index, r);
    _setTypeArrayValue(colors, index + 1, g);
    _setTypeArrayValue(colors, index + 2, b);
};
export var getOpacity = getOpacityUtils;
export var setOpacity = requireCheckFunc(function (materialIndex, opacity, MaterialData) {
    it("opacity should be number", function () {
        expect(opacity).be.a("number");
    });
    it("opacity should <= 1 && >= 0", function () {
        expect(opacity).lte(1);
        expect(opacity).gte(0);
    });
}, function (materialIndex, opacity, MaterialData) {
    var size = getOpacityDataSize(), index = materialIndex * size;
    _setTypeArrayValue(MaterialData.opacities, index, opacity);
});
export var getAlphaTest = getAlphaTestUtils;
export var setAlphaTest = requireCheckFunc(function (materialIndex, alphaTest, MaterialData) {
    it("alphaTest should be number", function () {
        expect(alphaTest).be.a("number");
    });
}, function (materialIndex, alphaTest, MaterialData) {
    var size = getAlphaTestDataSize(), index = materialIndex * size;
    _setTypeArrayValue(MaterialData.alphaTests, index, alphaTest);
});
export var addComponent = function (component, gameObject) {
    addComponentToGameObjectMap(MaterialData.gameObjectMap, component.index, gameObject);
};
export var disposeComponent = ensureFunc(function (returnVal, component) {
    checkIndexShouldEqualCount(MaterialData);
}, requireCheckFunc(function (component) {
    _checkDisposeComponentWorker(component);
}, function (component) {
    var sourceIndex = component.index, lastComponentIndex = null, colorDataSize = getColorDataSize(), opacityDataSize = getOpacityDataSize(), alphaTestDataSize = getAlphaTestDataSize();
    MaterialData.count -= 1;
    MaterialData.index -= 1;
    lastComponentIndex = MaterialData.count;
    deleteBySwapAndNotReset(sourceIndex, lastComponentIndex, MaterialData.shaderIndices);
    deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, MaterialData.colors, colorDataSize, MaterialData.defaultColorArr);
    deleteOneItemBySwapAndReset(sourceIndex * opacityDataSize, lastComponentIndex * opacityDataSize, MaterialData.opacities, MaterialData.defaultOpacity);
    deleteOneItemBySwapAndReset(sourceIndex * alphaTestDataSize, lastComponentIndex * alphaTestDataSize, MaterialData.alphaTests, MaterialData.defaultAlphaTest);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.gameObjectMap);
    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, MaterialData.materialMap);
}));
var _checkDisposeComponentWorker = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    _checkDisposeComponentWorker = function (component) {
        it("should not dispose the material which is inited in the same frame", function () {
            expect(MaterialData.workerInitList.indexOf(component.index)).equal(-1);
        });
    };
}
else {
    _checkDisposeComponentWorker = function (component) { };
}
export var getGameObject = function (index, Data) {
    return getComponentGameObject(Data.gameObjectMap, index);
};
var _setTypeArrayValue = requireCheckFunc(function (typeArr, index, value) {
    it("should not exceed type arr's length", function () {
        expect(index).lte(typeArr.length - 1);
    });
}, function (typeArr, index, value) {
    typeArr[index] = value;
});
export var isTestAlpha = isTestAlphaUtils;
export var initData = function (MaterialData) {
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
    var buffer = null, count = DataBufferConfig.materialDataBufferCount, size = Uint32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() + getOpacityDataSize() + getAlphaTestDataSize());
    buffer = createSharedArrayBufferOrArrayBuffer(count * size);
    createTypeArrays(buffer, count, MaterialData);
    MaterialData.buffer = buffer;
    _addDefaultTypeArrData(count, MaterialData);
};
var _addDefaultTypeArrData = function (count, MaterialData) {
    var color = _createDefaultColor(), opacity = MaterialData.defaultOpacity, alphaTest = MaterialData.defaultAlphaTest;
    for (var i = 0; i < count; i++) {
        setColor(i, color, MaterialData);
        setOpacity(i, opacity, MaterialData);
        setAlphaTest(i, alphaTest, MaterialData);
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