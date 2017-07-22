import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Color } from "../../structure/Color";
import { expect } from "wonder-expect.js";
import { addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap, addDisposeHandle as addDisposeHandleToMap, addInitHandle as addInitHandleToMap, deleteComponentBySwapArray, getComponentGameObject } from "../ComponentSystem";
import { MaterialData } from "./MaterialData";
import { deleteBySwapAndNotReset, deleteBySwapAndReset, deleteOneItemBySwapAndReset, setTypeArrayValue } from "../../utils/typeArrayUtils";
import { createTypeArrays, getOpacity as getOpacityUtils, getAlphaTest as getAlphaTestUtils, getColorDataSize, getOpacityDataSize, getAlphaTestDataSize, isTestAlpha as isTestAlphaUtils, buildInitShaderDataMap, setShaderIndex } from "../../renderer/utils/material/materialUtils";
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
import { addComponent as addBasicMaterialComponent, createTypeArrays as createBasicMaterialTypeArrays, disposeComponent as disposeBasicMaterialComponent, initData as initBasicMaterialData, initMaterial as initBasicMaterial, setDefaultData as setBasicMaterialDefaultData } from "./BasicMaterialSystem";
import { addComponent as addLightMaterialComponent, createTypeArrays as createLightMaterialTypeArrays, disposeComponent as disposeLightMaterialComponent, initData as initLightMaterialData, initMaterial as initLightMaterial, setDefaultData as setLightMaterialDefaultData } from "./LightMaterialSystem";
import { BasicMaterialData } from "./BasicMaterialData";
import { LightMaterialData } from "./LightMaterialData";
import { getBasicMaterialBufferCount, getBasicMaterialBufferStartIndex, getBufferLength, getBufferTotalCount, getLightMaterialBufferCount, getLightMaterialBufferStartIndex } from "../../renderer/utils/material/bufferUtils";
import { create as createShader } from "../../renderer/shader/ShaderSystem";
import { getColor3Data, setColor3Data } from "../utils/operateBufferDataUtils";
import { getColorArr3 as getColorArr3Utils } from "../../renderer/utils/common/operateBufferDataUtils";
import { DirectionLightData } from "../light/DirectionLightData";
import { PointLightData } from "../light/PointLightData";
import { dispose as disposeMapManager, initData as initMapManagerData, initMapManagers } from "../../renderer/texture/MapManagerSystem";
import { MapManagerData } from "../../renderer/texture/MapManagerData";
import { getClassName as getBasicMaterialClassName } from "../../renderer/utils/material/basicMaterialUtils";
import { getClassName as getLightMaterialClassName } from "../../renderer/utils/material/lightMaterialUtils";
import { ShaderData } from "../../renderer/shader/ShaderData";
export var addAddComponentHandle = function (BasicMaterial, LightMaterial) {
    addAddComponentHandleToMap(BasicMaterial, addBasicMaterialComponent);
    addAddComponentHandleToMap(LightMaterial, addLightMaterialComponent);
};
export var addDisposeHandle = function (BasicMaterial, LightMaterial) {
    addDisposeHandleToMap(BasicMaterial, disposeBasicMaterialComponent);
    addDisposeHandleToMap(LightMaterial, disposeLightMaterialComponent);
};
export var addInitHandle = function (BasicMaterial, LightMaterial) {
    addInitHandleToMap(BasicMaterial, initBasicMaterial);
    addInitHandleToMap(LightMaterial, initLightMaterial);
};
export var create = function (index, material, ShaderData, MaterialData) {
    MaterialData.materialMap[index] = material;
    createShader(ShaderData);
    return material;
};
export var init = function (state, gl, TextureData, MaterialData, BasicMaterialData, LightMaterialData) {
    _initMaterials(state, getBasicMaterialBufferStartIndex(), getBasicMaterialClassName(), BasicMaterialData, MaterialData);
    _initMaterials(state, getLightMaterialBufferStartIndex(), getLightMaterialClassName(), LightMaterialData, MaterialData);
    initMapManagers(gl, TextureData);
};
var _initMaterials = function (state, startIndex, className, SpecifyMaterialData, MaterialData) {
    for (var i = startIndex; i < SpecifyMaterialData.index; i++) {
        initMaterial(i, state, className, MaterialData);
    }
};
export var initMaterial = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initMaterial = function (index, state, className, MaterialData) {
        MaterialData.workerInitList.push(_buildWorkerInitData(index, className));
    };
    var _buildWorkerInitData = function (index, className) {
        return {
            index: index,
            className: className
        };
    };
}
else {
    initMaterial = function (index, state, className, MaterialData) {
        var shaderIndex = initShader(state, index, className, material_config, shaderLib_generator, buildInitShaderDataMap(DeviceManagerData, ProgramData, LocationData, GLSLSenderData, ShaderData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, DirectionLightData, PointLightData));
        setShaderIndex(index, shaderIndex, MaterialData);
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
export var initData = function (TextureCacheData, TextureData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData) {
    MaterialData.materialMap = [];
    MaterialData.gameObjectMap = [];
    MaterialData.workerInitList = [];
    _setMaterialDefaultData(MaterialData);
    initBasicMaterialData(BasicMaterialData);
    setBasicMaterialDefaultData(BasicMaterialData);
    initLightMaterialData(LightMaterialData);
    setLightMaterialDefaultData(LightMaterialData);
    _initBufferData(MaterialData, BasicMaterialData, LightMaterialData);
    initMapManagerData(TextureCacheData, TextureData, MapManagerData);
};
var _setMaterialDefaultData = function (MaterialData) {
    MaterialData.defaultShaderIndex = 0;
    MaterialData.defaultColorArr = createDefaultColor().toVector3().toArray();
    MaterialData.defaultOpacity = 1;
    MaterialData.defaultAlphaTest = -1;
};
var _initBufferData = function (MaterialData, BasicMaterialData, LightMaterialData) {
    var buffer = null, count = getBufferTotalCount(), offset = null;
    buffer = createSharedArrayBufferOrArrayBuffer(getBufferLength());
    offset = createTypeArrays(buffer, count, MaterialData);
    _setMaterialDefaultTypeArrData(count, MaterialData);
    offset = createBasicMaterialTypeArrays(buffer, offset, getBasicMaterialBufferCount(), BasicMaterialData);
    offset = createLightMaterialTypeArrays(buffer, offset, getLightMaterialBufferCount(), LightMaterialData);
    MaterialData.buffer = buffer;
};
var _setMaterialDefaultTypeArrData = function (count, MaterialData) {
    var shaderIndex = MaterialData.defaultShaderIndex, color = createDefaultColor(), opacity = MaterialData.defaultOpacity, alphaTest = MaterialData.defaultAlphaTest;
    for (var i = 0; i < count; i++) {
        setShaderIndex(i, shaderIndex, MaterialData);
        setColor(i, color, MaterialData);
        setOpacity(i, opacity, MaterialData);
        setAlphaTest(i, alphaTest, MaterialData);
    }
};
//# sourceMappingURL=MaterialSystem.js.map