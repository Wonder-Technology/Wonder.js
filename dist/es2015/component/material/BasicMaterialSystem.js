import { BasicMaterial } from "./BasicMaterial";
import { addComponent as addMaterialComponent, create as createMaterial, disposeComponent as disposeMaterialComponent, initMaterial as initMaterialMaterial } from "./MaterialSystem";
import { initData as initSpecifyMaterialData } from "./SpecifyMaterialSystem";
import { getBasicMaterialBufferCount } from "../../renderer/utils/worker/render_file/material/bufferUtils";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { generateComponentIndex } from "../ComponentSystem";
import { BasicMaterialData } from "./BasicMaterialData";
import { MaterialData } from "./MaterialData";
import { createTypeArrays as createTypeArraysUtils, getClassName } from "../../renderer/utils/worker/render_file/material/basicMaterialUtils";
import { addMap as addMapByMapManager, getMapCount } from "../../renderer/texture/MapManagerSystem";
import { MapManagerData } from "../../renderer/texture/MapManagerData";
import { getBasicMaterialBufferStartIndex } from "../../renderer/utils/material/bufferUtils";
export var create = ensureFunc(function (component) {
    it("index should <= max count", function () {
        expect(component.index).lt(getBasicMaterialBufferStartIndex() + getBasicMaterialBufferCount());
    });
}, function (ShaderData, MaterialData, BasicMaterialData) {
    var material = new BasicMaterial(), index = generateComponentIndex(BasicMaterialData);
    material.index = index;
    material = createMaterial(index, material, ShaderData, MaterialData);
    return material;
});
export var initMaterial = function (index, state) {
    initMaterialMaterial(index, state, getClassName(), MaterialData);
};
export var addMap = function (materialIndex, map, MapManagerData, TextureData) {
    var count = getMapCount(materialIndex, MapManagerData);
    addMapByMapManager(materialIndex, map, count, "u_sampler2D" + count, MapManagerData, TextureData);
};
export var addComponent = function (component, gameObject) {
    addMaterialComponent(component, gameObject, MaterialData);
};
export var disposeComponent = function (component) {
    var sourceIndex = component.index, lastComponentIndex = null;
    BasicMaterialData.index -= 1;
    lastComponentIndex = BasicMaterialData.index;
    disposeMaterialComponent(sourceIndex, lastComponentIndex, MapManagerData, MaterialData);
};
export var createTypeArrays = function (buffer, offset, count, BasicMaterialData) {
    return createTypeArraysUtils(buffer, offset, count, BasicMaterialData);
};
export var initData = function (BasicMaterialData) {
    initSpecifyMaterialData(getBasicMaterialBufferStartIndex(), BasicMaterialData);
};
export var setDefaultData = function (BasicMaterialData) {
};
//# sourceMappingURL=BasicMaterialSystem.js.map