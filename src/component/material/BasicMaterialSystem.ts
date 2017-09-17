import { BasicMaterial } from "./BasicMaterial";
import {
    addComponent as addMaterialComponent,
    create as createMaterial, disposeComponent as disposeMaterialComponent,
    initMaterial as initMaterialMaterial
} from "./MaterialSystem";
import {
    initData as initSpecifyMaterialData
} from "./SpecifyMaterialSystem";
import { getBasicMaterialBufferCount } from "../../renderer/utils/worker/render_file/material/bufferUtils";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Material } from "./Material";
import { generateComponentIndex } from "../ComponentSystem";
import { BasicMaterialData } from "./BasicMaterialData";
import { MaterialData } from "./MaterialData";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Map } from "immutable";
import {
    createTypeArrays as createTypeArraysUtils,
    getClassName
} from "../../renderer/utils/worker/render_file/material/basicMaterialUtils";
import { addMap as addMapByMapManager, getMapCount } from "../../renderer/texture/MapManagerSystem";
import { Texture } from "../../renderer/texture/Texture";
import { MapManagerData } from "../../renderer/texture/MapManagerData";
import { getBasicMaterialBufferStartIndex } from "../../renderer/utils/material/bufferUtils";

export var create = ensureFunc((component: Material) => {
    it("index should <= max count", () => {
        expect(component.index).lte(getBasicMaterialBufferStartIndex() + getBasicMaterialBufferCount());
    });
}, (ShaderData: any, MaterialData: any, BasicMaterialData: any) => {
    var material = new BasicMaterial(),
        // materialClassName = "BasicMaterial",
        index = generateComponentIndex(BasicMaterialData);

    material.index = index;

    material = createMaterial(index, material, ShaderData, MaterialData);

    return material;
})

export var initMaterial = (index: number, state: Map<any, any>) => {
    initMaterialMaterial(index, state, getClassName(), MaterialData);
}

// export var getMap = (materialIndex: number, MapManagerData:any) => {
//     return getMapByMapManager(materialIndex, MapManagerData);
// }

export var addMap = (materialIndex: number, map: Texture, MapManagerData: any, TextureData: any) => {
    var count = getMapCount(materialIndex, MapManagerData);

    addMapByMapManager(materialIndex, map, count, `u_sampler2D${count}`, MapManagerData, TextureData);
}

export var addComponent = (component: Material, gameObject: GameObject) => {
    addMaterialComponent(component, gameObject, MaterialData);
}

export var disposeComponent = (component: Material) => {
    var sourceIndex = component.index,
        lastComponentIndex: number = null;

    BasicMaterialData.index -= 1;

    lastComponentIndex = BasicMaterialData.index;

    disposeMaterialComponent(sourceIndex, lastComponentIndex, MapManagerData, MaterialData);

    //not dispose shader(for reuse shader)(if dipose shader, should change render worker)
}

export var createTypeArrays = (buffer: any, offset: number, count: number, BasicMaterialData: any) => {
    return createTypeArraysUtils(buffer, offset, count, BasicMaterialData);
}

export var initData = (BasicMaterialData: any) => {
    initSpecifyMaterialData(getBasicMaterialBufferStartIndex(), BasicMaterialData);
}

export var setDefaultData = (BasicMaterialData: any) => {
}
