import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Color } from "../../structure/Color";
import { expect } from "wonder-expect.js";
import { addComponentToGameObjectMap, deleteComponentBySwapArray, getComponentGameObject } from "../ComponentSystem";
import { MaterialData } from "./MaterialData";
import { deleteBySwapAndNotReset, deleteBySwapAndReset, deleteOneItemBySwapAndReset, setTypeArrayValue } from "../../utils/typeArrayUtils";
import { getAlphaTest as getAlphaTestUtils, getAlphaTestDataSize, getColorDataSize, getOpacity as getOpacityUtils, getOpacityDataSize, isTestAlpha as isTestAlphaUtils, useShader as useShaderUtils } from "../../renderer/utils/worker/render_file/material/materialUtils";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { deleteBySwap } from "../../utils/arrayUtils";
import { create as createShader } from "../../renderer/shader/ShaderSystem";
import { getColor3Data, setColor3Data } from "../utils/operateBufferDataUtils";
import { dispose as disposeMapManager } from "../../renderer/texture/MapManagerSystem";
import { getColorArr3 as getColorArr3Utils } from "../../renderer/worker/render_file/material/MaterialWorkerSystem";
export var create = function (index, material, ShaderData, MaterialData) {
    MaterialData.materialMap[index] = material;
    createShader(ShaderData);
    return material;
};
export var useShader = useShaderUtils;
export var initMaterial = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initMaterial = function (index, state, className, MaterialData) {
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
    initMaterial = function (index, state, className, MaterialData) {
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
export var getColor = function (materialIndex, MaterialData) {
    return getColor3Data(materialIndex, MaterialData.colors);
};
export var getColorArr3 = getColorArr3Utils;
export var setColor = function (materialIndex, color, MaterialData) {
    setColorData(materialIndex, color, MaterialData.colors);
};
export var setColorData = function (materialIndex, color, colors) {
    setColor3Data(materialIndex, color, colors);
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
    setTypeArrayValue(MaterialData.opacities, index, opacity);
});
export var getAlphaTest = getAlphaTestUtils;
export var setAlphaTest = requireCheckFunc(function (materialIndex, alphaTest, MaterialData) {
    it("alphaTest should be number", function () {
        expect(alphaTest).be.a("number");
    });
}, function (materialIndex, alphaTest, MaterialData) {
    var size = getAlphaTestDataSize(), index = materialIndex * size;
    setTypeArrayValue(MaterialData.alphaTests, index, alphaTest);
});
export var addComponent = function (component, gameObject, MaterialData) {
    addComponentToGameObjectMap(MaterialData.gameObjectMap, component.index, gameObject);
};
export var disposeComponent = requireCheckFunc(function (sourceIndex, lastComponentIndex, MapManagerData, MaterialData) {
    _checkDisposeComponentWorker(sourceIndex);
}, function (sourceIndex, lastComponentIndex, MapManagerData, MaterialData) {
    var colorDataSize = getColorDataSize(), opacityDataSize = getOpacityDataSize(), alphaTestDataSize = getAlphaTestDataSize();
    deleteBySwapAndNotReset(sourceIndex, lastComponentIndex, MaterialData.shaderIndices);
    deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, MaterialData.colors, colorDataSize, MaterialData.defaultColorArr);
    deleteOneItemBySwapAndReset(sourceIndex * opacityDataSize, lastComponentIndex * opacityDataSize, MaterialData.opacities, MaterialData.defaultOpacity);
    deleteOneItemBySwapAndReset(sourceIndex * alphaTestDataSize, lastComponentIndex * alphaTestDataSize, MaterialData.alphaTests, MaterialData.defaultAlphaTest);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.gameObjectMap);
    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, MaterialData.materialMap);
    disposeMapManager(sourceIndex, lastComponentIndex, MapManagerData);
});
var _checkDisposeComponentWorker = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    _checkDisposeComponentWorker = function (materialIndex) {
        it("should not dispose the material which is inited in the same frame", function () {
            for (var _i = 0, _a = MaterialData.workerInitList; _i < _a.length; _i++) {
                var index = _a[_i].index;
                expect(materialIndex).not.equal(index);
            }
        });
    };
}
else {
    _checkDisposeComponentWorker = function (index) { };
}
export var getGameObject = function (index, MaterialData) {
    return getComponentGameObject(MaterialData.gameObjectMap, index);
};
export var isTestAlpha = isTestAlphaUtils;
export var createDefaultColor = function () {
    var color = Color.create();
    return color.setColorByNum("#ffffff");
};
//# sourceMappingURL=MaterialSystem.js.map