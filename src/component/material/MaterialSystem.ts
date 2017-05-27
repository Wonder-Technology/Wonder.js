import { init as initShader } from "../../renderer/shader/ShaderSystem";
import { IMaterialConfig } from "../../renderer/data/material_config";
import { IShaderLibGenerator } from "../../renderer/data/shaderLib_generator";
import { Map as MapImmutable } from "immutable";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Color } from "../../structure/Color";
import { expect } from "wonder-expect.js";
import { Material } from "./Material";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMapMap,
    addDisposeHandle as addDisposeHandleToMap, addInitHandle as addInitHandleToMap, generateComponentIndex,
    getComponentGameObject
} from "../ComponentSystem";
import curry from "wonder-lodash/curry";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { createMap, deleteVal, isValidMapValue } from "../../utils/objectUtils";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { deleteMapVal } from "../../utils/mapUtils";
import { Shader } from "../../renderer/shader/Shader";
import { isDisposeTooManyComponents, setMapVal } from "../../utils/memoryUtils";

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

    _setMaterialClassName(index, className, MaterialData);

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

    initShader(state, index, shaderIndex, _getMaterialClassName(index, MaterialData), material_config, shaderLib_generator, DeviceManagerData, ShaderData);
})

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

    deleteVal(index, MaterialData.shaderMap);
    deleteVal(index, MaterialData.materialClassNameMap);
    deleteVal(index, MaterialData.colorMap);
    deleteVal(index, MaterialData.opacityMap);
    deleteVal(index, MaterialData.alphaTestMap);

    deleteMapVal(index, MaterialData.gameObjectMap);

    //not dispose shader(for reuse shader)

    if(isDisposeTooManyComponents(MaterialData.disposeCount)){
        let val:any = null,
            newShaderMap = {},
            newMaterialClassNameMap = {},
            newColorMap = {},
            newOpacityMap = {},
            newAlphaTestMap = {},
            shaderMap = MaterialData.shaderMap,
            materialClassNameMap = MaterialData.materialClassNameMap,
            colorMap = MaterialData.colorMap,
            opacityMap = MaterialData.opacityMap,
            alphaTestMap = MaterialData.alphaTestMap;

        MaterialData.gameObjectMap.forEach(function(value, uid) {
            val = shaderMap[uid];
            setMapVal(newShaderMap, uid, val);

            val = materialClassNameMap[uid];
            setMapVal(newMaterialClassNameMap, uid, val);

            val = colorMap[uid];
            setMapVal(newColorMap, uid, val);

            val = opacityMap[uid];
            setMapVal(newOpacityMap, uid, val);

            val = alphaTestMap[uid];
            setMapVal(newAlphaTestMap, uid, val);
        });

        MaterialData.shaderMap = newShaderMap;
        MaterialData.materialClassNameMap = newMaterialClassNameMap;
        MaterialData.colorMap = newColorMap;
        MaterialData.opacityMap = newOpacityMap;
        MaterialData.alphaTestMap = newAlphaTestMap;

        MaterialData.disposeCount = 0;
    }
    else{
        MaterialData.disposeCount += 1;
    }
}))

export var getGameObject = (index:number, Data:any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

export var initData = (MaterialData:any) => {
    MaterialData.shaderMap = createMap();
    MaterialData.materialClassNameMap = createMap();
    MaterialData.colorMap = createMap();
    MaterialData.opacityMap = createMap();
    MaterialData.alphaTestMap = createMap();

    MaterialData.gameObjectMap = new Map();

    MaterialData.index = 0;
    MaterialData.count = 0;
    MaterialData.disposeCount = 0;
}

