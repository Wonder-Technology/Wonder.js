var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { checkShouldAlive, Material } from "./Material";
import { addMap, create, initMaterial } from "./BasicMaterialSystem";
import { ShaderData } from "../../renderer/shader/ShaderData";
import { MaterialData } from "./MaterialData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { BasicMaterialData } from "./BasicMaterialData";
import { getAlphaTest, getColor, getOpacity, setAlphaTest, setColor, setOpacity } from "./MaterialSystem";
import { MapManagerData } from "../../renderer/texture/MapManagerData";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { TextureData } from "../../renderer/texture/TextureData";
var BasicMaterial = (function (_super) {
    __extends(BasicMaterial, _super);
    function BasicMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicMaterial = __decorate([
        registerClass("BasicMaterial")
    ], BasicMaterial);
    return BasicMaterial;
}(Material));
export { BasicMaterial };
export var createBasicMaterial = function () {
    return create(ShaderData, MaterialData, BasicMaterialData);
};
export var initBasicMaterial = function (material) {
    initMaterial(material.index, getState(DirectorData));
};
export var getBasicMaterialColor = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material) {
    return getColor(material.index, MaterialData);
});
export var setBasicMaterialColor = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material, color) {
    setColor(material.index, color, MaterialData);
});
export var getBasicMaterialOpacity = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material) {
    return getOpacity(material.index, MaterialData);
});
export var setBasicMaterialOpacity = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material, opacity) {
    setOpacity(material.index, opacity, MaterialData);
});
export var getBasicMaterialAlphaTest = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material) {
    return getAlphaTest(material.index, MaterialData);
});
export var setBasicMaterialAlphaTest = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material, alphaTest) {
    setAlphaTest(material.index, alphaTest, MaterialData);
});
export var addBasicMaterialMap = requireCheckFunc(function (material, map) {
    checkShouldAlive(material);
}, function (material, map) {
    addMap(material.index, map, MapManagerData, TextureData);
});
//# sourceMappingURL=BasicMaterial.js.map