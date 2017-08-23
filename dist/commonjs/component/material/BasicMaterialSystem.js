"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicMaterial_1 = require("./BasicMaterial");
var MaterialSystem_1 = require("./MaterialSystem");
var SpecifyMaterialSystem_1 = require("./SpecifyMaterialSystem");
var bufferUtils_1 = require("../../renderer/utils/worker/render_file/material/bufferUtils");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var ComponentSystem_1 = require("../ComponentSystem");
var BasicMaterialData_1 = require("./BasicMaterialData");
var MaterialData_1 = require("./MaterialData");
var basicMaterialUtils_1 = require("../../renderer/utils/worker/render_file/material/basicMaterialUtils");
var MapManagerSystem_1 = require("../../renderer/texture/MapManagerSystem");
var MapManagerData_1 = require("../../renderer/texture/MapManagerData");
var bufferUtils_2 = require("../../renderer/utils/material/bufferUtils");
exports.create = contract_1.ensureFunc(function (component) {
    contract_1.it("index should <= max count", function () {
        wonder_expect_js_1.expect(component.index).lt(bufferUtils_2.getBasicMaterialBufferStartIndex() + bufferUtils_1.getBasicMaterialBufferCount());
    });
}, function (ShaderData, MaterialData, BasicMaterialData) {
    var material = new BasicMaterial_1.BasicMaterial(), index = ComponentSystem_1.generateComponentIndex(BasicMaterialData);
    material.index = index;
    material = MaterialSystem_1.create(index, material, ShaderData, MaterialData);
    return material;
});
exports.initMaterial = function (index, state) {
    MaterialSystem_1.initMaterial(index, state, basicMaterialUtils_1.getClassName(), MaterialData_1.MaterialData);
};
exports.addMap = function (materialIndex, map, MapManagerData, TextureData) {
    var count = MapManagerSystem_1.getMapCount(materialIndex, MapManagerData);
    MapManagerSystem_1.addMap(materialIndex, map, count, "u_sampler2D" + count, MapManagerData, TextureData);
};
exports.addComponent = function (component, gameObject) {
    MaterialSystem_1.addComponent(component, gameObject, MaterialData_1.MaterialData);
};
exports.disposeComponent = function (component) {
    var sourceIndex = component.index, lastComponentIndex = null;
    BasicMaterialData_1.BasicMaterialData.index -= 1;
    lastComponentIndex = BasicMaterialData_1.BasicMaterialData.index;
    MaterialSystem_1.disposeComponent(sourceIndex, lastComponentIndex, MapManagerData_1.MapManagerData, MaterialData_1.MaterialData);
};
exports.createTypeArrays = function (buffer, offset, count, BasicMaterialData) {
    return basicMaterialUtils_1.createTypeArrays(buffer, offset, count, BasicMaterialData);
};
exports.initData = function (BasicMaterialData) {
    SpecifyMaterialSystem_1.initData(bufferUtils_2.getBasicMaterialBufferStartIndex(), BasicMaterialData);
};
exports.setDefaultData = function (BasicMaterialData) {
};
//# sourceMappingURL=BasicMaterialSystem.js.map