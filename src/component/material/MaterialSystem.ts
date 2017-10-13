import { Map as MapImmutable } from "immutable";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Color } from "../../structure/Color";
import { expect } from "wonder-expect.js";
import { Material } from "./Material";
import { addComponentToGameObjectMap, deleteComponentBySwapArray, getComponentGameObject } from "../ComponentSystem";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { MaterialData } from "./MaterialData";
import {
    deleteBySwapAndNotReset,
    deleteBySwapAndReset,
    deleteOneItemBySwapAndReset,
    setTypeArrayValue
} from "../../utils/typeArrayUtils";
import {
    getAlphaTest as getAlphaTestUtils,
    getAlphaTestDataSize,
    getColorDataSize,
    getOpacity as getOpacityUtils,
    getOpacityDataSize,
    isTestAlpha as isTestAlphaUtils,
    useShader as useShaderUtils
} from "../../renderer/utils/worker/render_file/material/materialUtils";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { deleteBySwap } from "../../utils/arrayUtils";
import { create as createShader } from "../../renderer/shader/ShaderSystem";
import { getColor3Data, setColor3Data } from "../utils/operateBufferDataUtils";
import { dispose as disposeMapManager } from "../../renderer/texture/MapManagerSystem";
import { getColorArr3 as getColorArr3Utils } from "../../renderer/worker/render_file/material/MaterialWorkerSystem";
import { IMaterialConfig } from "../../renderer/data/material_config_interface";
import { IShaderLibGenerator } from "../../renderer/data/shaderLib_generator_interface";
import { IUIdEntity } from "../../core/entityObject/gameObject/IUIdEntity";

export const create = (index: number, material: Material, ShaderData: any, MaterialData: any) => {
    MaterialData.materialMap[index] = material;

    createShader(ShaderData);

    return material;
}

export const useShader = useShaderUtils;

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

var _checkDisposeComponentWorker = null;

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
