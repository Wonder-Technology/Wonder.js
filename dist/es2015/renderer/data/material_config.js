export var material_config = {
    "materials": {
        "BasicMaterial": {
            "shader": {
                "shaderLib": [
                    { "type": "group", "value": "engineMaterialTop" },
                    "BasicMaterialColorShaderLib",
                    "BasicShaderLib",
                    {
                        "type": "branch",
                        "branch": function (materialIndex, _a, _b) {
                            var getMapCount = _a.getMapCount;
                            var MapManagerDataFromSystem = _b.MapManagerDataFromSystem;
                            if (getMapCount(materialIndex, MapManagerDataFromSystem) === 1) {
                                return "BasicMapShaderLib";
                            }
                        }
                    },
                    "BasicEndShaderLib",
                    { "type": "group", "value": "engineMaterialEnd" }
                ]
            }
        },
        "LightMaterial": {
            "shader": {
                "shaderLib": [
                    { "type": "group", "value": "engineMaterialTop" },
                    "NormalMatrixNoInstanceShaderLib",
                    "NormalCommonShaderLib",
                    "LightCommonShaderLib",
                    "LightSetWorldPositionShaderLib",
                    {
                        "type": "branch",
                        "branch": function (materialIndex, _a, _b) {
                            var hasDiffuseMap = _a.hasDiffuseMap, hasSpecularMap = _a.hasSpecularMap;
                            var LightMaterialDataFromSystem = _b.LightMaterialDataFromSystem;
                            if (hasDiffuseMap(LightMaterialDataFromSystem)
                                || hasSpecularMap(LightMaterialDataFromSystem)) {
                                return "CommonLightMapShaderLib";
                            }
                        }
                    },
                    {
                        "type": "branch",
                        "branch": function (materialIndex, _a, _b) {
                            var hasDiffuseMap = _a.hasDiffuseMap;
                            var LightMaterialDataFromSystem = _b.LightMaterialDataFromSystem;
                            if (hasDiffuseMap(LightMaterialDataFromSystem)) {
                                return "DiffuseMapShaderLib";
                            }
                            return "NoDiffuseMapShaderLib";
                        }
                    },
                    {
                        "type": "branch",
                        "branch": function (materialIndex, _a, _b) {
                            var hasSpecularMap = _a.hasSpecularMap;
                            var LightMaterialDataFromSystem = _b.LightMaterialDataFromSystem;
                            if (hasSpecularMap(LightMaterialDataFromSystem)) {
                                return "SpecularMapShaderLib";
                            }
                            return "NoSpecularMapShaderLib";
                        }
                    },
                    "NoLightMapShaderLib",
                    "NoEmissionMapShaderLib",
                    "NoNormalMapShaderLib",
                    "NoShadowMapShaderLib",
                    "LightShaderLib",
                    "AmbientLightShaderLib",
                    "DirectionLightShaderLib",
                    "PointLightShaderLib",
                    "LightEndShaderLib",
                    { "type": "group", "value": "engineMaterialEnd" }
                ]
            }
        }
    },
    "shaderLibGroups": {
        "engineMaterialTop": [
            "CommonShaderLib",
            "ModelMatrixNoInstanceShaderLib",
            "VerticeCommonShaderLib"
        ],
        "engineMaterialEnd": [
            "EndShaderLib"
        ]
    }
};
;
//# sourceMappingURL=material_config.js.map