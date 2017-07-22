export const material_config = {
    "materials": {
        "BasicMaterial": {
            "shader": {
                "shaderLib": [
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
                        "branch": (materialIndex, {
                            hasDiffuseMap,
                            hasSpecularMap
                        }, {
                                       LightMaterialDataFromSystem
                                   }) => {
                            if (hasDiffuseMap(LightMaterialDataFromSystem)
                                || hasSpecularMap(LightMaterialDataFromSystem)) {
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
                            if (hasDiffuseMap(LightMaterialDataFromSystem)) {
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
}

export interface IMaterialConfig {
    materials: {
        [materialClassName: string]: IMaterialContentConfig
    };
    shaderLibGroups: IMaterialShaderLibGroup;
}

export interface IMaterialShaderLibGroup {
    [groupName: string]: Array<string>;
};

export interface IMaterialContentConfig {
    shader: IShaderConfig
}

export interface IShaderConfig {
    shaderLib: MaterialShaderLibConfig
}

export interface IShaderLibItem {
    type: string;
    branch?: (...args) => string;
    value?: any;
}

export type MaterialShaderLibConfig = Array<string | IShaderLibItem>;
