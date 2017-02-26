"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../../definition/typescript/decorator/registerClass");
var EVariableType_1 = require("./EVariableType");
var EVariableCategory_1 = require("./EVariableCategory");
var VariableLib = (function () {
    function VariableLib() {
    }
    return VariableLib;
}());
VariableLib.a_position = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_positionVec2 = {
    type: EVariableType_1.EVariableType.FLOAT_2,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_currentFramePosition = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_nextFramePosition = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_normal = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_currentFrameNormal = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_nextFrameNormal = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_color = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_texCoord = {
    type: EVariableType_1.EVariableType.FLOAT_2,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_tangent = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_color = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_mMatrix = {
    type: EVariableType_1.EVariableType.FLOAT_MAT4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_vMatrix = {
    type: EVariableType_1.EVariableType.FLOAT_MAT4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_pMatrix = {
    type: EVariableType_1.EVariableType.FLOAT_MAT4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_mvpMatrix = {
    type: EVariableType_1.EVariableType.FLOAT_MAT4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_vpMatrix = {
    type: EVariableType_1.EVariableType.FLOAT_MAT4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_normalMatrix = {
    type: EVariableType_1.EVariableType.FLOAT_MAT3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_samplerCube0 = {
    type: EVariableType_1.EVariableType.SAMPLER_CUBE,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_sampler2D0 = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_sampler2D1 = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_lightMapSampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_diffuseMapSampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap1Sampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap2Sampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap3Sampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_specularMapSampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_emissionMapSampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_normalMapSampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_reflectionMapSampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_refractionMapSampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_cameraPos = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_refractionRatio = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_reflectivity = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_map0SourceRegion = {
    type: EVariableType_1.EVariableType.VECTOR_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_map1SourceRegion = {
    type: EVariableType_1.EVariableType.VECTOR_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_diffuseMapSourceRegion = {
    type: EVariableType_1.EVariableType.VECTOR_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_map0RepeatRegion = {
    type: EVariableType_1.EVariableType.VECTOR_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_map1RepeatRegion = {
    type: EVariableType_1.EVariableType.VECTOR_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_diffuseMapRepeatRegion = {
    type: EVariableType_1.EVariableType.VECTOR_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_combineMode = {
    type: EVariableType_1.EVariableType.NUMBER_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_mixRatio = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_lightMapIntensity = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_diffuse = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_specular = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_emission = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_shininess = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_lightModel = {
    type: EVariableType_1.EVariableType.NUMBER_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_isBothSide = {
    type: EVariableType_1.EVariableType.NUMBER_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_opacity = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_ambient = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_directionLights = {
    type: EVariableType_1.EVariableType.STRUCTURES,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_pointLights = {
    type: EVariableType_1.EVariableType.STRUCTURES,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_vpMatrixFromLight = {
    type: EVariableType_1.EVariableType.FLOAT_MAT4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_lightPos = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_farPlane = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_interpolation = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_tilesHeightNumber = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_tilesWidthNumber = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_amplitude = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_jointColor = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_time = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_speed = {
    type: EVariableType_1.EVariableType.VECTOR_2,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_shift = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_alphaThreshold = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_fireColor = {
    type: EVariableType_1.EVariableType.STRUCTURE,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_layerHeightDatas = {
    type: EVariableType_1.EVariableType.STRUCTURES,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_layerSampler2Ds = {
    type: EVariableType_1.EVariableType.SAMPLER_ARRAY,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_herb1Color = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_herb2Color = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_herb3Color = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_groundColor = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_ampScale = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_woodColor = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_roadColor = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_skyColor = {
    type: EVariableType_1.EVariableType.VECTOR_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_cloudColor = {
    type: EVariableType_1.EVariableType.VECTOR_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_brickColor = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_waveData = {
    type: EVariableType_1.EVariableType.STRUCTURE,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_windMatrix = {
    type: EVariableType_1.EVariableType.FLOAT_MAT4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_bumpMapSampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_bumpMap1Sampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_bumpMap2Sampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_bumpMap3Sampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_levelData = {
    type: EVariableType_1.EVariableType.STRUCTURE,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_mVec4_0 = {
    type: EVariableType_1.EVariableType.FLOAT_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_mVec4_1 = {
    type: EVariableType_1.EVariableType.FLOAT_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_mVec4_2 = {
    type: EVariableType_1.EVariableType.FLOAT_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_mVec4_3 = {
    type: EVariableType_1.EVariableType.FLOAT_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_normalVec4_0 = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_normalVec4_1 = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_normalVec4_2 = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_isRenderListEmpty = {
    type: EVariableType_1.EVariableType.NUMBER_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_isReflectionRenderListEmpty = {
    type: EVariableType_1.EVariableType.NUMBER_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_isRefractionRenderListEmpty = {
    type: EVariableType_1.EVariableType.NUMBER_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_bitmapSampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_page = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_pageSampler2Ds = {
    type: EVariableType_1.EVariableType.SAMPLER_ARRAY,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_mixMapSampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap1RepeatRegion = {
    type: EVariableType_1.EVariableType.VECTOR_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap2RepeatRegion = {
    type: EVariableType_1.EVariableType.VECTOR_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap3RepeatRegion = {
    type: EVariableType_1.EVariableType.VECTOR_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_grassMapDatas = {
    type: EVariableType_1.EVariableType.STRUCTURES,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_quadIndex = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_grassMapSampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_windData = {
    type: EVariableType_1.EVariableType.STRUCTURES,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_vertexIndex = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_grassRangeWidth = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_grassRangeHeight = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_terrainRangeWidth = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_terrainRangeHeight = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_terrainMinHeight = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_terrainMaxHeight = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_terrainSubdivisions = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_terrainScaleY = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_terrainPositionY = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_heightMapSampler = {
    type: EVariableType_1.EVariableType.SAMPLER_2D,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_lightColor = {
    type: EVariableType_1.EVariableType.VECTOR_3,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_jointIndice = {
    type: EVariableType_1.EVariableType.FLOAT_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.a_jointWeight = {
    type: EVariableType_1.EVariableType.FLOAT_4,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib.u_jointMatrices = {
    type: EVariableType_1.EVariableType.FLOAT_MAT4_ARRAY,
    value: EVariableCategory_1.EVariableCategory.ENGINE
};
VariableLib = __decorate([
    registerClass_1.registerClass("VariableLib")
], VariableLib);
exports.VariableLib = VariableLib;
//# sourceMappingURL=VariableLib.js.map