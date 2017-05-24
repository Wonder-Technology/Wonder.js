import { init as initShader } from "../../renderer/shader/ShaderSystem";
import { IMaterialConfig } from "../../renderer/data/material_config";
import { IShaderLibGenerator } from "../../renderer/data/shaderLib_generator";
import { Map } from "immutable";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Color } from "../../structure/Color";
import { expect } from "wonder-expect.js";
import { Material } from "./Material";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap,
    addDisposeHandle as addDisposeHandleToMap, generateComponentIndex, getComponentGameObject
} from "../ComponentSystem";
import curry from "wonder-lodash/curry";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { deleteVal, isValidMapValue } from "../../utils/objectUtils";
import { MaterialClassNameMap } from "./MaterialData";

export var addAddComponentHandle = (_class: any, MaterialData:any) => {
    addAddComponentHandleToMap(_class, addComponent(MaterialData));
}

export var addDisposeHandle = (_class: any, MaterialData:any) => {
    addDisposeHandleToMap(_class, disposeComponent(MaterialData));
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

    MaterialData.materialClassNameMap[index] = className;

    setColor(index, Color.create("#ffffff"), MaterialData);
    setOpacity(index, 1, MaterialData);

    return material;
})

export var init = requireCheckFunc((state: Map<any, any>, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, ShaderData:any, MaterialData:any) => {
    it("index should === count", () => {
        expect(MaterialData.index).equal(MaterialData.count);
    })
}, (state: Map<any, any>, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, ShaderData:any, MaterialData:any) => {
    var materialClassNameMap = MaterialData.materialClassNameMap;

    for(let i = 0, count = MaterialData.count; i < count; i++){
        initMaterial(state, i, material_config, shaderLib_generator, materialClassNameMap, ShaderData, MaterialData);
    }
})

export var initMaterial = (state: Map<any, any>, index:number, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, materialClassNameMap:MaterialClassNameMap, ShaderData:any, MaterialData:any) => {
    var shader = getShader(index, MaterialData),
        isInitMap = ShaderData.isInitMap,
        shaderIndex = shader.index;

    if(isInitMap[shaderIndex] === true){
        return;
    }

    isInitMap[shaderIndex] = true;

    initShader(state, index, shaderIndex, materialClassNameMap[index], material_config, shaderLib_generator, ShaderData);
}

export var getShader = (materialIndex:number, MaterialData:any) => {
    return MaterialData.shaderMap[materialIndex];
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

export var addComponent = curry((MaterialData:any, component:Material, gameObject:GameObject) => {
    addComponentToGameObjectMap(MaterialData.gameObjectMap, component.index, gameObject);
})

export var disposeComponent = ensureFunc(curry((returnVal, MaterialData:any, component:Material) => {
    it("count should >= 0", () => {
        expect(MaterialData.count).gte(0);
    });
    it("index should >= 0", () => {
        expect(MaterialData.index).gte(0);
    });
}), curry((MaterialData:any, component:Material) => {
    var index = component.index;

    MaterialData.count -= 1;

    deleteVal(index, MaterialData.shaderMap);
    deleteVal(index, MaterialData.materialClassNameMap);
    deleteVal(index, MaterialData.colorMap);
    deleteVal(index, MaterialData.opacityMap);
    deleteVal(index, MaterialData.alphaTestMap);
    deleteVal(index, MaterialData.gameObjectMap);

    //not dispose shader(for reuse shader)
}))

export var getGameObject = (index:number, Data:any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

export var initData = (MaterialData:any) => {
    MaterialData.shaderMap = {};
    MaterialData.materialClassNameMap = {};
    MaterialData.colorMap = {};
    MaterialData.opacityMap = {};
    MaterialData.alphaTestMap = {};
    MaterialData.gameObjectMap = {};

    MaterialData.index = 0;
    MaterialData.count = 0;
}
