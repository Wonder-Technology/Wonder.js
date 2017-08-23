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
import { create, initMaterial, setSpecularMap, setDiffuseMap } from "./LightMaterialSystem";
import { MaterialData } from "./MaterialData";
import { getAlphaTest, getColor, getOpacity, setAlphaTest, setColor, setOpacity } from "./MaterialSystem";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { LightMaterialData } from "./LightMaterialData";
import { getEmissionColor, getLightModel, getShading, getShininess, getSpecularColor, setEmissionColor, setLightModel, setShading, setShininess, setSpecularColor } from "./LightMaterialSystem";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { MapManagerData } from "../../renderer/texture/MapManagerData";
import { TextureData } from "../../renderer/texture/TextureData";
import { WebGL1ShaderData } from "../../renderer/webgl1/shader/ShaderData";
import { WebGL2ShaderData } from "../../renderer/webgl2/shader/ShaderData";
import { isWebgl1 } from "../../renderer/device/WebGLDetectSystem";
var LightMaterial = (function (_super) {
    __extends(LightMaterial, _super);
    function LightMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LightMaterial = __decorate([
        registerClass("LightMaterial")
    ], LightMaterial);
    return LightMaterial;
}(Material));
export { LightMaterial };
export var createLightMaterial = null;
if (isWebgl1()) {
    createLightMaterial = function () {
        return create(WebGL1ShaderData, MaterialData, LightMaterialData);
    };
}
else {
    createLightMaterial = function () {
        return create(WebGL2ShaderData, MaterialData, LightMaterialData);
    };
}
export var initLightMaterial = function (material) {
    initMaterial(material.index, getState(DirectorData));
};
export var getLightMaterialColor = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material) {
    return getColor(material.index, MaterialData);
});
export var setLightMaterialColor = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material, color) {
    setColor(material.index, color, MaterialData);
});
export var getLightMaterialOpacity = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material) {
    return getOpacity(material.index, MaterialData);
});
export var setLightMaterialOpacity = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material, opacity) {
    setOpacity(material.index, opacity, MaterialData);
});
export var getLightMaterialAlphaTest = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material) {
    return getAlphaTest(material.index, MaterialData);
});
export var setLightMaterialAlphaTest = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material, alphaTest) {
    setAlphaTest(material.index, alphaTest, MaterialData);
});
export var getLightMaterialSpecularColor = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material) {
    return getSpecularColor(material.index, LightMaterialData);
});
export var setLightMaterialSpecularColor = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material, color) {
    setSpecularColor(material.index, color, LightMaterialData);
});
export var getLightMaterialEmissionColor = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material) {
    return getEmissionColor(material.index, LightMaterialData);
});
export var setLightMaterialEmissionColor = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material, color) {
    setEmissionColor(material.index, color, LightMaterialData);
});
export var getLightMaterialShininess = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material) {
    return getShininess(material.index, LightMaterialData);
});
export var setLightMaterialShininess = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material, shininess) {
    setShininess(material.index, shininess, LightMaterialData);
});
export var getLightMaterialShading = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material) {
    return getShading(material.index, LightMaterialData);
});
export var setLightMaterialShading = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material, shading) {
    setShading(material.index, shading, LightMaterialData);
});
export var getLightMaterialLightModel = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material) {
    return getLightModel(material.index, LightMaterialData);
});
export var setLightMaterialLightModel = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material, lightModel) {
    setLightModel(material.index, lightModel, LightMaterialData);
});
export var setLightMaterialDiffuseMap = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material, map) {
    setDiffuseMap(material.index, map, MapManagerData, TextureData);
});
export var setLightMaterialSpecularMap = requireCheckFunc(function (material) {
    checkShouldAlive(material);
}, function (material, map) {
    setSpecularMap(material.index, map, MapManagerData, TextureData);
});
//# sourceMappingURL=LightMaterial.js.map