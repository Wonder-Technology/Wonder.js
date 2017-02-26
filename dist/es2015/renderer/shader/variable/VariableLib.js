var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { EVariableType } from "./EVariableType";
import { EVariableCategory } from "./EVariableCategory";
var VariableLib = (function () {
    function VariableLib() {
    }
    return VariableLib;
}());
VariableLib.a_position = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_positionVec2 = {
    type: EVariableType.FLOAT_2,
    value: EVariableCategory.ENGINE
};
VariableLib.a_currentFramePosition = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_nextFramePosition = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_normal = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_currentFrameNormal = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_nextFrameNormal = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_color = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_texCoord = {
    type: EVariableType.FLOAT_2,
    value: EVariableCategory.ENGINE
};
VariableLib.a_tangent = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_color = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_mMatrix = {
    type: EVariableType.FLOAT_MAT4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_vMatrix = {
    type: EVariableType.FLOAT_MAT4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_pMatrix = {
    type: EVariableType.FLOAT_MAT4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_mvpMatrix = {
    type: EVariableType.FLOAT_MAT4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_vpMatrix = {
    type: EVariableType.FLOAT_MAT4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_normalMatrix = {
    type: EVariableType.FLOAT_MAT3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_samplerCube0 = {
    type: EVariableType.SAMPLER_CUBE,
    value: EVariableCategory.ENGINE
};
VariableLib.u_sampler2D0 = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_sampler2D1 = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_lightMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap1Sampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap2Sampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap3Sampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_specularMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_emissionMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_normalMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_reflectionMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_refractionMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_cameraPos = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_refractionRatio = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_reflectivity = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_map0SourceRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_map1SourceRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMapSourceRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_map0RepeatRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_map1RepeatRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMapRepeatRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_combineMode = {
    type: EVariableType.NUMBER_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_mixRatio = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_lightMapIntensity = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuse = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_specular = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_emission = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_shininess = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_lightModel = {
    type: EVariableType.NUMBER_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_isBothSide = {
    type: EVariableType.NUMBER_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_opacity = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_ambient = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_directionLights = {
    type: EVariableType.STRUCTURES,
    value: EVariableCategory.ENGINE
};
VariableLib.u_pointLights = {
    type: EVariableType.STRUCTURES,
    value: EVariableCategory.ENGINE
};
VariableLib.u_vpMatrixFromLight = {
    type: EVariableType.FLOAT_MAT4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_lightPos = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_farPlane = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_interpolation = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_tilesHeightNumber = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_tilesWidthNumber = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_amplitude = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_jointColor = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_time = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_speed = {
    type: EVariableType.VECTOR_2,
    value: EVariableCategory.ENGINE
};
VariableLib.u_shift = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_alphaThreshold = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_fireColor = {
    type: EVariableType.STRUCTURE,
    value: EVariableCategory.ENGINE
};
VariableLib.u_layerHeightDatas = {
    type: EVariableType.STRUCTURES,
    value: EVariableCategory.ENGINE
};
VariableLib.u_layerSampler2Ds = {
    type: EVariableType.SAMPLER_ARRAY,
    value: EVariableCategory.ENGINE
};
VariableLib.u_herb1Color = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_herb2Color = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_herb3Color = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_groundColor = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_ampScale = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_woodColor = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_roadColor = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_skyColor = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_cloudColor = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_brickColor = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_waveData = {
    type: EVariableType.STRUCTURE,
    value: EVariableCategory.ENGINE
};
VariableLib.u_windMatrix = {
    type: EVariableType.FLOAT_MAT4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_bumpMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_bumpMap1Sampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_bumpMap2Sampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_bumpMap3Sampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_levelData = {
    type: EVariableType.STRUCTURE,
    value: EVariableCategory.ENGINE
};
VariableLib.a_mVec4_0 = {
    type: EVariableType.FLOAT_4,
    value: EVariableCategory.ENGINE
};
VariableLib.a_mVec4_1 = {
    type: EVariableType.FLOAT_4,
    value: EVariableCategory.ENGINE
};
VariableLib.a_mVec4_2 = {
    type: EVariableType.FLOAT_4,
    value: EVariableCategory.ENGINE
};
VariableLib.a_mVec4_3 = {
    type: EVariableType.FLOAT_4,
    value: EVariableCategory.ENGINE
};
VariableLib.a_normalVec4_0 = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_normalVec4_1 = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_normalVec4_2 = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_isRenderListEmpty = {
    type: EVariableType.NUMBER_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_isReflectionRenderListEmpty = {
    type: EVariableType.NUMBER_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_isRefractionRenderListEmpty = {
    type: EVariableType.NUMBER_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_bitmapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.a_page = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_pageSampler2Ds = {
    type: EVariableType.SAMPLER_ARRAY,
    value: EVariableCategory.ENGINE
};
VariableLib.u_mixMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap1RepeatRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap2RepeatRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap3RepeatRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_grassMapDatas = {
    type: EVariableType.STRUCTURES,
    value: EVariableCategory.ENGINE
};
VariableLib.a_quadIndex = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_grassMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_windData = {
    type: EVariableType.STRUCTURES,
    value: EVariableCategory.ENGINE
};
VariableLib.a_vertexIndex = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_grassRangeWidth = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_grassRangeHeight = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_terrainRangeWidth = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_terrainRangeHeight = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_terrainMinHeight = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_terrainMaxHeight = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_terrainSubdivisions = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_terrainScaleY = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_terrainPositionY = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_heightMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_lightColor = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_jointIndice = {
    type: EVariableType.FLOAT_4,
    value: EVariableCategory.ENGINE
};
VariableLib.a_jointWeight = {
    type: EVariableType.FLOAT_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_jointMatrices = {
    type: EVariableType.FLOAT_MAT4_ARRAY,
    value: EVariableCategory.ENGINE
};
VariableLib = __decorate([
    registerClass("VariableLib")
], VariableLib);
export { VariableLib };
//# sourceMappingURL=VariableLib.js.map