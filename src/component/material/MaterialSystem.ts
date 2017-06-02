import { init as initShader } from "../../renderer/shader/ShaderSystem";
import { IMaterialConfig, material_config } from "../../renderer/data/material_config";
import { IShaderLibGenerator, shaderLib_generator } from "../../renderer/data/shaderLib_generator";
import { Map as MapImmutable } from "immutable";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Color } from "../../structure/Color";
import { expect } from "wonder-expect.js";
import { Material } from "./Material";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap,
    addDisposeHandle as addDisposeHandleToMap, addInitHandle as addInitHandleToMap, deleteComponentBySwap,
    generateComponentIndex,
    getComponentGameObject
} from "../ComponentSystem";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { createMap, deleteBySwap, isValidMapValue } from "../../utils/objectUtils";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { deleteBySwap as deleteMapBySwap } from "../../utils/mapUtils";
import { Shader } from "../../renderer/shader/Shader";
import { MaterialData, ShaderMap } from "./MaterialData";
import { ShaderData } from "../../renderer/shader/ShaderData";
import { DeviceManagerData } from "../../device/DeviceManagerData";
import { ProgramData } from "../../renderer/shader/program/ProgramData";
import { LocationData } from "../../renderer/shader/location/LocationData";
import { GLSLSenderData } from "../../renderer/shader/glslSender/GLSLSenderData";

export var addAddComponentHandle = (_class: any) => {
    addAddComponentHandleToMap(_class, addComponent);
}

export var addDisposeHandle = (_class: any) => {
    addDisposeHandleToMap(_class, disposeComponent);
}

//todo restore
// export var addInitHandle = (_class: any) => {
//     addInitHandleToMap(_class, initMaterial);
// }

export var create = requireCheckFunc((material: Material, className: string, MaterialData: any) => {
    it("MaterialData.index should >= 0", () => {
        expect(MaterialData.index).gte(0);
    });
    it("MaterialData.count should >= 0", () => {
        expect(MaterialData.count).gte(0);
    });
}, (material: Material, className: string, MaterialData: any) => {
    var index = generateComponentIndex(MaterialData);

    material.index = index;

    MaterialData.count += 1;

    _setMaterialClassName(index, className, MaterialData);

    setColor(index, _createDefaultColor(), MaterialData);
    setOpacity(index, 1, MaterialData);

    MaterialData.materialMap[index] = material;

    return material;
})

var _createDefaultColor = () => {
    var color = Color.create();

    return color.setColorByNum("#ffffff");
}

//todo restore
export var init = requireCheckFunc((state: MapImmutable<any, any>, materialCount:number) => {
    // checkIndexShouldEqualCount(MaterialData);
}, (state: MapImmutable<any, any>, materialCount:number) => {
    // for (let i = 0, count = materialCount; i < count; i++) {
    //     initMaterial(i, state);
    // }
})

export var initMaterial = (index: number, shaderMap:ShaderMap, state: MapImmutable<any, any>) => {
    var shader = getShader(index, shaderMap),
        //todo move isInitMap out?(not contain worker data)
        // isInitMap = ShaderData.isInitMap,
        shaderIndex = shader.index;

    // if (isInitMap[shaderIndex] === true) {
    //     return;
    // }

    // isInitMap[shaderIndex] = true;

    // initShader(state, index, shaderIndex, _getMaterialClassName(index, MaterialData), material_config, shaderLib_generator as any, DeviceManagerData, ProgramData, LocationData, GLSLSenderData);
    initShader(state, index, shaderIndex, "BasicMaterial", material_config, shaderLib_generator as any, DeviceManagerData, ProgramData, LocationData, GLSLSenderData);
}

var _getMaterialClassName = (materialIndex: number, MaterialData: any) => {
    return MaterialData.materialClassNameMap[materialIndex];
}

var _setMaterialClassName = (materialIndex: number, className: string, MaterialData: any) => {
    MaterialData.materialClassNameMap[materialIndex] = className;
}

export var getShader = (materialIndex: number, shaderMap:ShaderMap) => {
    return shaderMap[materialIndex];
}

export var setShader = (materialIndex: number, shader: Shader, MaterialData: any) => {
    MaterialData.shaderMap[materialIndex] = shader;
}

export var getColor = (materialIndex: number, MaterialData: any) => {
    // return MaterialData.colorMap[materialIndex];
    //todo fix
    return Color.create("rgb(1.0,0.0,1.0)");
}

export var setColor = (materialIndex: number, color: Color, MaterialData: any) => {
    MaterialData.colorMap[materialIndex] = color;
}

export var getOpacity = (materialIndex: number, MaterialData: any) => {
    // return MaterialData.opacityMap[materialIndex];
    return 1;
}

export var setOpacity = (materialIndex: number, opacity: number, MaterialData: any) => {
    MaterialData.opacityMap[materialIndex] = opacity;
}

export var getAlphaTest = (materialIndex: number, MaterialData: any) => {
    // return MaterialData.alphaTestMap[materialIndex];
    return void 0;
}

export var setAlphaTest = (materialIndex: number, alphaTest: number, MaterialData: any) => {
    MaterialData.alphaTestMap[materialIndex] = alphaTest;
}

export var isPropertyExist = (propertyVal: any) => {
    return isValidMapValue(propertyVal);
}

export var addComponent = (component: Material, gameObject: GameObject) => {
    addComponentToGameObjectMap(MaterialData.gameObjectMap, component.index, gameObject);
}

export var disposeComponent = ensureFunc((returnVal, component: Material) => {
    checkIndexShouldEqualCount(MaterialData);
}, (component: Material) => {
    var sourceIndex = component.index,
        lastComponentIndex: number = null;

    MaterialData.count -= 1;
    MaterialData.index -= 1;

    lastComponentIndex = MaterialData.count;

    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.shaderMap);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.materialClassNameMap);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.colorMap);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.opacityMap);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.alphaTestMap);

    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.gameObjectMap);

    deleteComponentBySwap(sourceIndex, lastComponentIndex, MaterialData.materialMap);

    //not dispose shader(for reuse shader)
})

export var getGameObject = (index: number, Data: any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

export var initData = (MaterialData: any) => {
    MaterialData.shaderMap = createMap();
    MaterialData.materialClassNameMap = createMap();
    MaterialData.colorMap = createMap();
    MaterialData.opacityMap = createMap();
    MaterialData.alphaTestMap = createMap();

    MaterialData.materialMap = createMap();

    MaterialData.gameObjectMap = createMap();

    MaterialData.index = 0;
    MaterialData.count = 0;
}

