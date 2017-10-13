import { BasicMaterial } from "./BasicMaterial";
import { addComponent as addMaterialComponent, create as createMaterial, disposeComponent as disposeMaterialComponent, initMaterial as initMaterialBase } from "./MaterialSystem";
import { initData as initSpecifyMaterialData } from "./SpecifyMaterialSystem";
import { getBasicMaterialBufferCount } from "../../renderer/utils/worker/render_file/material/bufferUtils";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { generateComponentIndex } from "../ComponentSystem";
import { BasicMaterialData } from "./BasicMaterialData";
import { MaterialData } from "./MaterialData";
import { createTypeArrays as createTypeArraysUtils, getClassName } from "../../renderer/utils/worker/render_file/material/basicMaterialUtils";
import { initMapManager, setMap as setMapMapManager } from "../../renderer/texture/MapManagerSystem";
import { MapManagerData } from "../../renderer/texture/MapManagerData";
import { getBasicMaterialBufferStartIndex } from "../../renderer/utils/material/bufferUtils";
import { getGL } from "../../renderer/device/DeviceManagerSystem";
import { DeviceManagerData } from "../../renderer/device/DeviceManagerData";
import { TextureData } from "../../renderer/texture/TextureData";
export var create = ensureFunc(function (component) {
    it("index should <= max count", function () {
        expect(component.index).lte(getBasicMaterialBufferStartIndex() + getBasicMaterialBufferCount());
    });
}, function (ShaderData, MaterialData, BasicMaterialData) {
    var material = new BasicMaterial(), index = generateComponentIndex(BasicMaterialData);
    material.index = index;
    material = createMaterial(index, material, ShaderData, MaterialData);
    return material;
});
export var initMaterialWithoutInitMap = function (index, state) {
    initMaterialBase(index, state, getClassName(), MaterialData);
};
export var initMaterial = function (index, state) {
    initMaterialBase(index, state, getClassName(), MaterialData);
    initMapManager(getGL(DeviceManagerData, state), index, MapManagerData, TextureData);
};
export var setMap = function (materialIndex, map, MapManagerData, TextureData) {
    setMapMapManager(materialIndex, map, _buildMapUniformSamplerName(), MapManagerData, TextureData);
};
var _buildMapUniformSamplerName = function () { return "u_sampler2D"; };
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