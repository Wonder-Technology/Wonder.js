import {
    addAddComponentHandle as addAddComponentHandleToMap, addDisposeHandle as addDisposeHandleToMap,
    generateComponentIndex, deleteComponentBySwapArray, addComponentToGameObjectMap, getComponentGameObject
} from "../ComponentSystem";
import { ensureFunc, requireCheckFunc } from "../../definition/typescript/decorator/contract";
// import { deleteBySwap } from "../../utils/arrayUtils";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
// import { isNotValidMapValue } from "../../utils/objectUtils";
import { Color } from "../../structure/Color";
import {
    addComponent as addAmbientLightComponent, disposeComponent as disposeAmbientLightComponent,
    initData as initAmbientLightData
} from "./AmbientLightSystem";
import {
    addComponent as addDirectionLightComponent, disposeComponent as disposeDirectionLightComponent,
    initData as initDirectionLightData
} from "./DirectionLightSystem";
import { initData as initPointLightData } from "./PointLightSystem";

export var addAddComponentHandle = (AmbientLight:any, DirectionLight:any) => {
    addAddComponentHandleToMap(AmbientLight, addAmbientLightComponent);
    addAddComponentHandleToMap(DirectionLight, addDirectionLightComponent);
}

export var addDisposeHandle = (AmbientLight:any, DirectionLight:any) => {
    addDisposeHandleToMap(AmbientLight, disposeAmbientLightComponent);
    addDisposeHandleToMap(DirectionLight, disposeDirectionLightComponent);
    //todo dispose point light
}

// export var addInitHandle = (_class: any) => {
//     addInitHandleToMap(_class, initLight);
// }

// export var create = requireCheckFunc((light: Light, LightData: any) => {
//     checkIndexShouldEqualCount(LightData);
// }, (light: Light, LightData: any) => {
//     var index = generateComponentIndex(LightData);
//
//     // light.index = index;
//
//     LightData.count += 1;
//
//     LightData.lightMap[light.index] = light;
//
//     return light;
// }

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

// export var addComponent = (component: Light, gameObject: GameObject) => {
//     addAmbientLightComponent(component, gameObject, AmbientLightData);
//     addDirectionLightComponent(component, gameObject, DirectionLightData);
// }

// export var disposeComponent = ensureFunc((returnVal, component: Light) => {
//     // checkIndexShouldEqualCount(LightData);
// }, requireCheckFunc((component: Light) => {
//     //todo check?
//     // _checkDisposeComponentWorker(component);
// }, (component: Light) => {
//     var sourceIndex = component.index;
//     //     lastComponentIndex: number = null;
//     //
//     // LightData.count -= 1;
//     // LightData.index -= 1;
//     //
//     // lastComponentIndex = LightData.count;
//     //
//     // deleteBySwap(sourceIndex, lastComponentIndex, LightData.gameObjectMap);
//     //
//     // deleteComponentBySwapArray(sourceIndex, lastComponentIndex, LightData.lightMap);
//
//     disposeAmbientLightComponent(sourceIndex, AmbientLightData);
//     disposeDirectionLightComponent(sourceIndex, DirectionLightData);
//     //todo dispose point light
// }))

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

// export var createDefaultRenderDataObject = (index:number, renderDataMap:object) => {
//     var data = renderDataMap[index],
//         result = null;
//
//     if(isNotValidMapValue(data)){
//         result = {};
//         renderDataMap[index] = result;
//     }
//     else{
//         result = data;
//     }
//
//     return result;
// }

export var initData = (AmbientLightData:any, DirectionLightData:any, PointLightData:any) => {
    initAmbientLightData(AmbientLightData);
    initDirectionLightData(DirectionLightData);
    initPointLightData(PointLightData);
}

