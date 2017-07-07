import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { LightData } from "./LightData";
import { Light } from "./Light";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addDisposeHandle as addDisposeHandleToMap,
    generateComponentIndex, deleteComponentBySwapArray, addComponentToGameObjectMap, getComponentGameObject
} from "../ComponentSystem";
import { ensureFunc, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { deleteBySwap } from "../../utils/arrayUtils";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { isNotValidMapValue } from "../../utils/objectUtils";
import { Color } from "../../structure/Color";

export var addAddComponentHandle = (_class: any) => {
    addAddComponentHandleToMap(_class, addComponent);
}

export var addDisposeHandle = (_class: any) => {
    addDisposeHandleToMap(_class, disposeComponent);
}

// export var addInitHandle = (_class: any) => {
//     addInitHandleToMap(_class, initLight);
// }

export var create = requireCheckFunc((light: Light, LightData: any) => {
    checkIndexShouldEqualCount(LightData);
}, (light: Light, LightData: any) => {
    var index = generateComponentIndex(LightData);

    light.index = index;

    LightData.count += 1;

    LightData.lightMap[index] = light;

    return light;
})

// export var init = requireCheckFunc((state: MapImmutable<any, any>, LightData: any) => {
//     checkIndexShouldEqualCount(LightData);
// }, (state: MapImmutable<any, any>, LightData: any) => {
//     for (let i = 0, count = LightData.count; i < count; i++) {
//         initLight(i, state);
//     }
// })
//
// export var initLight = null;

// if (isSupportRenderWorkerAndSharedArrayBuffer()) {
//     initLight = (index: number, state: MapImmutable<any, any>) => {
//         LightData.workerInitList.push(index);
//     }
// }
// else {
//     initLight = (index: number, state: MapImmutable<any, any>) => {
//         var shaderIndex = getShaderIndex(index, LightData);
//
//         initShader(state, index, shaderIndex, getLightClassNameFromTable(shaderIndex, LightData.lightClassNameTable), light_config, shaderLib_generator as any, DeviceManagerData, ProgramData, LocationData, GLSLSenderData, {
//             BasicLightDataFromSystem:BasicLightData
//         });
//     }
// }

export var addComponent = (component: Light, gameObject: GameObject) => {
    addComponentToGameObjectMap(LightData.gameObjectMap, component.index, gameObject);
}

export var disposeComponent = ensureFunc((returnVal, component: Light) => {
    checkIndexShouldEqualCount(LightData);
}, requireCheckFunc((component: Light) => {
    // _checkDisposeComponentWorker(component);
}, (component: Light) => {
    var sourceIndex = component.index,
        lastComponentIndex: number = null;

    LightData.count -= 1;
    LightData.index -= 1;

    lastComponentIndex = LightData.count;

    // deleteBySwapAndNotReset(sourceIndex, lastComponentIndex, LightData.shaderIndices);

    deleteBySwap(sourceIndex, lastComponentIndex, LightData.gameObjectMap);

    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, LightData.lightMap);

    // disposeBasicLightComponent(sourceIndex, lastComponentIndex, BasicLightData);
    // disposeLightLightComponent(sourceIndex, lastComponentIndex, LightLightData);
}))

// export var disposeSpecifyLightData = (sourceIndex:number, lastComponentIndex:number, SpecifyLightData:any) => {
//     var colorDataSize = getColorDataSize(),
//         opacityDataSize = getOpacityDataSize(),
//         alphaTestDataSize = getAlphaTestDataSize();
//
//     deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, SpecifyLightData.colors, colorDataSize, SpecifyLightData.defaultColorArr);
//
//     deleteOneItemBySwapAndReset(sourceIndex * opacityDataSize, lastComponentIndex * opacityDataSize, SpecifyLightData.opacities, SpecifyLightData.defaultOpacity);
//     deleteOneItemBySwapAndReset(sourceIndex * alphaTestDataSize, lastComponentIndex * alphaTestDataSize, SpecifyLightData.alphaTests, SpecifyLightData.defaultAlphaTest);
// }

export var getGameObject = (index: number, Data: any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

export var createDefaultRenderDataObject = (index:number, renderDataMap:object) => {
    var data = renderDataMap[index],
        result = null;

    if(isNotValidMapValue(data)){
        result = {};
        renderDataMap[index] = result;
    }
    else{
        result = data;
    }

    return result;
}

export var createDefaultColorArr = () => {
    var color = Color.create().setColorByNum("#ffffff");

    return [color.r, color.g, color.b];
}

export var initData = (LightData: any, AmbientLightData:any) => {
    LightData.lightMap = [];

    LightData.gameObjectMap = [];

    LightData.index = 0;
    LightData.count = 0;

    // LightData.workerInitList = [];

    // _initBufferData(LightData);

    // _initTable(LightData);

    // initBasicLightData(BasicLightData);
    // initLightLightData(LightLightData);


}

