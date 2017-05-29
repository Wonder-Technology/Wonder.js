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
import { MaterialData } from "./MaterialData";
import { ShaderData } from "../../renderer/shader/ShaderData";
import { DeviceManagerData } from "../../device/DeviceManagerData";

export var addAddComponentHandle = (_class: any) => {
    addAddComponentHandleToMap(_class, addComponent);
}

export var addDisposeHandle = (_class: any) => {
    addDisposeHandleToMap(_class, disposeComponent);
}

export var addInitHandle = (_class: any) => {
    addInitHandleToMap(_class, initMaterial);
}

export var create = requireCheckFunc((material:Material, className:string, MaterialData: any) => {
    it("MaterialData.index should >= 0", () => {
        expect(MaterialData.index).gte(0);
    });
    it("MaterialData.count should >= 0", () => {
        expect(MaterialData.count).gte(0);
    });
}, (material:Material, className:string, MaterialData: any) => {
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

export var init = requireCheckFunc((state: MapImmutable<any, any>, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DeviceManagerData:any, ShaderData:any, MaterialData:any) => {
    // checkIndexShouldEqualCount(MaterialData);
}, (state: MapImmutable<any, any>, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DeviceManagerData:any, ShaderData:any, MaterialData:any) => {
    for(let i = 0, count = MaterialData.count; i < count; i++){
        initMaterial(i, state);
    }
})

export var initMaterial = (index:number, state: MapImmutable<any, any>) => {
    var shader = getShader(index, MaterialData),
        isInitMap = ShaderData.isInitMap,
        shaderIndex = shader.index;

    if(isInitMap[shaderIndex] === true){
        return;
    }

    isInitMap[shaderIndex] = true;

    initShader(state, index, shaderIndex, _getMaterialClassName(index, MaterialData), material_config, shaderLib_generator as any, DeviceManagerData, ShaderData);
}

var _getMaterialClassName = (materialIndex:number, MaterialData:any) => {
    return MaterialData.materialClassNameMap[materialIndex];
}

var _setMaterialClassName = (materialIndex:number, className:string, MaterialData:any) => {
    MaterialData.materialClassNameMap[materialIndex] = className;
}

export var getShader = (materialIndex:number, MaterialData:any) => {
    return MaterialData.shaderMap[materialIndex];
}

export var setShader = (materialIndex:number, shader:Shader, MaterialData:any) => {
    MaterialData.shaderMap[materialIndex] = shader;
}

export var getColor = (materialIndex:number, MaterialData:any) => {
    return MaterialData.colorMap[materialIndex];
}

export var setColor = (materialIndex:number, color:Color, MaterialData:any) => {
    MaterialData.colorMap[materialIndex] = color;
}

export var getOpacity = (materialIndex:number, MaterialData:any) => {
    return MaterialData.opacityMap[materialIndex];
}

export var setOpacity = (materialIndex:number, opacity:number, MaterialData:any) => {
    MaterialData.opacityMap[materialIndex] = opacity;
}

export var getAlphaTest = (materialIndex:number, MaterialData:any) => {
    return MaterialData.alphaTestMap[materialIndex];
}

export var setAlphaTest = (materialIndex:number, alphaTest:number, MaterialData:any) => {
    MaterialData.alphaTestMap[materialIndex] = alphaTest;
}

export var isPropertyExist = (propertyVal:any) => {
    return isValidMapValue(propertyVal);
}

export var addComponent = (component:Material, gameObject:GameObject) => {
    addComponentToGameObjectMap(MaterialData.gameObjectMap, component.index, gameObject);
}

export var disposeComponent = ensureFunc((returnVal, component:Material) => {
    checkIndexShouldEqualCount(MaterialData);
}, (component:Material) => {
    var sourceIndex = component.index,
        lastComponentIndex:number = null;

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

export var getGameObject = (index:number, Data:any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

export var initData = (MaterialData:any) => {
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

