import { init as initShader } from "../../renderer/shader/ShaderSystem";
import { IMaterialConfig } from "../../renderer/data/material_config";
import { IShaderLibGenerator } from "../../renderer/data/shaderLib_generator";
import { Map as MapImmutable } from "immutable";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Color } from "../../structure/Color";
import { expect } from "wonder-expect.js";
import { Material } from "./Material";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap, addComponentToGameObjectMapMap,
    addDisposeHandle as addDisposeHandleToMap, addInitHandle as addInitHandleToMap, generateComponentIndex,
    getComponentGameObject
} from "../ComponentSystem";
import curry from "wonder-lodash/curry";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { isValidMapValue } from "../../utils/objectUtils";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { deleteMapVal } from "../../utils/mapUtils";
import { Shader } from "../../renderer/shader/Shader";

export var addAddComponentHandle = (_class: any, MaterialData:any) => {
    addAddComponentHandleToMap(_class, addComponent(MaterialData));
}

export var addDisposeHandle = (_class: any, MaterialData:any) => {
    addDisposeHandleToMap(_class, disposeComponent(MaterialData));
}

export var addInitHandle = (_class: any, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DeviceManagerData:any, ShaderData:any, MaterialData:any) => {
    addInitHandleToMap(_class, initMaterial(material_config, shaderLib_generator, DeviceManagerData, ShaderData, MaterialData));
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

    MaterialData.materialClassNameMap.set(index, className);

    setColor(index, _createDefaultColor(), MaterialData);
    setOpacity(index, 1, MaterialData);

    return material;
})

var _createDefaultColor = () => {
    var color = Color.create();

    return color.setColorByNum("#ffffff");
}

export var init = requireCheckFunc((state: MapImmutable<any, any>, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DeviceManagerData:any, ShaderData:any, MaterialData:any) => {
    checkIndexShouldEqualCount(MaterialData);
}, (state: MapImmutable<any, any>, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DeviceManagerData:any, ShaderData:any, MaterialData:any) => {
    for(let i = 0, count = MaterialData.count; i < count; i++){
        initMaterial(material_config, shaderLib_generator, DeviceManagerData, ShaderData, MaterialData, i, state);
    }
})

export var initMaterial = curry((material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DeviceManagerData:any, ShaderData:any, MaterialData:any, index:number, state: MapImmutable<any, any>) => {
    var shader = getShader(index, MaterialData),
        isInitMap = ShaderData.isInitMap,
        shaderIndex = shader.index;

    if(isInitMap[shaderIndex] === true){
        return;
    }

    isInitMap[shaderIndex] = true;

    initShader(state, index, shaderIndex, MaterialData.materialClassNameMap.get(index), material_config, shaderLib_generator, DeviceManagerData, ShaderData);
})

export var getShader = (materialIndex:number, MaterialData:any) => {
    return MaterialData.shaderMap.get(materialIndex);
}

export var setShader = (materialIndex:number, shader:Shader, MaterialData:any) => {
    return MaterialData.shaderMap.set(materialIndex, shader);
}

export var getColor = (materialIndex:number, MaterialData:any) => {
    return MaterialData.colorMap.get(materialIndex);
}

export var setColor = (materialIndex:number, color:Color, MaterialData:any) => {
    MaterialData.colorMap.set(materialIndex, color);
}

export var getOpacity = (materialIndex:number, MaterialData:any) => {
    return MaterialData.opacityMap.get(materialIndex);
}

export var setOpacity = (materialIndex:number, opacity:number, MaterialData:any) => {
    MaterialData.opacityMap.set(materialIndex, opacity);
}

export var getAlphaTest = (materialIndex:number, MaterialData:any) => {
    return MaterialData.alphaTestMap.get(materialIndex);
}

export var setAlphaTest = (materialIndex:number, alphaTest:number, MaterialData:any) => {
    MaterialData.alphaTestMap.set(materialIndex, alphaTest);
}

export var isPropertyExist = (propertyVal:any) => {
    return isValidMapValue(propertyVal);
}

export var addComponent = curry((MaterialData:any, component:Material, gameObject:GameObject) => {
    addComponentToGameObjectMapMap(MaterialData.gameObjectMap, component.index, gameObject);
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

    deleteMapVal(index, MaterialData.shaderMap);
    deleteMapVal(index, MaterialData.materialClassNameMap);
    deleteMapVal(index, MaterialData.colorMap);
    deleteMapVal(index, MaterialData.opacityMap);
    deleteMapVal(index, MaterialData.alphaTestMap);
    deleteMapVal(index, MaterialData.gameObjectMap);

    //not dispose shader(for reuse shader)
}))

export var getGameObject = (index:number, Data:any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

export var initData = (MaterialData:any) => {
    MaterialData.shaderMap = new Map();
    MaterialData.materialClassNameMap = new Map();
    MaterialData.colorMap = new Map();
    MaterialData.opacityMap = new Map();
    MaterialData.alphaTestMap = new Map();
    MaterialData.gameObjectMap = new Map();

    MaterialData.index = 0;
    MaterialData.count = 0;
}

