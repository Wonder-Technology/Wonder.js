import { Map as MapImmutable } from "immutable";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Color } from "../../structure/Color";
import { expect } from "wonder-expect.js";
import { Material } from "./Material";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap,
    addDisposeHandle as addDisposeHandleToMap, addInitHandle as addInitHandleToMap, deleteComponentBySwapArray,
    generateComponentIndex,
    getComponentGameObject
} from "../ComponentSystem";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { Shader } from "../../renderer/shader/Shader";
import { MaterialData } from "./MaterialData";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import {
    deleteBySwapAndNotReset, deleteBySwapAndReset,
    deleteOneItemBySwapAndReset
} from "../../utils/typeArrayUtils";
import {
    createTypeArrays,
    getShaderIndexFromTable as getShaderIndexFromTableUtils, getOpacity as getOpacityUtils,
    getAlphaTest as getAlphaTestUtils, getMaterialClassNameFromTable, getColorDataSize, getOpacityDataSize,
    getAlphaTestDataSize, getColorArr3 as getColorArr3Utils, isTestAlpha as isTestAlphaUtils
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
import { disposeComponent as disposeBasicMaterialComponent, initData as initBasicMaterialData } from "./BasicMaterialSystem";
import { disposeComponent as disposeLightMaterialComponent, initData as initLightMaterialData } from "./LightMaterialSystem";
import { BasicMaterialData } from "./BasicMaterialData";
import { LightMaterialData } from "./LightMaterialData";

export var addAddComponentHandle = (_class: any) => {
    addAddComponentHandleToMap(_class, addComponent);
}

export var addDisposeHandle = (_class: any) => {
    addDisposeHandleToMap(_class, disposeComponent);
}

export var addInitHandle = (_class: any) => {
    addInitHandleToMap(_class, initMaterial);
}

export var create = requireCheckFunc((material: Material, MaterialData: any) => {
    checkIndexShouldEqualCount(MaterialData);
}, (material: Material, MaterialData: any) => {
    var index = generateComponentIndex(MaterialData);

    material.index = index;

    MaterialData.count += 1;

    MaterialData.materialMap[index] = material;

    return material;
})

export var init = requireCheckFunc((state: MapImmutable<any, any>, MaterialData: any) => {
    checkIndexShouldEqualCount(MaterialData);
}, (state: MapImmutable<any, any>, MaterialData: any) => {
    for (let i = 0, count = MaterialData.count; i < count; i++) {
        initMaterial(i, state);
    }
})

export var initMaterial = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initMaterial = (index: number, state: MapImmutable<any, any>) => {
        MaterialData.workerInitList.push(index);
    }
}
else {
    initMaterial = (index: number, state: MapImmutable<any, any>) => {
        var shaderIndex = getShaderIndex(index, MaterialData);

        initShader(state, index, shaderIndex, getMaterialClassNameFromTable(shaderIndex, MaterialData.materialClassNameTable), material_config, shaderLib_generator as any, DeviceManagerData, ProgramData, LocationData, GLSLSenderData, {
            BasicMaterialDataFromSystem:BasicMaterialData,
            //todo fix worker
            LightMaterialDataFromSystem:LightMaterialData
        });
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

// var _getMaterialClassName = (materialIndex: number, MaterialData: any) => {
//     return MaterialData.materialClassNameMap[materialIndex];
// }

// var _setMaterialClassName = (materialIndex: number, className: string, MaterialData: any) => {
//     MaterialData.materialClassNameMap[materialIndex] = className;
// }

export var getShaderIndex = (materialIndex: number, MaterialData: any) => {
    return MaterialData.shaderIndices[materialIndex];
}

export var getShaderIndexFromTable = getShaderIndexFromTableUtils;

export var setShaderIndex = (materialIndex: number, shader: Shader, MaterialData: any) => {
    setTypeArrayValue(MaterialData.shaderIndices, materialIndex, shader.index);
}

export var getColor = (materialIndex: number, SpecifyMaterialData: any) => {
    return getColorData(materialIndex, SpecifyMaterialData.colors);
}

export var getColorData = (materialIndex: number, colors:Float32Array) => {
    var color = Color.create(),
        size = getColorDataSize(),
        index = materialIndex * size;

    color.r = colors[index];
    color.g = colors[index + 1];
    color.b = colors[index + 2];

    return color;
}

export var getColorArr3 = getColorArr3Utils;

export var setColor = (materialIndex: number, color: Color, SpecifyMaterialData: any) => {
    setColorData(materialIndex, color, SpecifyMaterialData.colors);
}

export var setColorData = (materialIndex: number, color: Color, colors:Float32Array) => {
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

export var setOpacity = requireCheckFunc((materialIndex: number, opacity: number, SpecifyMaterialData: any) => {
    it("opacity should be number", () => {
        expect(opacity).be.a("number");
    });
    it("opacity should <= 1 && >= 0", () => {
        expect(opacity).lte(1);
        expect(opacity).gte(0);
    });
}, (materialIndex: number, opacity: number, SpecifyMaterialData: any) => {
    var size = getOpacityDataSize(),
        index = materialIndex * size;

    setTypeArrayValue(SpecifyMaterialData.opacities, index, opacity);
})

export var getAlphaTest = getAlphaTestUtils;

export var setAlphaTest = requireCheckFunc((materialIndex: number, alphaTest: number, SpecifyMaterialData: any) => {
    it("alphaTest should be number", () => {
        expect(alphaTest).be.a("number");
    });
    // it("alphaTest should <= 1 && >= 0", () => {
    //     expect(alphaTest).lte(1);
    //     expect(alphaTest).gte(0);
    // });
}, (materialIndex: number, alphaTest: number, SpecifyMaterialData: any) => {
    var size = getAlphaTestDataSize(),
        index = materialIndex * size;

    setTypeArrayValue(SpecifyMaterialData.alphaTests, index, alphaTest);
})

export var addComponent = (component: Material, gameObject: GameObject) => {
    addComponentToGameObjectMap(MaterialData.gameObjectMap, component.index, gameObject);
}

export var disposeComponent = ensureFunc((returnVal, component: Material) => {
    checkIndexShouldEqualCount(MaterialData);
}, requireCheckFunc((component: Material) => {
    _checkDisposeComponentWorker(component);
}, (component: Material) => {
    var sourceIndex = component.index,
        lastComponentIndex: number = null;

    MaterialData.count -= 1;
    MaterialData.index -= 1;

    lastComponentIndex = MaterialData.count;

    deleteBySwapAndNotReset(sourceIndex, lastComponentIndex, MaterialData.shaderIndices);

    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.gameObjectMap);

    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, MaterialData.materialMap);

    disposeBasicMaterialComponent(sourceIndex, lastComponentIndex, BasicMaterialData);
    disposeLightMaterialComponent(sourceIndex, lastComponentIndex, LightMaterialData);

    //not dispose shader(for reuse shader)(if dipose shader, should change render worker)
}))

export var disposeSpecifyMaterialData = (sourceIndex:number, lastComponentIndex:number, SpecifyMaterialData:any) => {
    var colorDataSize = getColorDataSize(),
        opacityDataSize = getOpacityDataSize(),
        alphaTestDataSize = getAlphaTestDataSize();

    deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, SpecifyMaterialData.colors, colorDataSize, SpecifyMaterialData.defaultColorArr);

    deleteOneItemBySwapAndReset(sourceIndex * opacityDataSize, lastComponentIndex * opacityDataSize, SpecifyMaterialData.opacities, SpecifyMaterialData.defaultOpacity);
    deleteOneItemBySwapAndReset(sourceIndex * alphaTestDataSize, lastComponentIndex * alphaTestDataSize, SpecifyMaterialData.alphaTests, SpecifyMaterialData.defaultAlphaTest);
}



var _checkDisposeComponentWorker = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    _checkDisposeComponentWorker = (component: Material) => {
        it("should not dispose the material which is inited in the same frame", () => {
            expect(MaterialData.workerInitList.indexOf(component.index)).equal(-1);
        });
    }
}
else {
    _checkDisposeComponentWorker = (component: Material) => { };
}

export var getGameObject = (index: number, Data: any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

export var setTypeArrayValue = requireCheckFunc((typeArr: Float32Array | Uint32Array, index: number, value: number) => {
    it("should not exceed type arr's length", () => {
        expect(index).lte(typeArr.length - 1);
    });
}, (typeArr: Float32Array, index: number, value: number) => {
    typeArr[index] = value;
})

export var isTestAlpha = isTestAlphaUtils;

export var setSpecifyMaterialDefaultData = (SpecifyMaterialData:any) => {
    SpecifyMaterialData.defaultColorArr = createDefaultColor().toVector3().toArray();
    SpecifyMaterialData.defaultOpacity = 1;
    SpecifyMaterialData.defaultAlphaTest = -1;
}

export var getSpecifyMateiralBufferSize = () => {
    return Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() + getOpacityDataSize() + getAlphaTestDataSize());
}

export var setSpecifyMaterialDefaultTypeArrData = (count: number, SpecifyMaterialData: any) => {
    var color = createDefaultColor(),
        opacity = SpecifyMaterialData.defaultOpacity,
        alphaTest = SpecifyMaterialData.defaultAlphaTest;

    for (let i = 0; i < count; i++) {
        setColor(i, color, SpecifyMaterialData);
        setOpacity(i, opacity, SpecifyMaterialData);
        setAlphaTest(i, alphaTest, SpecifyMaterialData);
    }
}

export var createDefaultColor = () => {
    var color = Color.create();

    return color.setColorByNum("#ffffff");
}

export var initData = (MaterialData: any, BasicMaterialData:any, LightMaterialData:any) => {
    MaterialData.materialMap = [];

    MaterialData.gameObjectMap = [];

    MaterialData.index = 0;
    MaterialData.count = 0;

    MaterialData.workerInitList = [];

    _initBufferData(MaterialData);

    _initTable(MaterialData);

    initBasicMaterialData(BasicMaterialData);
    initLightMaterialData(LightMaterialData);
}

var _initBufferData = (MaterialData: any) => {
    var buffer: any = null,
        count = _getTotalMaterialBufferCount(DataBufferConfig),
        size = Uint32Array.BYTES_PER_ELEMENT;

    buffer = createSharedArrayBufferOrArrayBuffer(count * size);

    createTypeArrays(buffer, count, MaterialData);

    MaterialData.buffer = buffer;
}

var _getTotalMaterialBufferCount = (DataBufferConfig:any) => {
    return DataBufferConfig.basicMaterialDataBufferCount;
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
