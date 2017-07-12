import { Map as MapImmutable } from "immutable";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Color } from "../../structure/Color";
import { expect } from "wonder-expect.js";
import { Material } from "./Material";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap,
    addDisposeHandle as addDisposeHandleToMap, addInitHandle as addInitHandleToMap, deleteComponentBySwapArray,
    getComponentGameObject
} from "../ComponentSystem";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Shader } from "../../renderer/shader/Shader";
import { MaterialData } from "./MaterialData";
import {
    deleteBySwapAndNotReset, deleteBySwapAndReset,
    deleteOneItemBySwapAndReset
} from "../../utils/typeArrayUtils";
import {
    createTypeArrays,
    getShaderIndexFromTable as getShaderIndexFromTableUtils, getOpacity as getOpacityUtils,
    getAlphaTest as getAlphaTestUtils, getMaterialClassNameFromTable, getColorDataSize, getOpacityDataSize,
    getAlphaTestDataSize, getColorArr3 as getColorArr3Utils, isTestAlpha as isTestAlphaUtils, getShaderIndexDataSize,
    buildMaterialData
} from "../../renderer/utils/material/materialUtils";
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
import {
    addComponent as addBasicMaterialComponent,
    createTypeArrays as createBasicMaterialTypeArrays,
    disposeComponent as disposeBasicMaterialComponent,
    initData as initBasicMaterialData, initMaterial as initBasicMaterial, setDefaultData as setBasicMaterialDefaultData
} from "./BasicMaterialSystem";
import {
    addComponent as addLightMaterialComponent, createTypeArrays as createLightMaterialTypeArrays,
    disposeComponent as disposeLightMaterialComponent,
    initData as initLightMaterialData, initMaterial as initLightMaterial, setDefaultData as setLightMaterialDefaultData
} from "./LightMaterialSystem";
import { BasicMaterialData } from "./BasicMaterialData";
import { LightMaterialData } from "./LightMaterialData";
import {
    getBasicMaterialBufferCount, getBasicMaterialBufferStartIndex, getBufferLength, getBufferTotalCount,
    getLightMaterialBufferCount, getLightMaterialBufferStartIndex
} from "../../renderer/utils/material/bufferUtils";
import { create as createShader } from "../../renderer/shader/ShaderSystem";
import { IUIDEntity } from "../../core/entityObject/gameObject/IUIDEntity";

export var addAddComponentHandle = (BasicMaterial: any, LightMaterial: any) => {
    addAddComponentHandleToMap(BasicMaterial, addBasicMaterialComponent);
    addAddComponentHandleToMap(LightMaterial, addLightMaterialComponent);
}

export var addDisposeHandle = (BasicMaterial: any, LightMaterial: any) => {
    addDisposeHandleToMap(BasicMaterial, disposeBasicMaterialComponent);
    addDisposeHandleToMap(LightMaterial, disposeLightMaterialComponent);
}

export var addInitHandle = (BasicMaterial: any, LightMaterial: any) => {
    addInitHandleToMap(BasicMaterial, initBasicMaterial);
    addInitHandleToMap(LightMaterial, initLightMaterial);
}

export var create = (index: number, materialClassName: string, material: Material, ShaderData: any, MaterialData: any) => {
    MaterialData.materialMap[index] = material;

    setShaderIndex(material.index, createShader(materialClassName, MaterialData, ShaderData), MaterialData);

    return material;
}

export var init = requireCheckFunc((state: MapImmutable<any, any>, BasicMaterialData: any, LightMaterialData: any) => {
    // checkIndexShouldEqualCount(MaterialData);
}, (state: MapImmutable<any, any>, BasicMaterialData: any, LightMaterialData: any) => {
    _initMaterials(state, getBasicMaterialBufferStartIndex(), BasicMaterialData);
    _initMaterials(state, getLightMaterialBufferStartIndex(), LightMaterialData);
})

var _initMaterials = (state: MapImmutable<any, any>, startIndex: number, SpecifyMaterialData: any) => {
    for (let i = startIndex; i < SpecifyMaterialData.index; i++) {
        initMaterial(i, state);
    }
}

export var initMaterial = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initMaterial = (index: number, state: MapImmutable<any, any>) => {
        MaterialData.workerInitList.push(index);
    }
}
else {
    initMaterial = (index: number, state: MapImmutable<any, any>) => {
        var shaderIndex = getShaderIndex(index, MaterialData);

        initShader(state, index, shaderIndex, getMaterialClassNameFromTable(shaderIndex, MaterialData.materialClassNameTable), material_config, shaderLib_generator as any, DeviceManagerData, ProgramData, LocationData, GLSLSenderData, buildMaterialData(MaterialData, BasicMaterialData, LightMaterialData));
    }
}

export var clearWorkerInitList = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    clearWorkerInitList = (MaterialData: any) => {
        MaterialData.workerInitList = [];
    };
}
else {
    clearWorkerInitList = (MaterialData: any) => {
    };
}

export var hasNewInitedMaterial = (MaterialData: any) => {
    return MaterialData.workerInitList.length > 0;
}

export var getShaderIndex = (materialIndex: number, MaterialData: any) => {
    return MaterialData.shaderIndices[materialIndex];
}

export var getShaderIndexFromTable = getShaderIndexFromTableUtils;

export var setShaderIndex = (materialIndex: number, shader: Shader, MaterialData: any) => {
    setTypeArrayValue(MaterialData.shaderIndices, materialIndex, shader.index);
}

export var getColor = (materialIndex: number, MaterialData: any) => {
    return getColorData(materialIndex, MaterialData.colors);
}

export var getColorData = (materialIndex: number, colors: Float32Array) => {
    var color = Color.create(),
        size = getColorDataSize(),
        index = materialIndex * size;

    color.r = colors[index];
    color.g = colors[index + 1];
    color.b = colors[index + 2];

    return color;
}

export var getColorArr3 = getColorArr3Utils;

export var setColor = (materialIndex: number, color: Color, MaterialData: any) => {
    setColorData(materialIndex, color, MaterialData.colors);
}

export var setColorData = (materialIndex: number, color: Color, colors: Float32Array) => {
    var r = color.r,
        g = color.g,
        b = color.b,
        size = getColorDataSize(),
        index = materialIndex * size;

    setTypeArrayValue(colors, index, r);
    setTypeArrayValue(colors, index + 1, g);
    setTypeArrayValue(colors, index + 2, b);
}

export var getOpacity = getOpacityUtils;

export var setOpacity = requireCheckFunc((materialIndex: number, opacity: number, MaterialData: any) => {
    it("opacity should be number", () => {
        expect(opacity).be.a("number");
    });
    it("opacity should <= 1 && >= 0", () => {
        expect(opacity).lte(1);
        expect(opacity).gte(0);
    });
}, (materialIndex: number, opacity: number, MaterialData: any) => {
    var size = getOpacityDataSize(),
        index = materialIndex * size;

    setTypeArrayValue(MaterialData.opacities, index, opacity);
})

export var getAlphaTest = getAlphaTestUtils;

export var setAlphaTest = requireCheckFunc((materialIndex: number, alphaTest: number, MaterialData: any) => {
    it("alphaTest should be number", () => {
        expect(alphaTest).be.a("number");
    });
    // it("alphaTest should <= 1 && >= 0", () => {
    //     expect(alphaTest).lte(1);
    //     expect(alphaTest).gte(0);
    // });
}, (materialIndex: number, alphaTest: number, MaterialData: any) => {
    var size = getAlphaTestDataSize(),
        index = materialIndex * size;

    setTypeArrayValue(MaterialData.alphaTests, index, alphaTest);
})

export var addComponent = (component: Material, gameObject: GameObject, MaterialData: any) => {
    addComponentToGameObjectMap(MaterialData.gameObjectMap, component.index, gameObject);
}

export var disposeComponent = requireCheckFunc((sourceIndex: number, lastComponentIndex: number, MaterialData: any) => {
    _checkDisposeComponentWorker(sourceIndex);
}, (sourceIndex: number, lastComponentIndex: number, MaterialData: any) => {
    var colorDataSize = getColorDataSize(),
        opacityDataSize = getOpacityDataSize(),
        alphaTestDataSize = getAlphaTestDataSize();

    deleteBySwapAndNotReset(sourceIndex, lastComponentIndex, MaterialData.shaderIndices);

    deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, MaterialData.colors, colorDataSize, MaterialData.defaultColorArr);

    deleteOneItemBySwapAndReset(sourceIndex * opacityDataSize, lastComponentIndex * opacityDataSize, MaterialData.opacities, MaterialData.defaultOpacity);
    deleteOneItemBySwapAndReset(sourceIndex * alphaTestDataSize, lastComponentIndex * alphaTestDataSize, MaterialData.alphaTests, MaterialData.defaultAlphaTest);

    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.gameObjectMap);

    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, MaterialData.materialMap);

    //not dispose shader(for reuse shader)(if dipose shader, should change render worker)
})

var _checkDisposeComponentWorker = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    _checkDisposeComponentWorker = (index: number) => {
        it("should not dispose the material which is inited in the same frame", () => {
            expect(MaterialData.workerInitList.indexOf(index)).equal(-1);
        });
    }
}
else {
    _checkDisposeComponentWorker = (index: number) => { };
}

export var getGameObject = (index: number, MaterialData: any) => {
    return getComponentGameObject(MaterialData.gameObjectMap, index);
}

export var setTypeArrayValue = requireCheckFunc((typeArr: Float32Array | Uint32Array, index: number, value: number) => {
    it("should not exceed type arr's length", () => {
        expect(index).lte(typeArr.length - 1);
    });
}, (typeArr: Float32Array, index: number, value: number) => {
    typeArr[index] = value;
})

export var isTestAlpha = isTestAlphaUtils;

export var createDefaultColor = () => {
    var color = Color.create();

    return color.setColorByNum("#ffffff");
}

export var initData = (MaterialData: any, BasicMaterialData: any, LightMaterialData: any) => {
    MaterialData.materialMap = [];

    MaterialData.gameObjectMap = [];

    MaterialData.workerInitList = [];

    _setMaterialDefaultData(MaterialData);

    initBasicMaterialData(BasicMaterialData);
    setBasicMaterialDefaultData(BasicMaterialData);

    initLightMaterialData(LightMaterialData);
    setLightMaterialDefaultData(LightMaterialData);

    _initBufferData(MaterialData, BasicMaterialData, LightMaterialData);

    _initTable(MaterialData);
}

var _setMaterialDefaultData = (MaterialData: any) => {
    MaterialData.defaultShaderIndex = 0;
    MaterialData.defaultColorArr = createDefaultColor().toVector3().toArray();
    MaterialData.defaultOpacity = 1;
    MaterialData.defaultAlphaTest = -1;
}


var _initBufferData = (MaterialData: any, BasicMaterialData: any, LightMaterialData: any) => {
    var buffer: any = null,
        count = getBufferTotalCount(),
        offset: number = null;

    buffer = createSharedArrayBufferOrArrayBuffer(getBufferLength());

    offset = createTypeArrays(buffer, count, MaterialData);

    _setMaterialDefaultTypeArrData(count, MaterialData);

    offset = createBasicMaterialTypeArrays(buffer, offset, getBasicMaterialBufferCount(), BasicMaterialData);
    offset = createLightMaterialTypeArrays(buffer, offset, getLightMaterialBufferCount(), LightMaterialData);

    MaterialData.buffer = buffer;
}

var _initTable = (MaterialData: any) => {
    MaterialData.shaderIndexTable = {
        "BasicMaterial": 0,
        "LightMaterial": 1
    }

    MaterialData.materialClassNameTable = {
        0: "BasicMaterial",
        1: "LightMaterial"
    }
}

var _setMaterialDefaultTypeArrData = (count: number, MaterialData: any) => {
    var shaderIndex = MaterialData.defaultShaderIndex,
        color = createDefaultColor(),
        opacity = MaterialData.defaultOpacity,
        alphaTest = MaterialData.defaultAlphaTest;

    for (let i = 0; i < count; i++) {
        setShaderIndex(i, shaderIndex, MaterialData);
        setColor(i, color, MaterialData);
        setOpacity(i, opacity, MaterialData);
        setAlphaTest(i, alphaTest, MaterialData);
    }
}
