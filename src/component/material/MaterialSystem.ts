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
import { MaterialData } from "./MaterialData";
import {
    deleteBySwapAndNotReset, deleteBySwapAndReset,
    deleteOneItemBySwapAndReset, setTypeArrayValue
} from "../../utils/typeArrayUtils";
import {
    createTypeArrays,
    getOpacity as getOpacityUtils,
    getAlphaTest as getAlphaTestUtils, getColorDataSize, getOpacityDataSize,
    getAlphaTestDataSize, isTestAlpha as isTestAlphaUtils, buildInitShaderDataMap, setShaderIndex,
    initNoMaterialShaders, useShader as useShaderUtils
} from "../../renderer/utils/worker/render_file/material/materialUtils";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { IShaderLibGenerator } from "../../renderer/data/shaderLib_generator_interface";
import { DeviceManagerData } from "../../renderer/device/DeviceManagerData";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { deleteBySwap } from "../../utils/arrayUtils";
import {
    addComponent as addBasicMaterialComponent,
    createTypeArrays as createBasicMaterialTypeArrays,
    disposeComponent as disposeBasicMaterialComponent,
    initData as initBasicMaterialData,
    initMaterial as initBasicMaterial,
    initMaterialWithoutInitMap as initBasicMaterialWithoutInitMap,
    setDefaultData as setBasicMaterialDefaultData
} from "./BasicMaterialSystem";
import {
    addComponent as addLightMaterialComponent, createTypeArrays as createLightMaterialTypeArrays,
    disposeComponent as disposeLightMaterialComponent,
    initData as initLightMaterialData,
    initMaterial as initLightMaterial,
    initMaterialWithoutInitMap as initLightMaterialWithoutInitMap,
    setDefaultData as setLightMaterialDefaultData
} from "./LightMaterialSystem";
import {
    getBasicMaterialBufferCount, getBufferLength, getBufferTotalCount,
    getLightMaterialBufferCount
} from "../../renderer/utils/worker/render_file/material/bufferUtils";
import { create as createShader } from "../../renderer/shader/ShaderSystem";
import { getColor3Data, setColor3Data } from "../utils/operateBufferDataUtils";
import {
    dispose as disposeMapManager,
    initData as initMapManagerData,
    initMapManagers
} from "../../renderer/texture/MapManagerSystem";
import { MapManagerData } from "../../renderer/texture/MapManagerData";
import { IMaterialConfig } from "../../renderer/data/material_config_interface";
import { IUIdEntity } from "../../core/entityObject/gameObject/IUIdEntity";
import { getColorArr3 as getColorArr3Utils } from "../../renderer/worker/render_file/material/MaterialWorkerSystem";
import {
    getBasicMaterialBufferStartIndex,
    getLightMaterialBufferStartIndex
} from "../../renderer/utils/material/bufferUtils";

export const addAddComponentHandle = (BasicMaterial: any, LightMaterial: any) => {
    addAddComponentHandleToMap(BasicMaterial, addBasicMaterialComponent);
    addAddComponentHandleToMap(LightMaterial, addLightMaterialComponent);
}

export const addDisposeHandle = (BasicMaterial: any, LightMaterial: any) => {
    addDisposeHandleToMap(BasicMaterial, disposeBasicMaterialComponent);
    addDisposeHandleToMap(LightMaterial, disposeLightMaterialComponent);
}

export const addInitHandle = (BasicMaterial: any, LightMaterial: any) => {
    addInitHandleToMap(BasicMaterial, initBasicMaterial);
    addInitHandleToMap(LightMaterial, initLightMaterial);
}

export const create = (index: number, material: Material, ShaderData: any, MaterialData: any) => {
    MaterialData.materialMap[index] = material;

    createShader(ShaderData);

    return material;
}

export const useShader = useShaderUtils;

export const init = (state: MapImmutable<any, any>, gl: WebGLRenderingContext, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initNoMaterialShader: Function, TextureData: any, MaterialData: any, BasicMaterialData: any, LightMaterialData: any, AmbientLightData, DirectionLightData: any, PointLightData: any, GPUDetectData: any, GLSLSenderData: any, ProgramData: any, VaoData: any, LocationData: any, ShaderData: any) => {
    initNoMaterialShaders(state, material_config, shaderLib_generator, initNoMaterialShader, buildInitShaderDataMap(DeviceManagerData, ProgramData, LocationData, GLSLSenderData, ShaderData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, DirectionLightData, PointLightData, GPUDetectData, VaoData));

    //todo pass test!
    _initMaterials(state, getBasicMaterialBufferStartIndex(), initBasicMaterialWithoutInitMap, BasicMaterialData);
    _initMaterials(state, getLightMaterialBufferStartIndex(), initLightMaterialWithoutInitMap, LightMaterialData);

    initMapManagers(gl, TextureData);
}

const _initMaterials =(state: MapImmutable<any, any>, startIndex: number, initSpecifyMaterialWithoutInitMap:Function, SpecifyMaterialData: any) => {
    for (let i = startIndex; i < SpecifyMaterialData.index; i++) {
        initSpecifyMaterialWithoutInitMap(i, state);
    }
}

export var initMaterial = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initMaterial = (index: number, state: MapImmutable<any, any>, className: string, MaterialData: any) => {
        MaterialData.workerInitList.push(_buildWorkerInitData(index, className));
    }

    let _buildWorkerInitData = (index: number, className: string) => {
        return {
            index: index,
            className: className
        }
    }
}
else {
    initMaterial = (index: number, state: MapImmutable<any, any>, className: string, MaterialData: any) => {
    }
}

// const _updateShaderIndex =requireCheckFunc ((materialIndex: number, shaderIndex:number, MaterialData: any) => {
//     it("shader should exist in map", () => {
//         expect(MaterialData.shaderMap[materialIndex]).exist;
//     });
// }, (materialIndex: number, shaderIndex:number, MaterialData: any) => {
//     MaterialData.shaderMap[materialIndex].index = shaderIndex;
// })

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

export const hasNewInitedMaterial = (MaterialData: any) => {
    return MaterialData.workerInitList.length > 0;
}

export const getShaderIndex = (materialIndex: number, MaterialData: any) => {
    return MaterialData.shaderIndices[materialIndex];
}

// export const getShaderIndexFromTable = getShaderIndexFromTableUtils;

export const getColor = (materialIndex: number, MaterialData: any) => {
    return getColor3Data(materialIndex, MaterialData.colors);
}

export const getColorArr3 = getColorArr3Utils;

export const setColor = (materialIndex: number, color: Color, MaterialData: any) => {
    setColorData(materialIndex, color, MaterialData.colors);
}

export const setColorData = (materialIndex: number, color: Color, colors: Float32Array) => {
    setColor3Data(materialIndex, color, colors);
}

export const getOpacity = getOpacityUtils;

export const setOpacity = requireCheckFunc((materialIndex: number, opacity: number, MaterialData: any) => {
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

export const getAlphaTest = getAlphaTestUtils;

export const setAlphaTest = requireCheckFunc((materialIndex: number, alphaTest: number, MaterialData: any) => {
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

export const addComponent = (component: Material, gameObject: GameObject, MaterialData: any) => {
    addComponentToGameObjectMap(MaterialData.gameObjectMap, component.index, gameObject);
}

export const disposeComponent = requireCheckFunc((sourceIndex: number, lastComponentIndex: number, MapManagerData: any, MaterialData: any) => {
    _checkDisposeComponentWorker(sourceIndex);
}, (sourceIndex: number, lastComponentIndex: number, MapManagerData: any, MaterialData: any) => {
    var colorDataSize = getColorDataSize(),
        opacityDataSize = getOpacityDataSize(),
        alphaTestDataSize = getAlphaTestDataSize();

    deleteBySwapAndNotReset(sourceIndex, lastComponentIndex, MaterialData.shaderIndices);

    deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, MaterialData.colors, colorDataSize, MaterialData.defaultColorArr);

    deleteOneItemBySwapAndReset(sourceIndex * opacityDataSize, lastComponentIndex * opacityDataSize, MaterialData.opacities, MaterialData.defaultOpacity);
    deleteOneItemBySwapAndReset(sourceIndex * alphaTestDataSize, lastComponentIndex * alphaTestDataSize, MaterialData.alphaTests, MaterialData.defaultAlphaTest);

    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.gameObjectMap);

    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, MaterialData.materialMap);

    disposeMapManager(sourceIndex, lastComponentIndex, MapManagerData);

    //not dispose shader(for reuse shader)(if dipose shader, should change render worker)
})

var _checkDisposeComponentWorker =null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    _checkDisposeComponentWorker = (materialIndex: number) => {
        it("should not dispose the material which is inited in the same frame", () => {
            for (let { index } of MaterialData.workerInitList) {
                expect(materialIndex).not.equal(index);
            }
        });
    }
}
else {
    _checkDisposeComponentWorker = (index: number) => { };
}

export const getGameObject = (index: number, MaterialData: any) => {
    return getComponentGameObject(MaterialData.gameObjectMap, index);
}

export const isTestAlpha = isTestAlphaUtils;

export const createDefaultColor = () => {
    var color = Color.create();

    return color.setColorByNum("#ffffff");
}

// export const getOrCreateMapManager = (materialIndex:number, MapManagerData:any) => {
//     var mapManager = MaterialData.mapManagers[materialIndex];
//
//     if(isNotValidMapValue(mapManager)){
//         mapManager = createMapManager(MapManagerData);
//     }
//
//     MaterialData.mapManagers[materialIndex] = mapManager;
//
//     return mapManager;
// }

export const initData = (TextureCacheData: any, TextureData: any, MapManagerData: any, MaterialData: any, BasicMaterialData: any, LightMaterialData: any) => {
    MaterialData.materialMap = [];

    MaterialData.gameObjectMap = [];

    // MaterialData.shaderMap = [];

    MaterialData.workerInitList = [];

    _setMaterialDefaultData(MaterialData);

    initBasicMaterialData(BasicMaterialData);
    setBasicMaterialDefaultData(BasicMaterialData);

    initLightMaterialData(LightMaterialData);
    setLightMaterialDefaultData(LightMaterialData);

    _initBufferData(MaterialData, BasicMaterialData, LightMaterialData);

    initMapManagerData(TextureCacheData, TextureData, MapManagerData);
}

const _setMaterialDefaultData =(MaterialData: any) => {
    MaterialData.defaultShaderIndex = 0;
    MaterialData.defaultColorArr = createDefaultColor().toVector3().toArray();
    MaterialData.defaultOpacity = 1;
    MaterialData.defaultAlphaTest = -1;
}


const _initBufferData =(MaterialData: any, BasicMaterialData: any, LightMaterialData: any) => {
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

const _setMaterialDefaultTypeArrData =(count: number, MaterialData: any) => {
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
