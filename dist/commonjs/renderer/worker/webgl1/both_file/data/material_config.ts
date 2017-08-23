export const webgl1_material_config = {
    "shaders":{
        "materialShaders":{
            "BasicRender":[
                { "type": "group", "value": "engineMaterialTop" },

                "BasicMaterialColorShaderLib",
                "BasicShaderLib",

                {
                    "type": "branch",
                    "branch": (materialIndex, {
                        getMapCount
                    }, {
                                   MapManagerDataFromSystem
                               }) => {
                        if (getMapCount(materialIndex, MapManagerDataFromSystem) === 1) {
                            return "BasicMapShaderLib";
                        }
                    }
                },


                "BasicEndShaderLib",

                { "type": "group", "value": "engineMaterialEnd" }
            ],
            "FrontRenderLight": [
                { "type": "group", "value": "engineMaterialTop" },

                "NormalMatrixNoInstanceShaderLib",
                "NormalCommonShaderLib",
                "LightCommonShaderLib",
                "LightSetWorldPositionShaderLib",

                {
                    "type": "branch",
                    "branch": (materialIndex, {
                        hasDiffuseMap,
                        hasSpecularMap
                    }, {
                                   LightMaterialDataFromSystem
                               }) => {
                        if (hasDiffuseMap(materialIndex, LightMaterialDataFromSystem)
                            || hasSpecularMap(materialIndex, LightMaterialDataFromSystem)) {
                            return "CommonLightMapShaderLib";
                        }
                    }
                },
                {
                    "type": "branch",
                    "branch": (materialIndex, {
                        hasDiffuseMap
                    }, {
                                   LightMaterialDataFromSystem
                               }) => {
                        if (hasDiffuseMap(materialIndex, LightMaterialDataFromSystem)) {
                            return "DiffuseMapShaderLib";
                        }

                        return "NoDiffuseMapShaderLib";
                    }
                },
                {
                    "type": "branch",
                    "branch": (materialIndex, {
                        hasSpecularMap
                    }, {
                                   LightMaterialDataFromSystem
                               }) => {
                        if (hasSpecularMap(materialIndex, LightMaterialDataFromSystem)) {
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
                "PointLightShaderLib",
                "DirectionLightShaderLib",
                "LightEndShaderLib",
                { "type": "group", "value": "engineMaterialEnd" }
            ]
        },
        "noMaterialShaders": {
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
}
